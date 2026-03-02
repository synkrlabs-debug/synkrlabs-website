import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import path from 'path';

// Load environment variables locally
if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config({ path: path.join(process.cwd(), '.env.local') });
}

// --- Security Helpers ---

// Email validation
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Sanitize string for email headers (strip CRLF injection characters)
const sanitizeForHeader = (str) => str.replace(/[\r\n\t]/g, '').trim();

// Input length limits
const MAX_LENGTHS = {
    name: 100,
    email: 254,
    phone: 20,
    message: 5000,
};

// Simple in-memory rate limiter (per serverless instance)
// Not bulletproof on serverless, but catches casual abuse
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // max 3 submissions per minute per IP

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry) {
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return false;
    }

    if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
        // Reset window
        rateLimitMap.set(ip, { count: 1, startTime: now });
        return false;
    }

    entry.count++;
    if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
        return true;
    }
    return false;
}

// Periodically clean up old entries to prevent memory leaks
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap) {
        if (now - entry.startTime > RATE_LIMIT_WINDOW_MS * 2) {
            rateLimitMap.delete(ip);
        }
    }
}, RATE_LIMIT_WINDOW_MS * 2);

// --- Main Handler ---

export default async function handler(req, res) {
    // CORS: Only allow requests from your own domain
    const allowedOrigins = [
        'https://synkrlabs.com',
        'https://www.synkrlabs.com',
        'https://synkrlabs-website.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5173',
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }

    try {
        // 1. Rate Limiting
        const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
        if (isRateLimited(clientIp)) {
            return res.status(429).json({ success: false, message: 'Too many requests. Please wait a minute before trying again.' });
        }

        const { name, email, phone, message, _honeypot } = req.body;

        // 2. Honeypot check — bots fill in hidden fields
        if (_honeypot) {
            // Silently accept but do nothing (fools the bot into thinking it worked)
            return res.status(200).json({ success: true, message: 'Message sent successfully!' });
        }

        // 3. Input Validation & Sanitization
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        // 4. Length Limits
        if (name.trim().length > MAX_LENGTHS.name) {
            return res.status(400).json({ success: false, message: `Name must be under ${MAX_LENGTHS.name} characters.` });
        }
        if (email.trim().length > MAX_LENGTHS.email) {
            return res.status(400).json({ success: false, message: `Email must be under ${MAX_LENGTHS.email} characters.` });
        }
        if (phone && phone.trim().length > MAX_LENGTHS.phone) {
            return res.status(400).json({ success: false, message: `Phone must be under ${MAX_LENGTHS.phone} characters.` });
        }
        if (message.trim().length > MAX_LENGTHS.message) {
            return res.status(400).json({ success: false, message: `Message must be under ${MAX_LENGTHS.message} characters.` });
        }

        // 5. Validate Environment Variables
        const { GOOGLE_SHEET_ID, GMAIL_EMAIL, GMAIL_APP_PASSWORD, GOOGLE_CREDENTIALS, GOOGLE_CREDENTIALS_PATH } = process.env;

        let missingVars = [];
        if (!GOOGLE_SHEET_ID) missingVars.push('GOOGLE_SHEET_ID');
        if (!GMAIL_EMAIL) missingVars.push('GMAIL_EMAIL');
        if (!GMAIL_APP_PASSWORD) missingVars.push('GMAIL_APP_PASSWORD');

        if (missingVars.length > 0) {
            console.error(`[Configuration Error] Missing: ${missingVars.join(', ')}`);
            return res.status(500).json({ success: false, message: 'Internal server error: Configuration missing.' });
        }

        const timestamp = new Date().toISOString();
        const sanitizedName = sanitizeForHeader(name.trim());
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedPhone = phone?.trim() || 'N/A';
        const sanitizedMessage = message.trim();

        // 6. Google Sheets Integration
        let sheetSuccess = false;
        try {
            let authOptions = {
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            };

            if (GOOGLE_CREDENTIALS) {
                const credentials = JSON.parse(GOOGLE_CREDENTIALS);
                authOptions.credentials = {
                    client_email: credentials.client_email,
                    private_key: credentials.private_key,
                };
                authOptions.projectId = credentials.project_id;
            } else {
                authOptions.keyFile = path.join(process.cwd(), GOOGLE_CREDENTIALS_PATH || 'credentials.json');
            }

            const auth = new google.auth.GoogleAuth(authOptions);
            const sheets = google.sheets({ version: 'v4', auth });

            await sheets.spreadsheets.values.append({
                spreadsheetId: GOOGLE_SHEET_ID,
                range: 'Sheet1!A:F',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [[timestamp, sanitizedName, sanitizedEmail, sanitizedPhone, sanitizedMessage, 'New']],
                },
            });
            sheetSuccess = true;
        } catch (sheetError) {
            console.error('[Google Sheets Error]', sheetError);
        }

        // 7. Email Notifications
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_EMAIL,
                pass: GMAIL_APP_PASSWORD,
            },
        });

        // Admin notification
        const adminMailOptions = {
            from: `"SynkrLabs Web" <${GMAIL_EMAIL}>`,
            to: 'contact.synkrlabs@gmail.com',
            replyTo: sanitizedEmail,
            subject: `New Lead – SynkrLabs | ${sanitizedName.substring(0, 50)}`,
            text: `New Lead Details:\n\nName: ${sanitizedName}\nEmail: ${sanitizedEmail}\nPhone: ${sanitizedPhone}\n\nMessage:\n${sanitizedMessage}\n\nTimestamp: ${timestamp}`,
        };

        // Client auto-reply
        const clientMailOptions = {
            from: `"SynkrLabs" <${GMAIL_EMAIL}>`,
            to: sanitizedEmail,
            subject: 'SynkrLabs received your request',
            text: `Hi ${sanitizedName},\n\nThank you for contacting SynkrLabs.\n\nWe have received your message and our team will contact you shortly to discuss your project requirements.\n\nBest regards,\nTeam SynkrLabs`,
        };

        // 8. Send Emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(clientMailOptions)
        ]);

        if (!sheetSuccess) {
            console.warn('[Partial Success] Emails sent, but Google Sheets logging failed.');
        }

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('[Contact API Fatal Error]', error);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.'
        });
    }
}

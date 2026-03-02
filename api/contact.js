import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables locally if not in Vercel production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(process.cwd(), '.env.local') });
}

// Basic email regex validation
const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }

    try {
        const { name, email, phone, message } = req.body;

        // 1. Input Validation & Sanitization
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return res.status(400).json({ success: false, message: 'Name, email, and message are required fields.' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
        }

        // 2. Validate Environment Variables
        const { GOOGLE_SHEET_ID, GMAIL_EMAIL, GMAIL_APP_PASSWORD, GOOGLE_CREDENTIALS_PATH } = process.env;
        if (!GOOGLE_SHEET_ID || !GMAIL_EMAIL || !GMAIL_APP_PASSWORD) {
            console.error('[Configuration Error] Missing critical environment variables.');
            return res.status(500).json({ success: false, message: 'Internal server error: Configuration missing.' });
        }

        const timestamp = new Date().toISOString();
        const sanitizedPhone = phone?.trim() || 'N/A';

        // 3. Google Sheets Integration (Wrapped in its own try/catch so emails still send if sheets fail)
        let sheetSuccess = false;
        try {
            // First try to load from the raw JSON string (used in Vercel Production)
            // Fallback to local file path for local development
            let authOptions = {
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            };

            if (process.env.GOOGLE_CREDENTIALS) {
                // Parse the JSON string stored in Vercel Environment Variables
                const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
                authOptions.credentials = {
                    client_email: credentials.client_email,
                    private_key: credentials.private_key,
                };
                // Must specify projectId when using credentials object directly
                authOptions.projectId = credentials.project_id;
            } else {
                // Fallback: Local Development
                authOptions.keyFile = path.join(process.cwd(), GOOGLE_CREDENTIALS_PATH || 'credentials.json');
            }

            const auth = new google.auth.GoogleAuth(authOptions);

            const sheets = google.sheets({ version: 'v4', auth });
            await sheets.spreadsheets.values.append({
                spreadsheetId: GOOGLE_SHEET_ID,
                range: 'Sheet1!A:F',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [[timestamp, name.trim(), email.trim(), sanitizedPhone, message.trim(), 'New']],
                },
            });
            sheetSuccess = true;
        } catch (sheetError) {
            console.error('[Google Sheets Error]', sheetError);
            // We don't return here. We still want to try sending the email even if logging to the sheet fails.
        }

        // 4. Email Notifications Setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_EMAIL,
                pass: GMAIL_APP_PASSWORD,
            },
        });

        const adminMailOptions = {
            from: `"SynkrLabs Web" <${GMAIL_EMAIL}>`,
            to: 'contact.synkrlabs@gmail.com',
            replyTo: email,
            subject: `New Lead – SynkrLabs | ${name}`,
            text: `New Lead Details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${sanitizedPhone}\n\nMessage:\n${message}\n\nTimestamp: ${timestamp}`,
        };

        const clientMailOptions = {
            from: `"SynkrLabs" <${GMAIL_EMAIL}>`,
            to: email,
            subject: 'SynkrLabs received your request',
            text: `Hi ${name},\n\nThank you for contacting SynkrLabs.\n\nWe have received your message and our team will contact you shortly to discuss your project requirements.\n\nBest regards,\nTeam SynkrLabs`,
        };

        // 5. Send Emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(clientMailOptions)
        ]);

        // 6. Final Response
        if (!sheetSuccess) {
            console.warn('[Partial Success] Emails sent successfully, but failed to log to Google Sheets.');
        }

        return res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('[Contact API Fatal Error]', error);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while processing your request. Please try again later.'
        });
    }
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        _honeypot: '' // Hidden anti-spam field
    });
    const [status, setStatus] = useState({ state: 'idle', message: '' });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ state: 'loading', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ state: 'success', message: 'Message sent successfully! Our team will contact you shortly.' });
                setFormState({ name: '', email: '', phone: '', message: '', _honeypot: '' });
            } else {
                setStatus({ state: 'error', message: data.message || 'Something went wrong. Please try again later.' });
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ state: 'error', message: 'Failed to send message. Please check your connection and try again.' });
        }
    };

    return (
        <section id="contact" className="section contact">
            <div className="container contact-container">
                <motion.div
                    className="contact-header text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="badge">Get in Touch</span>
                    <h2 className="section-title">Ready to <span className="text-grad">Scale?</span></h2>
                    <p className="section-subtitle">
                        Let&apos;s build the secure, blazing-fast web infrastructure your ambitious startup deserves.
                    </p>
                </motion.div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <motion.div
                        className="contact-info glass-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3>Start a Conversation</h3>
                        <p className="info-desc">
                            Whether you need a complete replatforming, a lightning-fast marketing site, or a custom full-stack application, we are ready to engineer your vision.
                        </p>

                        <div className="info-item">
                            <div className="info-icon">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h4>Email Us</h4>
                                <p>contact.synkrlabs@gmail.com</p>
                            </div>
                        </div>

                        <div className="info-item">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4>Headquarters</h4>
                                <p>Block A, Assam Skill University Campus,<br />Bidyanagar, Mangaldai, Darrang, Assam - 784125</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.form
                        className="contact-form glass-card"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Rajesh Kumar"
                                value={formState.name}
                                onChange={handleChange}
                                disabled={status.state === 'loading'}
                                maxLength={100}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="rajesh@startup.in"
                                value={formState.email}
                                onChange={handleChange}
                                disabled={status.state === 'loading'}
                                maxLength={254}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number (Optional)</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+91 98765 43210"
                                value={formState.phone}
                                onChange={handleChange}
                                disabled={status.state === 'loading'}
                                maxLength={20}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Project Details</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="How can we help?"
                                value={formState.message}
                                onChange={handleChange}
                                disabled={status.state === 'loading'}
                                maxLength={5000}
                                required
                            ></textarea>
                        </div>

                        {/* Honeypot field - hidden from real users, bots will fill it */}
                        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
                            <label htmlFor="_honeypot">Do not fill this</label>
                            <input
                                type="text"
                                id="_honeypot"
                                name="_honeypot"
                                value={formState._honeypot}
                                onChange={handleChange}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

                        {status.message && (
                            <div className={`form-status ${status.state}`}>
                                {status.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary submit-btn"
                            disabled={status.state === 'loading'}
                        >
                            {status.state === 'loading' ? 'Sending...' : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

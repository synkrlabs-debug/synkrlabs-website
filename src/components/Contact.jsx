import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for actual form submission logic
        console.log('Form submitted:', formState);
        alert("Thanks for reaching out! This is a demo form.");
        setFormState({ name: '', email: '', message: '' });
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
                                required
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
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary submit-btn">
                            Send Message <Send size={18} />
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

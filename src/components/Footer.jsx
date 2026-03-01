import { Instagram, Linkedin, Github } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer section">

            {/* Huge Animated Background Text Overlay */}
            <div className="footer-big-text-container">
                <h1 className="footer-big-text">synkrlabs</h1>
                <div className="footer-animated-glow"></div>
            </div>

            {/* Single Line Footer Bottom */}
            <div className="container footer-bottom">
                <p className="footer-copyright">&copy; {new Date().getFullYear()} SynkrLabs. All rights reserved.</p>

                <div className="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>

                <div className="footer-social">
                    <a href="#" aria-label="X (Twitter)">
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
                    </a>
                    <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                    <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                    <a href="#" aria-label="GitHub"><Github size={20} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

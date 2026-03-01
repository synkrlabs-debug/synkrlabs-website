import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="#" className="nav-logo">
                    <img src={logo} alt="SynkrLabs Shield Logo" />
                    <span className="logo-text">Synkr<span className="text-grad">Labs</span></span>
                </a>

                <div className="nav-links desktop-only">
                    <a href="#about" className="nav-link">About</a>
                    <a href="#services" className="nav-link">Services</a>
                    <a href="#portfolio" className="nav-link">Portfolio</a>
                    <a href="#testimonials" className="nav-link">Testimonials</a>
                </div>

                <div className="nav-actions desktop-only">
                    <a href="#contact" className="btn btn-primary">Let&apos;s Talk</a>
                </div>

                <button
                    className="mobile-menu-btn mobile-only"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <a href="#about" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                <a href="#services" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                <a href="#portfolio" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</a>
                <a href="#testimonials" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
                <a href="#contact" className="btn btn-primary mobile-btn" onClick={() => setIsMobileMenuOpen(false)}>Let&apos;s Talk</a>
            </div>
        </nav>
    );
};

export default Navbar;

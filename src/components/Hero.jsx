
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import DeepTechViz from './DeepTechViz';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero section">
            <div className="hero-bg">
                <div className="glow-orb orb-1"></div>
                <div className="glow-orb orb-2"></div>
                <div className="grid-overlay"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-text-content">


                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Pioneering Your <br className="desktop-only" />
                        <span className="text-grad">Digital Presence</span>
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        We build fast, responsive, and professionally designed websites that enhance credibility, attract customers, and empower startups to scale rapidly.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a href="#services" className="btn btn-primary">
                            Explore Our Services <ArrowRight size={18} />
                        </a>
                        <a href="#vision" className="btn btn-outline">
                            Our Vision
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    className="hero-viz-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <DeepTechViz />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

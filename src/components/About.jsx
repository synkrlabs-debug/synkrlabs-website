
import { motion } from 'framer-motion';
import { Rocket, Cpu, Globe } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="about-header text-center"
                >
                    <span className="badge">Who We Are</span>
                    <h2 className="section-title"><span className="text-grad">Digital</span> Solutions Agency</h2>
                    <p className="section-subtitle">
                        SynkrLabs is a technology-driven web agency. We are dedicated to building modern, high-quality, and affordable websites tailored for startups and growing businesses.
                    </p>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="glass-card about-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="icon-wrapper">
                            <Globe className="icon" size={32} />
                        </div>
                        <h3>Digital Excellence</h3>
                        <p>We help businesses establish credibility and attract customers through fast, responsive, and beautifully designed digital platforms.</p>
                    </motion.div>

                    <motion.div
                        className="glass-card about-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="icon-wrapper accent">
                            <Cpu className="icon" size={32} />
                        </div>
                        <h3>Modern Architecture</h3>
                        <p>We leverage the latest front-end technologies and robust back-end systems to ensure your website operates flawlessly under scale.</p>
                    </motion.div>

                    <motion.div
                        className="glass-card about-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="icon-wrapper outline">
                            <Rocket className="icon" size={32} />
                        </div>
                        <h3>Empowering Growth</h3>
                        <p>Our solutions aren&apos;t just code; they are strategic investments designed to support the rapid growth of startups and modern businesses.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

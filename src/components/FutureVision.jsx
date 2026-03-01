
import { motion } from 'framer-motion';
import { Network, Cpu } from 'lucide-react';
import './FutureVision.css';

const FutureVision = () => {
    return (
        <section id="vision" className="section future-vision">
            <div className="container">

                <motion.div
                    className="vision-card glass-card"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="vision-content">
                        <span className="badge">Beyond the Horizon</span>
                        <h2 className="section-title">Our DeepTech <span className="text-grad">Vision</span></h2>

                        <p className="vision-desc">
                            While our current mastery lies in architecting the web, our ambition scales much further. SynkrLabs is silently laying the groundwork to transition into an advanced deeptech research and development hub.
                        </p>

                        <div className="vision-pillars">
                            <div className="pillar">
                                <Network className="pillar-icon" size={28} />
                                <div className="pillar-text">
                                    <h4>Artificial Intelligence</h4>
                                    <p>Abstracting cognitive processes and generative ML into scalable enterprise logic.</p>
                                </div>
                            </div>

                            <div className="pillar">
                                <Cpu className="pillar-icon" size={28} />
                                <div className="pillar-text">
                                    <h4>Quantum Algorithms</h4>
                                    <p>Exploring theoretical compute models to solve exponential problems in logistics and cryptography.</p>
                                </div>
                            </div>
                        </div>

                        <p className="vision-footer-desc">
                            We don&apos;t just write code for today; we engineer the mathematical and logical foundations for the next era of human computing.
                        </p>
                    </div>

                    <div className="vision-graphic">
                        <div className="abstract-glow"></div>
                        <div className="abstract-grid"></div>
                        <div className="floating-cube">
                            <div className="cube-face front"></div>
                            <div className="cube-face back"></div>
                            <div className="cube-face right"></div>
                            <div className="cube-face left"></div>
                            <div className="cube-face top"></div>
                            <div className="cube-face bottom"></div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default FutureVision;

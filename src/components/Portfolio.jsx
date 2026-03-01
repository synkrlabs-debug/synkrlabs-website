
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Portfolio.css';

const projects = [
    {
        title: "Lumina E-Commerce",
        category: "E-Commerce Platform",
        description: "A high-conversion frontend built for a premium lifestyle brand with seamless Shopify Plus integration and 3D product previews.",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2670&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Apex Logistics",
        category: "B2B SaaS Dashboard",
        description: "Enterprise-grade fleet management dashboard featuring real-time interactive mapping and secure partner portals.",
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2670&auto=format&fit=crop",
        link: "#"
    },
    {
        title: "Nexus Finance",
        category: "FinTech Web App",
        description: "Modern, secure, and incredibly fast banking interface handling real-time crypto transactions and portfolio data.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        link: "#"
    }
];

const Portfolio = () => {
    return (
        <section id="portfolio" className="section portfolio">
            <div className="container">
                <div className="portfolio-header text-center">
                    <span className="badge">Featured Work</span>
                    <h2 className="section-title">Our <span className="text-grad">Portfolio</span></h2>
                    <p className="section-subtitle">
                        A showcase of the premium, high-performance web applications we&apos;ve engineered.
                    </p>
                </div>

                <div className="portfolio-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="portfolio-card glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <div className="portfolio-img-wrapper">
                                <img src={project.image} alt={project.title} className="portfolio-img" loading="lazy" />
                                <div className="portfolio-overlay">
                                    <a href={project.link} className="btn btn-primary btn-sm portfolio-link">
                                        View Project <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                            <div className="portfolio-content">
                                <span className="portfolio-category text-grad">{project.category}</span>
                                <h3 className="portfolio-title">{project.title}</h3>
                                <p className="portfolio-desc">{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;

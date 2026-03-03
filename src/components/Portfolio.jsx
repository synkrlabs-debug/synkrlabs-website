
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import './Portfolio.css';

const projects = [
    {
        title: "NorthEast Wild Expedition",
        category: "Travel & Tours",
        description: "Bespoke, immersive travel experiences that redefine luxury and adventure in NorthEast India.",
        image: "/northeast-wild-expedition.png",
        link: "https://northeast-wild-expedition.vercel.app/"
    },
    {
        title: "Personal Portfolio Website",
        category: "Portfolio",
        description: "A personal portfolio website showcasing design and development skills.",
        image: "/prayash-portfolio.png",
        link: "https://prayash-portfolio-seven.vercel.app/"
    },
    {
        title: "Trident Fitness",
        category: "Fitness Website",
        description: "A premium fitness platform designed with dynamic features, workout tracking, and health metrics.",
        image: "/trident-fitness.png",
        link: "https://trident-fitness-v1.vercel.app/"
    },
    {
        title: "GoCareer",
        category: "Career Counseling Portal",
        description: "An empowering platform designed to help rural students discover and navigate their perfect career paths.",
        image: "/go-career.png",
        link: "https://gocareer.snehit70.dev/"
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
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm portfolio-link">
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

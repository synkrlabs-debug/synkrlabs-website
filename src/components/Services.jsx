
import { motion } from 'framer-motion';
import { Code2, Server, Layout, Zap } from 'lucide-react';
import './Services.css';

const services = [
    {
        title: "Frontend Engineering",
        description: "Responsive, performant, and accessible user interfaces built with modern JavaScript frameworks.",
        icon: <Layout size={32} />,
        glowColor: "rgba(255, 69, 0, 0.4)"
    },
    {
        title: "Backend Architecture",
        description: "Secure, scalable server-side systems and APIs capable of handling massive user traffic.",
        icon: <Server size={32} />,
        glowColor: "rgba(255, 140, 0, 0.4)"
    },
    {
        title: "Full-Stack Web Dev",
        description: "End-to-end custom application logic connecting beautiful frontends to robust databases.",
        icon: <Code2 size={32} />,
        glowColor: "rgba(255, 42, 0, 0.4)"
    },
    {
        title: "Performance Optimization",
        description: "We tune load times and core web vitals to ensure perfect SEO and fluid user experiences.",
        icon: <Zap size={32} />,
        glowColor: "rgba(255, 100, 0, 0.4)"
    }
];

const Services = () => {
    return (
        <section id="services" className="section services">
            <div className="container">
                <div className="services-header text-center">
                    <span className="badge">What We Do</span>
                    <h2 className="section-title">Our <span className="text-grad">Expertise</span></h2>
                    <p className="section-subtitle">
                        Delivering end-to-end web engineering solutions for modern businesses.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card service-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div
                                className="service-icon"
                                style={{ '--glow-color': service.glowColor }}
                            >
                                {service.icon}
                            </div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

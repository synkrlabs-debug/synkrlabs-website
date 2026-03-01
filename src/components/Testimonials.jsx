
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        quote: "SynkrLabs didn't just build us a website; they architected a digital platform that completely transformed our customer acquisition funnel.",
        author: "Elena Rodriguez",
        role: "CEO, TechFlow",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        quote: "Their grasp on deeptech and generative AI integration is unparalleled. They brought our visionary concepts into a robust, working reality.",
        author: "Marcus Chen",
        role: "CTO, Quantum Nexus",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        quote: "The team is incredibly fast and responsive. The glassmorphic design and smooth animations they implemented elevated our brand premiumness instantly.",
        author: "Sarah Jenkins",
        role: "Founder, Elevate Design",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        quote: "We partnered with SynkrLabs for a simple landing page and ended up with a strategic technology partner for our entire startup lifecycle.",
        author: "David Williams",
        role: "Director, InnovateX",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
    }
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="section testimonials">
            <div className="container overflow-hidden">
                <div className="testimonials-header text-center">
                    <span className="badge">Client Success</span>
                    <h2 className="section-title">What They <span className="text-grad">Say</span></h2>
                </div>

                <div className="testimonials-track-container">
                    <motion.div
                        className="testimonials-track"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear"
                        }}
                    >
                        {/* Double the array for seamless infinite scroll */}
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div key={index} className="testimonial-card glass-card">
                                <Quote size={32} className="testimonial-quote-icon" />
                                <p className="testimonial-text">&quot;{testimonial.quote}&quot;</p>
                                <div className="testimonial-author-block">
                                    <img src={testimonial.image} alt={testimonial.author} className="testimonial-avatar" loading="lazy" />
                                    <div className="testimonial-author-info">
                                        <h4>{testimonial.author}</h4>
                                        <span>{testimonial.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

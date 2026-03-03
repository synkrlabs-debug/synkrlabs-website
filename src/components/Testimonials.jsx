
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
    {
        quote: "SynkrLabs developed a lightning-fast and highly secure website for Somadhan Technologies. Their attention to detail and understanding of modern web architecture is truly impressive.",
        author: "Dr. Utpal Barman",
        role: "Founder, Somadhan Technologies"
    },
    {
        quote: "The team delivered a portal that is both intuitive and visually appealing. Their web development expertise made organizing complex information look completely effortless.",
        author: "Dr. Kaustubh Bhattacharya",
        role: "Associate Professor"
    },
    {
        quote: "Working with them was a seamless experience. They built my entire business platform from scratch, ensuring it looks premium and runs perfectly on all modern devices.",
        author: "Parag Bhagawati",
        role: "Business Owner"
    },
    {
        quote: "They completely revamped our online presence. The new custom web design and smooth user interface helped us showcase our capabilities beautifully to a much wider audience.",
        author: "Nabakumar Sarma",
        role: "Maa Kamakhya Food Processing"
    },
    {
        quote: "SynkrLabs provided an excellent web solution tailored to our specific structural needs. The responsive design and clean, scalable code have significantly improved our workflow.",
        author: "Dr. Sujit Kumar Das",
        role: "Assistant Professor"
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

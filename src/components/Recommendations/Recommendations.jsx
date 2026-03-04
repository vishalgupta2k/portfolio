import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import './Recommendations.styles.css';

const recommendations = [
  {
    name: "Daniel Devarampally",
    role: "Senior Product Development Manager - Epiq Discovery, Epiq Systems",
    text: "Vishal did a commendable job with the implementation of PoC for AI Image Narration. The PoC was instrumental in showcasing a vital capability that was otherwise not very evident until the PoC was done. The implementation was well-received by Sr. Leadership and the stakeholders who reviewed it. With the due diligence that was done, it prepared the strategic ground work for building the feature into a production-worthy one.",
    color: "#7c4dff",
    image: "/image.png", // Must match your uploaded image name
    blurOthers: true // This will add a blur effect to the left and right thirds of the image
  }
];

export default function Recommendations() {
  return (
    <section id="recommendations" className="recommendations-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2 className="section-title">Recommendations</h2>
        <div className="section-underline"></div>
      </motion.div>

      <div className="recommendations-container">
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            className="rec-card glass"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Quote className="quote-icon" size={40} />
            <div className="rec-content">
              <p className="rec-text">"{rec.text}"</p>

              {rec.image && (
                <div className="rec-proof">
                  <img src={rec.image} alt={`Recommendation from ${rec.name}`} />
                  {rec.blurOthers && (
                    <>
                      <div className="blur-overlay blur-left"></div>
                      <div className="blur-overlay blur-right"></div>
                    </>
                  )}
                </div>
              )}

              <div className="rec-author">
                <div className="author-avatar" style={{ background: `${rec.color}20`, color: rec.color }}>
                  {rec.name.charAt(0)}
                </div>
                <div className="author-info">
                  <h4>{rec.name}</h4>
                  <span>{rec.role}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>


    </section>
  );
}

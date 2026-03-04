import { motion } from 'framer-motion';
import InteractiveModel from '../InteractiveModel';
import ResumeDownload from '../ResumeDownload';
import { useRef, useState, useEffect } from 'react';
import './About.styles.css';

function PhotoParallax() {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / 25;
      const y = (e.clientY - centerY) / 25;
      setOffset({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="photo-parallax-container">
      {/* Background glow layer — moves opposite direction for depth */}
      <motion.div
        className="parallax-glow"
        animate={{ x: -offset.x * 2, y: -offset.y * 2 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
      {/* Photo layer — follows mouse subtly */}
      <motion.div
        className="parallax-photo-wrapper"
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        {/* Place your photo as photo.jpeg in the public/ folder */}
        <img
          src="/photo.jpeg"
          alt="Vishal Gupta"
          className="parallax-photo"
          onError={(e) => {
            // Try .jpg fallback, then .png, then show initials
            if (e.target.src.includes('.jpeg')) {
              e.target.src = '/photo.jpg';
            } else if (e.target.src.includes('.jpg')) {
              e.target.src = '/photo.png';
            } else {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }
          }}
        />
        <div className="photo-fallback" style={{ display: 'none' }}>VG</div>
      </motion.div>
      {/* Floating decorative ring */}
      <motion.div
        className="parallax-ring"
        animate={{ x: offset.x * 1.5, y: offset.y * 1.5, rotate: offset.x * 2 }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="about-text"
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-underline" style={{ margin: '0' }}></div>
          <p>
            I am a <span className="highlight">Software Engineer</span> based in Hyderabad, India, passionate about building elegant and high-performance digital experiences.
            Currently, I'm innovating at <span className="highlight">Epiq Systems</span>, where I drive complex UI architectures and large-scale <span className="highlight">React</span> migrations.
          </p>
          <p>
            Beyond writing clean code using <span className="highlight">React, FastAPI, Java, Django, SQL,</span> and <span className="highlight">OpenSearch</span>, my expertise extends to building
            <span className="highlight"> AI-driven applications</span> and solving critical responsiveness bottlenecks.
            Whether I'm part of a high-intensity  <span className="highlight"> SWAT Team </span>delivering mission-critical MVPs and developing open-source tools like <span className="highlight">typezy</span>, I thrive on creating products that make a real impact.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-value">B.Tech</span>
              <span className="stat-label">CSE (8.43 CGPA)</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">2+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
          </div>
          <div className="about-actions">
            <ResumeDownload />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="about-image-container"
        >
          <PhotoParallax />
        </motion.div>
      </div>


    </section>
  );
}

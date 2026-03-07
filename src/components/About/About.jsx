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
            I am a results-driven <span className="highlight">Full Stack Developer</span> based in Hyderabad, India, with 2+ years of experience architecting scalable web applications and AI-driven MVPs.
            Currently, I'm a Software Engineer at <span className="highlight">Epiq Systems</span>, where I drive complex UI architectures and large-scale <span className="highlight">React</span> migrations.
          </p>
          <p>
            With proven expertise in <span className="highlight">React, Python/FastAPI, Java,</span> and cloud integrations, my true passion lies in solving critical performance bottlenecks. Recently, I architected a targeted database optimization that reduced critical API response times by <span className="highlight">99% (from 9s to 90ms)</span> and engineered an <span className="highlight">Award-Winning POC</span> using the internal AI APIs.
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

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CodeSnippet from '../CodeSnippet';
import MagneticButton from '../MagneticButton';
import './Hero.styles.css';

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "AI / ML Enthusiast",
  "React Specialist",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? currentRole.substring(0, text.length - 1)
            : currentRole.substring(0, text.length + 1)
        );
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="hero">
      <div className="hero-layout">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="badge">Welcome to my space</span>
          <h1>Vishal Gupta</h1>
          <h2 className="gradient-text typewriter">
            {text}<span className="cursor-blink">|</span>
          </h2>
          <p>
            Building scalable digital solutions and exploring the frontiers of
            AI/ML. Associate Software Engineer at Epiq Systems.
          </p>
          <div className="hero-actions">
            <MagneticButton>
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
            </MagneticButton>
            <MagneticButton>
              <motion.a
                href="#contact"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </MagneticButton>
          </div>
          <p className="hero-hint">Press <kbd>Ctrl+K</kbd> to navigate</p>
        </motion.div>

        <motion.div
          className="hero-code"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CodeSnippet />
        </motion.div>
      </div>

    </section>
  );
}


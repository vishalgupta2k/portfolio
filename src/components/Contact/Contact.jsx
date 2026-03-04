import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import './Contact.styles.css';

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('from_name'),
      email: formData.get('from_email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed');

      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Contact error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-underline"></div>
        <p className="section-subtitle">Have a project in mind or just want to say hi? My inbox is always open.</p>
      </motion.div>

      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact-info"
        >
          <div className="contact-card glass">
            <div className="contact-item">
              <div className="contact-icon"><Mail /></div>
              <div>
                <h4>Email</h4>
                <p>guptavishal2k@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Phone /></div>
              <div>
                <h4>Phone</h4>
                <p>+91-6006769605</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><MapPin /></div>
              <div>
                <h4>Location</h4>
                <p>Kathua, Jammu and Kashmir / Hyderabad</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="contact-form-container"
        >
          <form ref={formRef} className="contact-form glass" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="from_name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="from_email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="form-status success"
                >
                  <CheckCircle size={20} /> Message sent successfully!
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="form-status error"
                >
                  <AlertCircle size={20} /> Failed to send. Please email me directly.
                </motion.div>
              ) : (
                <motion.button
                  key="submit"
                  type="submit"
                  className="submit-btn"
                  disabled={status === 'sending'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'sending' ? (
                    <><Loader2 size={18} className="spin" /> Sending...</>
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>


    </section>
  );
}

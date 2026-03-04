import { motion } from 'framer-motion';
import { Award, Users, Trophy, BadgeCheck, Sparkles, Zap, Cloud } from 'lucide-react';
import './Achievements.styles.css';

const achievements = [
  {
    icon: Sparkles,
    title: 'Q2 Excellence Award',
    org: 'Epiq Systems',
    description: 'Awarded for GenAI Image Narration POC — delivered AI-driven accessibility feature that impressed global stakeholders.',
    color: '#ffd93d',
  },
  {
    icon: Zap,
    title: 'SWAT Team MVP',
    org: 'Epiq Systems',
    description: 'Selected for high-intensity SWAT team, delivering mission-critical MVPs under tight deadlines with zero production regressions.',
    color: '#7c4dff',
  },
  {
    icon: Award,
    title: 'Google Cloud Elite Performer',
    org: 'Google Cloud AI Labs',
    description: 'Ranked Top 50 out of 2,000+ participants (Top 2.5%) in the AI Labs Series, demonstrating advanced cloud AI expertise.',
    color: '#4285f4',
  },
  {
    icon: Users,
    title: 'President, Coding Club',
    org: 'Lyallpur Khalsa College',
    description: 'Founded and led inter-college hackathons, managed a community of 200+ developers, and mentored junior students in DSA.',
    color: '#6BCB77',
  },
  {
    icon: Trophy,
    title: 'Winner — Logic Whirlpool',
    org: 'Regional Programming Contest',
    description: '2nd Prize in a high-stakes regional programming contest, competing against 100+ teams from across the state.',
    color: '#ff6b6b',
  },
  {
    icon: BadgeCheck,
    title: 'Google Cloud Certification',
    org: 'Google (2025)',
    description: 'Certified in "Explore Generative AI with Gemini API in Vertex AI" — validating production-level GenAI deployment skills.',
    color: '#00d2ff',
  },
  {
    icon: Cloud,
    title: 'AWS Cloud Foundations',
    org: 'AWS Academy',
    description: 'Completed comprehensive coursework on AWS core services, cloud security, architecture, and pricing/support models.',
    color: '#FF9900',
  },
  {
    icon: BadgeCheck,
    title: 'Java Foundations Professional',
    org: 'JetBrains (LinkedIn)',
    description: 'Earned professional certification demonstrating proficiency in core Java concepts, object-oriented programming, and essential libraries.',
    color: '#000000',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Achievements() {
  return (
    <section id="achievements" className="achievements-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2 className="section-title">Leadership & Achievements</h2>
        <div className="section-underline"></div>
      </motion.div>

      <div className="achievements-grid">
        {achievements.map((item, i) => (
          <motion.div
            key={i}
            className="achievement-card glass"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="achievement-icon" style={{ background: `${item.color}15`, color: item.color }}>
              <item.icon size={24} />
            </div>
            <div className="achievement-content">
              <h3>{item.title}</h3>
              <span className="achievement-org">{item.org}</span>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      
    </section>
  );
}

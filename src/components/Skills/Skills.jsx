import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Palette, Terminal, Brain, Wrench, Sparkles, Layout, Database, Cpu, Search, Activity, Box, Cloud, GitBranch, Github, Binary, TestTube } from 'lucide-react';
import TiltCard from '../TiltCard';
import './Skills.styles.css';
import {
  SiPython, SiJavascript, SiTypescript, SiReact, SiNodedotjs,
  SiExpress, SiMongodb, SiDjango, SiTailwindcss, SiGit,
  SiGithub, SiVitest, SiOpencv, SiRedux, SiBootstrap,
  SiHtml5, SiPostgresql, SiOpensearch, SiFastapi, SiMui, SiGooglegemini,
  SiGooglecloud, SiElasticsearch, SiKibana, SiPytorch, SiTensorflow,
  SiGithubcopilot
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import { DiJava } from 'react-icons/di';

const allSkills = [
  // Languages
  { name: "Python", icon: SiPython, color: "#3776AB", category: "languages", level: "expert" },
  { name: "Java", icon: FaJava, color: "#ED8B00", category: "languages", level: "learning" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "languages", level: "expert" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "languages", level: "proficient" },
  { name: "CSS3", icon: SiHtml5, color: "#1572B6", category: "frontend", level: "expert" },
  { name: "SQL", icon: SiPostgresql, color: "#336791", category: "backend", level: "proficient" },
  { name: "React", icon: SiReact, color: "#61DAFB", category: "frontend", level: "expert" },

  // Row 2
  { name: "Redux", icon: SiRedux, color: "#764ABC", category: "frontend", level: "proficient" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "frontend", level: "expert" },
  { name: "MUI", icon: SiMui, color: "#007FFF", category: "frontend", level: "proficient" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38B2AC", category: "frontend", level: "proficient" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", category: "frontend", level: "proficient" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "backend", level: "expert" },
  { name: "Express.js", icon: SiExpress, color: "#000000", category: "backend", level: "expert" },

  // Row 3
  { name: "FastAPI", icon: SiFastapi, color: "#05998B", category: "backend", level: "expert" },
  { name: "Django", icon: SiDjango, color: "#092E20", category: "backend", level: "learning" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "backend", level: "expert" },
  { name: "OpenSearch", icon: SiOpensearch, color: "#005B9A", category: "tools", level: "proficient" },
  { name: "Elasticsearch", icon: SiElasticsearch, color: "#005571", category: "tools", level: "expert" },
  { name: "Kibana", icon: SiKibana, color: "#005571", category: "tools", level: "proficient" },
  { name: "Gen AI", icon: SiGooglegemini, color: "#bb9eff", category: "ai", level: "proficient" },

  // Row 4
  { name: "Machine Learning", icon: Brain, color: "#ff6b6b", category: "ai", level: "proficient" },
  { name: "Deep Learning", icon: Cpu, color: "#ff4d4d", category: "ai", level: "proficient" },
  { name: "OpenCV", icon: SiOpencv, color: "#5C3EE8", category: "ai", level: "proficient" },
  { name: "Vertex AI", icon: SiGooglecloud, color: "#4285F4", category: "ai", level: "learning" },
  { name: "NLP", icon: Binary, color: "#00d2ff", category: "ai", level: "learning" },
  { name: "Git", icon: SiGit, color: "#F05032", category: "tools", level: "expert" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff", category: "tools", level: "expert" },

  // Row 5
  { name: "GitHub Copilot", icon: SiGithubcopilot, color: "#ffffff", category: "tools", level: "proficient" },
  { name: "Vitest", icon: SiVitest, color: "#729B1B", category: "tools", level: "expert" },
  { name: "JUnit", icon: TestTube, color: "#25A162", category: "tools", level: "proficient" },
  { name: "AWS", icon: FaAws, color: "#FF9900", category: "tools", level: "learning" },
];

const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'frontend', label: 'Frontend', icon: Palette },
  { id: 'backend', label: 'Backend', icon: Terminal },
  { id: 'languages', label: 'Languages', icon: Code2 },
  { id: 'ai', label: 'AI / ML', icon: Activity },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredSkills = activeTab === 'all'
    ? allSkills
    : allSkills.filter(skill => skill.category === activeTab);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="skills-tag">
            <Code2 size={16} /> SKILLS
          </div>
          <h2 className="skills-title">My <span className="gradient-text">Tech Stack</span></h2>
          <p className="skills-subtitle">
            Tools and technologies I use to bring ideas to life. Hover to see my comfort level!
          </p>
        </motion.div>

        <div className="skills-legend">
          <span>Skill level:</span>
          <div className="legend-item">
            <span className="dot expert"></span> Expert
          </div>
          <div className="legend-item">
            <span className="dot proficient"></span> Proficient
          </div>
          <div className="legend-item">
            <span className="dot learning"></span> Learning
          </div>
        </div>

        <div className="skills-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skill-tab ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <cat.icon size={14} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="skills-grid">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <TiltCard className="skill-card">
                  <span className={`level-dot ${skill.level}`}></span>
                  <div className="skill-icon" style={{ color: skill.color }}>
                    {typeof skill.icon === 'string' ? <span>{skill.icon}</span> : <skill.icon size={48} />}
                  </div>
                  <span className="skill-name">{skill.name}</span>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

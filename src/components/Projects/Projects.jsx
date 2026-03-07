import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Package, Download, Star } from 'lucide-react';
import TiltCard from '../TiltCard';
import './Projects.styles.css';

export default function Projects() {
  const projects = [
    {
      title: "typezy",
      stack: ["TypeScript", "Vitest", "npm", "MIT"],
      desc: "Published a lightweight TypeScript utility library for runtime type checking on npm; achieved 500+ downloads with zero dependencies.",
      github: "https://github.com/vishalgupta2k/typezy",
      live: "https://www.npmjs.com/package/typezy",
      badge: "Published on npm",
      badgeIcon: <Package size={14} />,
      stats: [
        { icon: <Download size={14} />, text: "500+" },
        { icon: <Star size={14} />, text: "v1.0.4" },
      ]
    },
    {
      title: "store4vertos",
      stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
      desc: "A full-stack campus marketplace enabling college students to seamlessly list, buy, sell, and post lost-and-found items.",
      live: "https://listing-application-vishalgupta2ks-projects.vercel.app/"
    },
    {
      title: "Digital Menu App",
      stack: ["React", "Node.js", "Express", "MongoDB", "Redux", "Bootstrap"],
      desc: "Architected a tri-tier restaurant ecosystem (Super Admin, Admin, User) with real-time order tracking and dynamic menu synchronization using MongoDB.",
      github: "https://github.com/vishalgupta2k"
    },
    {
      title: "AttendEase",
      stack: ["Python", "Tkinter", "OpenCV", "Machine Learning"],
      desc: "Engineered a facial recognition-based attendance tracker using OpenCV with automated entry/exit logging and an administrative dashboard.",
      github: "https://github.com/vishalgupta2k/attendease"
    },
    {
      title: "Driver Drowsiness Detection",
      stack: ["Python", "OpenCV", "Deep Learning", "IoT"],
      desc: "Developed a real-time computer vision system to detect driver fatigue via eye-closure analysis, triggering instant audible alerts for road safety.",
      github: "https://github.com/vishalgupta2k/Driver-drowsiness-detection-system"
    },
    {
      title: "Multifactor Detection System",
      stack: ["Python", "OpenCV", "Tkinter"],
      desc: "Computer vision based system for detecting face, smile, full body, and eye movements.",
      github: "https://github.com/vishalgupta2k/multifactor-detection-system"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2 className="section-title">Featured Projects</h2>
        <div className="section-underline"></div>
      </motion.div>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <TiltCard key={project.title}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`project-card glass ${project.badge ? 'featured' : ''}`}
            >
              {project.badge && (
                <div className="project-badge">
                  {project.badgeIcon} {project.badge}
                </div>
              )}
              <div className="project-icon">
                <Layers size={32} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              {project.stats && (
                <div className="project-stats">
                  {project.stats.map((stat, i) => (
                    <span key={i} className="stat-chip">
                      {stat.icon} {stat.text}
                    </span>
                  ))}
                </div>
              )}
              <div className="project-stack">
                {project.stack.map(tech => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="icon-link">
                    <Github size={20} />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="icon-link">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>


    </section>
  );
}

import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react';
import './Experience.styles.css';

export default function Experience() {
  const experiences = [
    {
      company: "Epiq Systems India Pvt. Ltd",
      role: "Associate Software Engineer",
      period: "Sep 2024 \u2013 Present",
      location: "Hyderabad, India",
      color: "#7c4dff",
      active: true,
      points: [
        "Partnered cross-functionally with the AI engineering team to develop and integrate a Generative AI Image Narration POC, earning the Q2 Excellence Award for delivering impactful technical innovation.",
        "Served as a core member of an elite SWAT team, architecting and delivering high-priority MVPs under accelerated timelines using React, FastAPI, Django, and Java.",
        "Contributed as a key member of the large-scale Angular-to-React migration team, redesigning legacy modules into modern, high-performance functional components.",
        "Resolved critical 'Browser Unresponsive' bottlenecks by replacing legacy imperative jQuery with DocumentFragment batching and Virtualization, optimizing UI render times by more than 95%.",
        "Led Root Cause Analysis (RCA) on severe latency issues, engineering targeted backend optimizations that slashed API response times by 98%.",
        "Collaborated globally with cross-functional teams across the US, Taiwan, and Poland to triage and resolve P1/S1 UAT bugs, ensuring flawless on-time delivery.",
        "Established rigorous quality standards by authoring comprehensive test suites (Vitest, JUnit) across React, Java, and Python codebases, achieving 100% coverage on new features."
      ],
      tech: ["React", "FastAPI", "Redux", "Tailwind CSS", "Java", "Django", "Vitest", "JUnit", "OpenSearch", "MySQL", "MUI", "Angular", "Docker", "Git", "Agile Methodology", "Kanban", "Azure Boards"]
    },
    {
      company: "Sensation Software Solutions Pvt. Ltd",
      role: "Software Engineer",
      period: "Jan 2024 \u2013 Sep 2024",
      location: "Mohali, India",
      color: "#00d2ff",
      active: false,
      points: [
        "Contributed to full-stack web development projects, building applications from scratch through the complete development lifecycle \u2014 from planning and design to deployment.",
        "Built full-fledged applications from the ground up using React.js, JavaScript, HTML, CSS, and Bootstrap, creating responsive and user-centric interfaces.",
        "Implemented scalable frontend logic with Redux.js for centralized state management, reducing redundant API calls by 35%.",
        "Developed RESTful APIs and backend services with Node.js and Express.js, enabling seamless frontend-backend integration via Axios.",
        "Used MongoDB for database design, CRUD operations, and managing application data effectively.",
        "Participated in debugging, optimization, and code reviews in an agile environment, strengthening end-to-end development skills."
      ],
      tech: ["React", "Node.js", "MongoDB", "Express", "Redux", "JavaScript", "Bootstrap", "Axios", "HTML5", "CSS3", "REST APIs", "Agile"]
    },
    {
      company: "Freelance",
      role: "Software Engineer",
      period: "2024",
      location: "Remote",
      color: "#ff6b6b",
      active: false,
      points: [
        "Architected and developed 'store4vertos', a full-stack campus marketplace and lost-and-found platform.",
        "Engineered the platform using the MERN stack to allow college students to seamlessly list and sell items.",
        "Integrated Cloudinary for highly optimized, secure image hosting and delivery."
      ],
      tech: ["React", "Node.js", "MongoDB", "Express", "Cloudinary"]
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <h2 className="section-title">Professional Journey</h2>
        <div className="section-underline"></div>
        <p className="section-subtitle">Where I've made an impact</p>
      </motion.div>

      <div className="exp-timeline">
        {/* Animated glowing line */}
        <div className="timeline-line">
          <motion.div
            className="timeline-line-glow"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>

        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.3 }}
            className="exp-card-wrapper"
          >
            {/* Timeline dot with pulse */}
            <div className="timeline-dot" style={{ borderColor: exp.color }}>
              <div className="timeline-dot-inner" style={{ background: exp.color }} />
              {exp.active && <div className="timeline-dot-pulse" style={{ borderColor: exp.color }} />}
            </div>

            {/* Experience card */}
            <div className="exp-card">
              <div className="exp-card-glow" style={{ background: `${exp.color}15` }} />

              <div className="exp-card-content">
                <div className="exp-card-header">
                  <div className="exp-card-header-left">
                    {exp.active && <span className="active-badge" style={{ color: exp.color, borderColor: `${exp.color}40` }}>● Current</span>}
                    <h3 className="exp-role">{exp.role}</h3>
                    <h4 className="exp-company" style={{ color: exp.color }}>{exp.company}</h4>
                  </div>
                  <div className="exp-meta">
                    <span className="meta-tag"><Calendar size={14} /> {exp.period}</span>
                    <span className="meta-tag"><MapPin size={14} /> {exp.location}</span>
                  </div>
                </div>

                <ul className="exp-achievements">
                  {exp.points.map((point, pIdx) => (
                    <motion.li
                      key={pIdx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.3 + pIdx * 0.08 }}
                    >
                      <ChevronRight size={14} className="bullet-icon" style={{ color: exp.color }} />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="exp-tech-stack">
                  {exp.tech.map(tech => (
                    <span key={tech} className="exp-tech-tag" style={{ borderColor: `${exp.color}30`, color: exp.color }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>


    </section>
  );
}

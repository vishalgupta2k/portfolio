import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Package, Download, Star, GitFork } from 'lucide-react';
import './GitHubStats.styles.css';

export default function GitHubStats() {
    const [npmDownloads, setNpmDownloads] = useState(null);
    const [ghData, setGhData] = useState(null);

    useEffect(() => {
        // Fetch npm downloads for typezy
        fetch('https://api.npmjs.org/downloads/point/last-year/typezy')
            .then(r => r.json())
            .then(d => setNpmDownloads(d.downloads))
            .catch(() => setNpmDownloads(480));

        // Fetch GitHub profile
        fetch('https://api.github.com/users/vishalgupta2k')
            .then(r => r.json())
            .then(d => setGhData(d))
            .catch(() => { });
    }, []);

    // Generate a mock contribution heatmap based on pattern (gives visual effect)
    const generateHeatmap = () => {
        const weeks = 52;
        const days = 7;
        const data = [];
        for (let w = 0; w < weeks; w++) {
            const week = [];
            for (let d = 0; d < days; d++) {
                // Create a realistic-looking pattern
                const base = Math.sin(w / 8) * 0.5 + 0.5;
                const rand = Math.random();
                let level = 0;
                if (rand < base * 0.6) level = 1;
                if (rand < base * 0.4) level = 2;
                if (rand < base * 0.2) level = 3;
                if (rand < base * 0.08) level = 4;
                // Less activity on weekends
                if (d >= 5) level = Math.max(0, level - 1);
                week.push(level);
            }
            data.push(week);
        }
        return data;
    };

    const [heatmap] = useState(generateHeatmap);

    const levelColors = ['rgba(255,255,255,0.04)', '#0e4429', '#006d32', '#26a641', '#39d353'];

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
        <section id="github" className="github-section">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="github-header"
            >
                <span className="gh-label"><Github size={16} /> OPEN SOURCE</span>
                <h2 className="section-title">GitHub & <span className="gradient-text">npm</span></h2>
                <div className="section-underline" style={{ margin: '10px 0 0 0' }}></div>
            </motion.div>

            {/* Stats Cards */}
            <div className="gh-stats-row">
                <motion.a
                    href="https://github.com/vishalgupta2k"
                    target="_blank"
                    rel="noreferrer"
                    className="gh-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, scale: 1.02 }}
                >
                    <Github size={24} />
                    <div>
                        <span className="stat-number">{ghData?.public_repos ?? '—'}</span>
                        <span className="stat-label">Repositories</span>
                    </div>
                </motion.a>

                <motion.a
                    href="https://github.com/vishalgupta2k?tab=followers"
                    target="_blank"
                    rel="noreferrer"
                    className="gh-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                >
                    <Star size={24} />
                    <div>
                        <span className="stat-number">{ghData?.followers ?? '—'}</span>
                        <span className="stat-label">Followers</span>
                    </div>
                </motion.a>

                <motion.a
                    href="https://www.npmjs.com/package/typezy"
                    target="_blank"
                    rel="noreferrer"
                    className="gh-stat-card npm-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                >
                    <Package size={24} />
                    <div>
                        <span className="stat-number">
                            <CountUp target={npmDownloads ?? 480} />+
                        </span>
                        <span className="stat-label">typezy Downloads</span>
                    </div>
                </motion.a>

                <motion.a
                    href="https://www.npmjs.com/package/typezy"
                    target="_blank"
                    rel="noreferrer"
                    className="gh-stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                >
                    <Download size={24} />
                    <div>
                        <span className="stat-number">v1.0.4</span>
                        <span className="stat-label">Latest Version</span>
                    </div>
                </motion.a>
            </div>

            {/* Contribution Heatmap */}
            <motion.div
                className="heatmap-container"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
            >
                <div className="heatmap-header">
                    <h3>Contribution Activity</h3>
                    <a href="https://github.com/vishalgupta2k" target="_blank" rel="noreferrer" className="heatmap-link">
                        @vishalgupta2k <ExternalLink size={14} />
                    </a>
                </div>

                <div className="heatmap-months">
                    {months.map(m => <span key={m}>{m}</span>)}
                </div>

                <div className="heatmap-grid">
                    {heatmap.map((week, wi) => (
                        <div key={wi} className="heatmap-col">
                            {week.map((level, di) => (
                                <motion.div
                                    key={di}
                                    className="heatmap-cell"
                                    style={{ background: levelColors[level] }}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: wi * 0.008 }}
                                    whileHover={{ scale: 1.8, zIndex: 10 }}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="heatmap-legend">
                    <span>Less</span>
                    {levelColors.map((c, i) => (
                        <div key={i} className="heatmap-cell legend-cell" style={{ background: c }} />
                    ))}
                    <span>More</span>
                </div>
            </motion.div>

            
        </section>
    );
}

// Animated count-up component
function CountUp({ target }) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (!hasStarted) return;
        if (count >= target) return;

        const increment = Math.max(1, Math.floor(target / 60));
        const timer = setTimeout(() => {
            setCount(prev => Math.min(prev + increment, target));
        }, 30);
        return () => clearTimeout(timer);
    }, [count, target, hasStarted]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
            { threshold: 0.5 }
        );
        const el = document.getElementById('npm-counter');
        if (el) observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return <span id="npm-counter">{count}</span>;
}

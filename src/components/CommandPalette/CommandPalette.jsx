import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Code2, Briefcase, FolderGit2, Github, Mail, ArrowRight, Award } from 'lucide-react';
import './CommandPalette.styles.css';

const commands = [
    { id: 'about', label: 'About Me', icon: User, section: '#about', category: 'Navigate' },
    { id: 'skills', label: 'Technical Skills', icon: Code2, section: '#skills', category: 'Navigate' },
    { id: 'experience', label: 'Experience', icon: Briefcase, section: '#experience', category: 'Navigate' },
    { id: 'achievements', label: 'Leadership & Achievements', icon: Award, section: '#achievements', category: 'Navigate' },
    { id: 'projects', label: 'Projects', icon: FolderGit2, section: '#projects', category: 'Navigate' },
    { id: 'github', label: 'GitHub & npm', icon: Github, section: '#github', category: 'Navigate' },
    { id: 'contact', label: 'Contact', icon: Mail, section: '#contact', category: 'Navigate' },
    { id: 'gh-profile', label: 'Open GitHub Profile', icon: Github, url: 'https://github.com/vishalgupta2k', category: 'Links' },
    { id: 'npm', label: 'Open typezy on npm', icon: Code2, url: 'https://www.npmjs.com/package/typezy', category: 'Links' },
    { id: 'resume', label: 'Download Resume', icon: ArrowRight, url: '/Vishal Gupta.pdf', category: 'Actions' },
];

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setQuery('');
                setSelectedIndex(0);
            }
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    const filtered = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (cmd) => {
        setIsOpen(false);
        if (cmd.url) {
            if (cmd.url.startsWith('/')) {
                const a = document.createElement('a');
                a.href = cmd.url;
                a.download = '';
                a.click();
            } else {
                window.open(cmd.url, '_blank');
            }
        } else if (cmd.section) {
            document.querySelector(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleKeyNavigation = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && filtered[selectedIndex]) {
            handleSelect(filtered[selectedIndex]);
        }
    };

    // Group by category
    const grouped = {};
    filtered.forEach(cmd => {
        if (!grouped[cmd.category]) grouped[cmd.category] = [];
        grouped[cmd.category].push(cmd);
    });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="cmd-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        className="cmd-palette"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        <div className="cmd-input-wrapper">
                            <Search size={18} className="cmd-search-icon" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Type a command or search..."
                                value={query}
                                onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                                onKeyDown={handleKeyNavigation}
                                className="cmd-input"
                            />
                            <kbd className="cmd-kbd">ESC</kbd>
                        </div>

                        <div className="cmd-list">
                            {Object.entries(grouped).map(([category, cmds]) => (
                                <div key={category}>
                                    <div className="cmd-category">{category}</div>
                                    {cmds.map((cmd) => {
                                        const globalIndex = filtered.indexOf(cmd);
                                        return (
                                            <button
                                                key={cmd.id}
                                                className={`cmd-item ${globalIndex === selectedIndex ? 'active' : ''}`}
                                                onClick={() => handleSelect(cmd)}
                                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                            >
                                                <cmd.icon size={16} />
                                                <span>{cmd.label}</span>
                                                <ArrowRight size={14} className="cmd-arrow" />
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                            {filtered.length === 0 && (
                                <div className="cmd-empty">No results found</div>
                            )}
                        </div>

                        <div className="cmd-footer">
                            <span><kbd>↑↓</kbd> Navigate</span>
                            <span><kbd>↵</kbd> Select</span>
                            <span><kbd>Esc</kbd> Close</span>
                        </div>
                    </motion.div>
                </>
            )}

            
        </AnimatePresence>
    );
}

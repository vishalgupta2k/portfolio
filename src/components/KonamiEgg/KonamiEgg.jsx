import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './KonamiEgg.styles.css';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function KonamiEgg() {
    const [triggered, setTriggered] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === KONAMI[indexRef.current]) {
                indexRef.current++;
                if (indexRef.current === KONAMI.length) {
                    setTriggered(true);
                    indexRef.current = 0;
                    setTimeout(() => setTriggered(false), 5000);
                }
            } else {
                indexRef.current = 0;
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <AnimatePresence>
            {triggered && (
                <>
                    <Confetti />
                    <motion.div
                        className="konami-toast"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 15 }}
                    >
                        <span className="konami-emoji">🎮</span>
                        <div>
                            <strong>Achievement Unlocked!</strong>
                            <p>You found the Konami Code! You're clearly a person of culture.</p>
                        </div>
                    </motion.div>
                </>
            )}
            
        </AnimatePresence>
    );
}

// Confetti particles
function Confetti() {
    const colors = ['#7c4dff', '#00d2ff', '#ff6b6b', '#ffd93d', '#6BCB77', '#FF6B6B'];
    const particles = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 2 + 2,
    }));

    return (
        <div className="confetti-container">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="confetti-piece"
                    style={{
                        left: `${p.x}%`,
                        width: p.size,
                        height: p.size,
                        background: p.color,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    }}
                    initial={{ y: -20, opacity: 1, rotate: 0 }}
                    animate={{ y: window.innerHeight + 50, opacity: 0, rotate: Math.random() * 720 }}
                    transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
                />
            ))}
            <style>{`
        .confetti-container {
          position: fixed; inset: 0; pointer-events: none; z-index: 9998; overflow: hidden;
        }
        .confetti-piece { position: absolute; top: 0; }
      `}</style>
        </div>
    );
}

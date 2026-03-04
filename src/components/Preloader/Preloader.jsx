import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.styles.css';

export default function Preloader({ onComplete }) {
    const [isVisible, setIsVisible] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsVisible(false);
                        setTimeout(() => onComplete?.(), 600);
                    }, 400);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 8) + 2;
            });
        }, 40);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="preloader"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                >
                    <div className="preloader-content">
                        <motion.div
                            className="preloader-logo"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            VG<span>.</span>
                        </motion.div>
                        <div className="preloader-bar-container">
                            <motion.div
                                className="preloader-bar"
                                style={{ width: `${Math.min(count, 100)}%` }}
                            />
                        </div>
                        <motion.p className="preloader-count">
                            {Math.min(count, 100)}%
                        </motion.p>
                    </div>

                    
                </motion.div>
            )}
        </AnimatePresence>
    );
}

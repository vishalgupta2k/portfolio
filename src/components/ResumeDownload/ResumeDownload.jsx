import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Check } from 'lucide-react';
import './ResumeDownload.styles.css';

export default function ResumeDownload() {
    const [isDownloaded, setIsDownloaded] = useState(false);

    const handleClick = () => {
        setIsDownloaded(true);
        // Trigger actual download — user should place their resume at /resume.pdf in public folder
        const link = document.createElement('a');
        link.href = '/Vishal%20Gupta.pdf';
        link.download = 'Vishal_Gupta_Resume.pdf';
        link.click();
        setTimeout(() => setIsDownloaded(false), 3000);
    };

    return (
        <>
            <motion.button
                className="resume-download-btn"
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isDownloaded ? (
                        <motion.span
                            key="done"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="btn-inner"
                        >
                            <Check size={18} /> Downloaded!
                        </motion.span>
                    ) : (
                        <motion.span
                            key="download"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="btn-inner"
                        >
                            <Download size={18} /> Download Resume
                        </motion.span>
                    )}
                </AnimatePresence>

                <motion.div
                    className="btn-shimmer"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
            </motion.button>

            
        </>
    );
}

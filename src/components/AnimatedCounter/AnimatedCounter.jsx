import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = 0;
        const end = parseInt(target, 10);
        const steps = 60;
        const increment = end / steps;
        let current = start;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            // Ease out
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(eased * end);
            setCount(current);
            if (step >= steps) {
                setCount(end);
                clearInterval(timer);
            }
        }, (duration * 1000) / steps);

        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
        >
            {prefix}{count}{suffix}
        </motion.span>
    );
}

import { useEffect, useRef } from 'react';
import './CustomCursor.styles.css';

export default function CustomCursor() {
    const cursorRef = useRef(null);
    const trailRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const trail = trailRef.current;
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        };

        const animate = () => {
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            trail.style.left = trailX + 'px';
            trail.style.top = trailY + 'px';
            requestAnimationFrame(animate);
        };

        const handleMouseEnterInteractive = () => {
            cursor.classList.add('cursor-hover');
            trail.classList.add('trail-hover');
        };

        const handleMouseLeaveInteractive = () => {
            cursor.classList.remove('cursor-hover');
            trail.classList.remove('trail-hover');
        };

        document.addEventListener('mousemove', handleMouseMove);
        animate();

        const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .glass, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnterInteractive);
            el.addEventListener('mouseleave', handleMouseLeaveInteractive);
        });

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnterInteractive);
                el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor" />
            <div ref={trailRef} className="cursor-trail" />
            
        </>
    );
}

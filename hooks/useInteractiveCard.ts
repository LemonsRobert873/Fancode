
import { useEffect, useRef } from 'react';

export const useInteractiveCard = <T extends HTMLElement,>() => {
    const cardRef = useRef<T>(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const glow = card.querySelector('.card-glow') as HTMLElement;
        const img = card.querySelector('img') as HTMLImageElement;

        if (!glow || !img) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = (y - rect.height / 2) / -15;
            const rotateY = (x - rect.width / 2) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

            glow.style.setProperty('--x', `${x}px`);
            glow.style.setProperty('--y', `${y}px`);

            // Parallax effect: move image in opposite direction of tilt, and scale it up
            const parallaxX = rotateY * -3; // Multiplier for effect intensity
            const parallaxY = rotateX * -3;
            img.style.transform = `scale(1.1) translateX(${parallaxX}px) translateY(${parallaxY}px)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            img.style.transform = 'scale(1) translateX(0px) translateY(0px)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []); 

    return cardRef;
};
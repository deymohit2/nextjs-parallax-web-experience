'use client';

import { useEffect, useState, useCallback } from 'react';
import { getFrameIndex, getScrollProgress } from '@/lib/image-utils';

export function useParallax(frameCount: number) {
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [heroOpacity, setHeroOpacity] = useState(1);

    const updateParallax = useCallback(() => {
        const windowHeight = window.innerHeight;
        const heroScrollRange = windowHeight * 4; // Updated to 400vh to match hero section
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Calculate scroll progress and frame index
        const scrollProgress = getScrollProgress(heroScrollRange);
        const frameIndex = getFrameIndex(scrollProgress, frameCount);
        setCurrentFrameIndex(frameIndex);

        // Fade out hero overlay when scrolling past the hero section
        // Start fade at 95% of the scroll range for smoother transition
        const fadeStartPoint = windowHeight * 3.7; // Start fading near the end
        if (scrollTop > fadeStartPoint) {
            const fadeProgress = Math.min((scrollTop - fadeStartPoint) / (windowHeight * 0.3), 1);
            setHeroOpacity(1 - fadeProgress);
        } else {
            setHeroOpacity(1);
        }
    }, [frameCount]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateParallax]);

    return { currentFrameIndex, heroOpacity };
}

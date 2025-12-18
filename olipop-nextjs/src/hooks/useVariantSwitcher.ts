'use client';

import { useState, useCallback, useEffect } from 'react';
import { Variant } from '@/types/variant';

export function useVariantSwitcher(variants: Variant[], initialIndex = 0) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const switchVariant = useCallback(async (newIndex: number) => {
        if (newIndex === currentIndex || isTransitioning) return;

        setIsTransitioning(true);

        // Wait for fade out animation
        await new Promise(resolve => setTimeout(resolve, 300));

        setCurrentIndex(newIndex);

        // Wait for new content to be ready
        await new Promise(resolve => setTimeout(resolve, 100));

        setIsTransitioning(false);
    }, [currentIndex, isTransitioning]);

    const nextVariant = useCallback(() => {
        const newIndex = (currentIndex + 1) % variants.length;
        switchVariant(newIndex);
    }, [currentIndex, variants.length, switchVariant]);

    const previousVariant = useCallback(() => {
        const newIndex = (currentIndex - 1 + variants.length) % variants.length;
        switchVariant(newIndex);
    }, [currentIndex, variants.length, switchVariant]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                previousVariant();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                nextVariant();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextVariant, previousVariant]);

    return {
        currentVariant: variants[currentIndex],
        currentIndex,
        nextVariant,
        previousVariant,
        isTransitioning,
    };
}

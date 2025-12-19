'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Variant } from '@/types/variant';
import { useParallax } from '@/hooks/useParallax';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { useVariantSwitcher } from '@/hooks/useVariantSwitcher';
import { useVariantContext } from '@/contexts/VariantContext';
import { LoadingScreen } from './LoadingScreen';
import { HeroContent } from './HeroContent';
import { VariantSwitcher } from './VariantSwitcher';

interface ParallaxHeroProps {
    variants: Variant[];
}

export function ParallaxHero({ variants }: ParallaxHeroProps) {
    const { setCurrentIndex } = useVariantContext();

    const {
        currentVariant,
        currentIndex,
        nextVariant,
        previousVariant,
        isTransitioning,
    } = useVariantSwitcher(variants);

    // Sync with context
    useEffect(() => {
        setCurrentIndex(currentIndex);
    }, [currentIndex, setCurrentIndex]);

    const { frames, isLoading, progress } = useImagePreloader(currentVariant);
    const { currentFrameIndex, heroOpacity } = useParallax(frames.length);

    const [scrollEnabled, setScrollEnabled] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            setScrollEnabled(true);
        }
    }, [isLoading]);

    return (
        <>
            <LoadingScreen isLoading={isLoading} progress={progress} />

            {/* Hero Section with Extended Height for Full Parallax Animation */}
            <section className="relative w-full h-[400vh]">
                {/* Fixed Parallax Container - Now with lower z-index to go behind content */}
                <div
                    className="fixed top-0 left-0 w-full h-screen z-0 overflow-hidden"
                    style={{ opacity: heroOpacity }}
                >
                    {/* Parallax Image */}
                    {scrollEnabled && frames.length > 0 && frames[currentFrameIndex] && (
                        <div className="relative w-full h-full scale-[1.25] lg:scale-100">
                            <Image
                                src={frames[currentFrameIndex].src}
                                alt={`${currentVariant.name} Soda`}
                                fill
                                className="object-cover object-center"
                                priority
                                unoptimized
                            />
                        </div>
                    )}
                </div>

                {/* Hero Overlay with Content */}
                <div
                    className="fixed top-0 left-0 w-full h-screen z-[1] flex items-center justify-between px-6 md:px-12 lg:px-24"
                    style={{
                        background:
                            'linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.5) 100%)',
                        opacity: heroOpacity,
                    }}
                >
                    {/* Left Content */}
                    <HeroContent variant={currentVariant} isTransitioning={isTransitioning} />

                    {/* Right Variant Navigation */}
                    <VariantSwitcher
                        currentIndex={currentIndex}
                        onNext={nextVariant}
                        onPrevious={previousVariant}
                    />
                </div>
            </section>
        </>
    );
}

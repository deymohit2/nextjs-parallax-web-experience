'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Variant } from '@/types/variant';
import { Twitter, Instagram, Facebook } from 'lucide-react';

interface HeroContentProps {
    variant: Variant;
    isTransitioning: boolean;
}

export function HeroContent({ variant, isTransitioning }: HeroContentProps) {
    return (
        <>
            <div className="max-w-[550px] relative px-16 lg:px-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={variant.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isTransitioning ? 0 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="text-sm font-semibold tracking-[0.3em] text-gray-400 mb-2">
                            OLIPOP
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-wide text-white uppercase mb-2">
                            {variant.name}
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] text-gray-400 uppercase mb-8">
                            {variant.subtitle}
                        </p>
                        <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-gray-400 mb-12 sm:mb-16 max-w-[500px]">
                            {variant.description}
                        </p>
                        <div className="flex gap-3 sm:gap-4 flex-wrap">
                            <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base font-bold tracking-wider uppercase border-2 border-white rounded-full bg-transparent text-white hover:bg-white hover:text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] whitespace-nowrap">
                                ADD TO
                            </button>
                            <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base font-bold tracking-wider uppercase border-2 border-white rounded-full bg-white text-black hover:bg-transparent hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)] whitespace-nowrap">
                                CART
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Social Icons - Outside content container, fixed at bottom */}
            <div className="fixed bottom-16 left-1/2 -translate-x-1/2 flex gap-8 z-30">
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-200 hover:-translate-y-1"
                    aria-label="Twitter"
                >
                    <Twitter size={20} className="text-gray-400 hover:text-white" />
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-200 hover:-translate-y-1"
                    aria-label="Instagram"
                >
                    <Instagram size={20} className="text-gray-400 hover:text-white" />
                </a>
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-all duration-200 hover:-translate-y-1"
                    aria-label="Facebook"
                >
                    <Facebook size={20} className="text-gray-400 hover:text-white" />
                </a>
            </div>
        </>
    );
}

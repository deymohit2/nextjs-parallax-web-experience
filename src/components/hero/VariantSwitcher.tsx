'use client';

import { motion } from 'framer-motion';

interface VariantSwitcherProps {
    currentIndex: number;
    onNext: () => void;
    onPrevious: () => void;
}

export function VariantSwitcher({ currentIndex, onNext, onPrevious }: VariantSwitcherProps) {
    return (
        <div className="hidden lg:flex items-center gap-8">
            <div className="text-[10rem] font-black leading-none text-white/10 tracking-tight">
                {String(currentIndex + 1).padStart(2, '0')}
            </div>
            <div className="flex flex-col items-center gap-4">
                <button
                    onClick={onPrevious}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Previous variant"
                >
                    <span className="text-2xl leading-none">↑</span>
                    <span className="text-sm font-semibold tracking-[0.15em]">PREV</span>
                </button>
                <div className="w-px h-10 bg-white/20" />
                <button
                    onClick={onNext}
                    className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Next variant"
                >
                    <span className="text-sm font-semibold tracking-[0.15em]">NEXT</span>
                    <span className="text-2xl leading-none">↓</span>
                </button>
            </div>
        </div>
    );
}

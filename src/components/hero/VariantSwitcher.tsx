'use client';

import { motion } from 'framer-motion';

interface VariantSwitcherProps {
    currentIndex: number;
    onNext: () => void;
    onPrevious: () => void;
}

export function VariantSwitcher({ currentIndex, onNext, onPrevious }: VariantSwitcherProps) {
    return (
        <>
            {/* Desktop Variant Switcher */}
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

            {/* Mobile Variant Switcher - Side Buttons */}
            <div className="lg:hidden fixed inset-0 pointer-events-none z-10">
                {/* Previous Button - Left Side */}
                <button
                    onClick={onPrevious}
                    className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 w-12 h-20 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-white transition-all duration-300 active:scale-95"
                    aria-label="Previous variant"
                >
                    <span className="text-2xl leading-none">←</span>
                    <span className="text-[10px] font-semibold tracking-wider">PREV</span>
                </button>

                {/* Product Indicator - Bottom Center */}
                <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <div className="text-2xl font-black leading-none text-white/20 tracking-tight">
                        {String(currentIndex + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-gray-600 tracking-wider">
                        OF 03
                    </div>
                </div>

                {/* Next Button - Right Side */}
                <button
                    onClick={onNext}
                    className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-1 w-12 h-20 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg text-white transition-all duration-300 active:scale-95"
                    aria-label="Next variant"
                >
                    <span className="text-2xl leading-none">→</span>
                    <span className="text-[10px] font-semibold tracking-wider">NEXT</span>
                </button>
            </div>
        </>
    );
}

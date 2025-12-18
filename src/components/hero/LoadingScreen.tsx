'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    isLoading: boolean;
    progress: number;
}

export function LoadingScreen({ isLoading, progress }: LoadingScreenProps) {
    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
                >
                    <div className="text-center w-[90%] max-w-[400px]">
                        <h1 className="text-5xl font-black tracking-[0.3em] mb-16 text-white">
                            OLIPOP
                        </h1>
                        <div className="w-full h-1 bg-white/10 rounded-sm overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-gradient-to-r from-white to-gray-300"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <p className="text-xl font-semibold text-gray-400">{progress}%</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

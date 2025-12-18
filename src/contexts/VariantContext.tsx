'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Variant } from '@/types/variant';
import { variants } from '@/lib/variants';

interface VariantContextType {
    currentVariant: Variant;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export function VariantProvider({ children }: { children: ReactNode }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <VariantContext.Provider
            value={{
                currentVariant: variants[currentIndex],
                currentIndex,
                setCurrentIndex,
            }}
        >
            {children}
        </VariantContext.Provider>
    );
}

export function useVariantContext() {
    const context = useContext(VariantContext);
    if (!context) {
        throw new Error('useVariantContext must be used within VariantProvider');
    }
    return context;
}

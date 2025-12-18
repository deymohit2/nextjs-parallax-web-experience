'use client';

import { useState, useEffect, useCallback } from 'react';
import { Variant } from '@/types/variant';
import { getFrameUrl, preloadImage } from '@/lib/image-utils';

interface UseImagePreloaderResult {
    frames: HTMLImageElement[];
    isLoading: boolean;
    progress: number;
}

export function useImagePreloader(variant: Variant): UseImagePreloaderResult {
    const [frames, setFrames] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const preloadSequence = useCallback(async () => {
        setIsLoading(true);
        setProgress(0);

        const frameUrls: string[] = [];
        for (let i = 1; i <= variant.frameCount; i++) {
            frameUrls.push(getFrameUrl(variant.frameBaseUrl, i));
        }

        const loadedFrames: HTMLImageElement[] = [];
        let loadedCount = 0;

        const promises = frameUrls.map(async (url) => {
            try {
                const img = await preloadImage(url);
                loadedCount++;
                setProgress(Math.round((loadedCount / frameUrls.length) * 100));
                return img;
            } catch (error) {
                console.error(`Failed to load frame: ${url}`, error);
                return null;
            }
        });

        const results = await Promise.all(promises);
        const validFrames = results.filter((img): img is HTMLImageElement => img !== null);

        setFrames(validFrames);
        setIsLoading(false);
    }, [variant]);

    useEffect(() => {
        preloadSequence();
    }, [preloadSequence]);

    return { frames, isLoading, progress };
}

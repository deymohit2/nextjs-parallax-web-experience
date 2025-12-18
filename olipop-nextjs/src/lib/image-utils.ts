/**
 * Generate frame URL with zero-padded number
 */
export function getFrameUrl(baseUrl: string, frameNumber: number): string {
    const paddedNumber = String(frameNumber).padStart(4, '0');
    return `${baseUrl}frame_${paddedNumber}.webp`;
}

/**
 * Preload a single image and return promise
 */
export function preloadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

/**
 * Calculate scroll progress from 0 to 1
 */
export function getScrollProgress(heroScrollRange: number): number {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return Math.min(scrollTop / heroScrollRange, 1);
}

/**
 * Map scroll progress to frame index
 */
export function getFrameIndex(scrollProgress: number, frameCount: number): number {
    const frameIndex = Math.floor(scrollProgress * (frameCount - 1));
    return Math.max(0, Math.min(frameIndex, frameCount - 1));
}

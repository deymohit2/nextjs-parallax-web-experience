// ===========================
// Variant Data Configuration
// ===========================
const variants = [
    {
        name: "CHERRY",
        subtitle: "SODA",
        description: "A modern take on a classic soda with a perfect blend of sweet and tart, full of nostalgic flavor.",
        themeColor: "#ffffff",
        frameBaseUrl: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda/",
        frameCount: 240
    },
    {
        name: "GRAPE",
        subtitle: "SODA",
        description: "A modern functional soda brand inspired by classic flavors but made with better ingredients.",
        themeColor: "#ffffff",
        frameBaseUrl: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda2/",
        frameCount: 240
    },
    {
        name: "LEMON",
        subtitle: "GINGER SODA",
        description: "Bright and refreshing citrus soda with natural lemon spark and crisp bubbles.",
        themeColor: "#ffffff",
        frameBaseUrl: "https://omqaodalyvzbrvckcumi.supabase.co/storage/v1/object/public/assets/soda3/",
        frameCount: 240
    }
];

// ===========================
// Global State
// ===========================
let currentVariantIndex = 0;
let currentFrameSequence = [];
let isLoading = true;
let scrollParallaxEnabled = false;

// DOM Elements
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderPercentage = document.getElementById('loader-percentage');
const parallaxImage = document.getElementById('parallax-image');
const drinkName = document.getElementById('drink-name');
const drinkSubtitle = document.getElementById('drink-subtitle');
const drinkDescription = document.getElementById('drink-description');
const variantNumber = document.getElementById('variant-number');
const prevVariantBtn = document.getElementById('prev-variant');
const nextVariantBtn = document.getElementById('next-variant');

// ===========================
// Utility Functions
// ===========================

// Generate frame URL with zero-padded number
function getFrameUrl(baseUrl, frameNumber) {
    const paddedNumber = String(frameNumber).padStart(4, '0');
    return `${baseUrl}frame_${paddedNumber}.webp`;
}

// Preload image and return promise
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// Update loading progress
function updateLoadingProgress(loaded, total) {
    const percentage = Math.round((loaded / total) * 100);
    loaderBar.style.width = `${percentage}%`;
    loaderPercentage.textContent = `${percentage}%`;
}

// ===========================
// Image Preloader System
// ===========================
async function preloadVariantSequence(variant, onProgress = null) {
    const frames = [];
    const frameUrls = [];

    // Generate all frame URLs
    for (let i = 1; i <= variant.frameCount; i++) {
        frameUrls.push(getFrameUrl(variant.frameBaseUrl, i));
    }

    // Preload images with progress tracking
    let loadedCount = 0;
    const promises = frameUrls.map(async (url) => {
        try {
            const img = await preloadImage(url);
            loadedCount++;
            if (onProgress) {
                onProgress(loadedCount, frameUrls.length);
            }
            return img;
        } catch (error) {
            console.error(`Failed to load frame: ${url}`, error);
            // Return a placeholder or the first frame if available
            return frames[0] || null;
        }
    });

    const loadedFrames = await Promise.all(promises);
    return loadedFrames.filter(frame => frame !== null);
}

// Initialize first variant on page load
async function initializeApp() {
    try {
        // Preload first variant
        currentFrameSequence = await preloadVariantSequence(
            variants[currentVariantIndex],
            updateLoadingProgress
        );

        // Set initial frame
        if (currentFrameSequence.length > 0) {
            parallaxImage.src = currentFrameSequence[0].src;
        }

        // Hide loader and show content
        setTimeout(() => {
            loader.classList.add('hidden');
            isLoading = false;
            scrollParallaxEnabled = true;

            // Update hero content
            updateHeroContent(variants[currentVariantIndex]);
        }, 500);

    } catch (error) {
        console.error('Failed to initialize app:', error);
        // Handle error gracefully
        loader.classList.add('hidden');
    }
}

// ===========================
// Scroll-Controlled Parallax
// ===========================
let ticking = false;

function updateParallaxFrame() {
    if (!scrollParallaxEnabled || currentFrameSequence.length === 0) return;

    // Calculate scroll progress (0 to 1)
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // Extended hero section is 3x viewport height (300vh)
    // This allows the full 240-frame animation to play before the next section appears
    const heroScrollRange = windowHeight * 3;
    const scrollProgress = Math.min(scrollTop / heroScrollRange, 1);

    // Map scroll to frame index
    const frameIndex = Math.floor(scrollProgress * (currentFrameSequence.length - 1));
    const clampedIndex = Math.max(0, Math.min(frameIndex, currentFrameSequence.length - 1));

    // Update image
    if (currentFrameSequence[clampedIndex]) {
        parallaxImage.src = currentFrameSequence[clampedIndex].src;
    }

    // Fade out hero overlay when scrolling past the hero section
    const heroOverlay = document.querySelector('.hero-overlay');
    const parallaxContainer = document.querySelector('.parallax-container');

    if (scrollTop > windowHeight * 2.8) {
        // Near the end of the hero section, start fading out
        const fadeProgress = Math.min((scrollTop - windowHeight * 2.8) / (windowHeight * 0.2), 1);
        heroOverlay.style.opacity = 1 - fadeProgress;
        parallaxContainer.style.opacity = 1 - fadeProgress;
    } else {
        heroOverlay.style.opacity = 1;
        parallaxContainer.style.opacity = 1;
    }
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallaxFrame();
            updateActiveNavLink();
            ticking = false;
        });
        ticking = true;
    }
}

// ===========================
// Variant Switching
// ===========================
async function switchVariant(newIndex) {
    if (newIndex === currentVariantIndex) return;

    // Fade out current content
    drinkName.classList.add('fade-out');
    drinkSubtitle.classList.add('fade-out');
    drinkDescription.classList.add('fade-out');

    // Disable scroll during transition
    scrollParallaxEnabled = false;

    // Wait for fade out
    await new Promise(resolve => setTimeout(resolve, 300));

    // Update variant index
    currentVariantIndex = newIndex;
    const newVariant = variants[currentVariantIndex];

    // Check if we need to load new sequence
    // For simplicity, we'll preload all sequences on demand
    // In production, you might want to lazy load
    currentFrameSequence = await preloadVariantSequence(newVariant, (loaded, total) => {
        // Optional: Show mini loading indicator
        console.log(`Loading variant ${newIndex + 1}: ${Math.round((loaded / total) * 100)}%`);
    });

    // Update content
    updateHeroContent(newVariant);

    // Reset to first frame
    if (currentFrameSequence.length > 0) {
        parallaxImage.src = currentFrameSequence[0].src;
    }

    // Fade in new content
    drinkName.classList.remove('fade-out');
    drinkSubtitle.classList.remove('fade-out');
    drinkDescription.classList.remove('fade-out');

    // Re-enable scroll
    scrollParallaxEnabled = true;
}

function updateHeroContent(variant) {
    drinkName.textContent = variant.name;
    drinkSubtitle.textContent = variant.subtitle;
    drinkDescription.textContent = variant.description;
    variantNumber.textContent = String(currentVariantIndex + 1).padStart(2, '0');

    // Update theme color
    document.documentElement.style.setProperty('--accent-color', variant.themeColor);
}

// ===========================
// Navigation & Smooth Scroll
// ===========================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to sections
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// FAQ Accordion
// ===========================
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===========================
// Event Listeners
// ===========================
window.addEventListener('scroll', onScroll, { passive: true });

prevVariantBtn.addEventListener('click', () => {
    const newIndex = (currentVariantIndex - 1 + variants.length) % variants.length;
    switchVariant(newIndex);
});

nextVariantBtn.addEventListener('click', () => {
    const newIndex = (currentVariantIndex + 1) % variants.length;
    switchVariant(newIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevVariantBtn.click();
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextVariantBtn.click();
    }
});

// ===========================
// Initialize Application
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

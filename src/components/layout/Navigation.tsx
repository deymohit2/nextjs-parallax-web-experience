'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const navLinks = [
    { href: '#product', label: 'Product' },
    { href: '#ingredients', label: 'Ingredients' },
    { href: '#nutrition', label: 'Nutrition' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
];

export function Navigation() {
    const [activeSection, setActiveSection] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            sections.forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 200) {
                    current = section.getAttribute('id') || '';
                }
            });

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md z-[1000] py-4 border-b border-white/5">
            <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
                <div className="text-2xl font-black tracking-[0.2em] text-white">OLIPOP</div>
                
                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-16">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`relative text-sm font-medium tracking-wider uppercase transition-colors ${activeSection === link.href.slice(1)
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {activeSection === link.href.slice(1) && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-white"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center group"
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] md:hidden"
                />
            )}

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: isMenuOpen ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a]/98 backdrop-blur-md border-l border-white/10 z-[1001] md:hidden"
            >
                <div className="flex flex-col h-full pt-24 px-8">
                    <ul className="flex flex-col gap-8">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    className={`relative text-lg font-medium tracking-wider uppercase transition-colors block ${activeSection === link.href.slice(1)
                                            ? 'text-white'
                                            : 'text-gray-400'
                                        }`}
                                >
                                    {link.label}
                                    {activeSection === link.href.slice(1) && (
                                        <motion.div
                                            layoutId="activeSectionMobile"
                                            className="absolute -left-4 top-0 bottom-0 w-1 bg-white"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </nav>
    );
}

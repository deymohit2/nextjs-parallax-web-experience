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

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-md z-[1000] py-4 border-b border-white/5">
            <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
                <div className="text-2xl font-black tracking-[0.2em] text-white">OLIPOP</div>
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
            </div>
        </nav>
    );
}

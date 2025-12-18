import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const footerSections = [
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '#' },
            { label: 'Our Story', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Careers', href: '#' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Contact Us', href: '#' },
            { label: 'FAQs', href: '#' },
            { label: 'Store Locator', href: '#' },
            { label: 'Wholesale', href: '#' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Accessibility', href: '#' },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-black py-24 px-8 border-t border-white/5">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
                    <div className="lg:col-span-1">
                        <h3 className="text-2xl font-black tracking-[0.2em] mb-4 text-white">
                            OLIPOP
                        </h3>
                        <p className="text-base text-gray-400 leading-relaxed">
                            A modern functional soda brand inspired by classic flavors but made with
                            better ingredients.
                        </p>
                    </div>
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-base font-bold mb-4 text-white uppercase tracking-wider">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
                    <p className="text-sm text-gray-400">
                        © 2024 Olipop. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a
                            href="https://twitter.com"
                            aria-label="Twitter"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="https://instagram.com"
                            aria-label="Instagram"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="https://facebook.com"
                            aria-label="Facebook"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

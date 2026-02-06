'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { MessageSquare } from 'lucide-react';

const navLinks = [
    { label: "Challenge", href:"#challenge"},
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ's", href: "#faq" },
    { label: "Pricing", href: "#pricing" }
];

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                backgroundColor: scrolled
                    ? 'rgba(30, 58, 138, 0.95)'
                    : 'rgba(30, 58, 138, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
            }}
        >
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
                {/* Logo */}
                <Link href="#hero" className="flex items-center gap-2 group">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ backgroundColor: 'var(--golden-yellow)' }}
                    >
                        <MessageSquare className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                    </div>
                    <span className="text-xl font-bold" style={{ color: 'white' }}>
                        VoiceUp Athletics
                    </span>
                </Link>

                {/* Center Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleSmoothScroll(e, link.href)}
                            className="text-sm font-medium transition-all hover:scale-105"
                            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right Side - Auth Buttons */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="px-4 py-2 text-sm font-medium transition-all hover:opacity-80"
                        style={{ color: 'white' }}
                    >
                        Login
                    </Link>
                    <Link
                        href="/university/request-access"
                        className="px-6 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                        style={{
                            backgroundColor: 'var(--golden-yellow)',
                            color: 'var(--dark-blue)'
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>
        </div>
    );
}
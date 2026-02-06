'use client';

import { MessageSquare, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const footerLinks = {
    Product: [
        { label: "Features", href: "/product/features" },
        { label: "For Teams", href: "/product/for-teams" },
        { label: "For Universities", href: "/product/for-universities" },
        { label: "Pricing", href: "/product/pricing" }
    ],
    Resources: [
        { label: "Mental Health Resources", href: "/resources/mental-health" },
        { label: "Success Stories", href: "/resources/success-stories" },
        { label: "Research & Insights", href: "/resources/research-insights" },
        { label: "Help Center", href: "/resources/help-center" },
        { label: "Support", href: "/resources/support" }
    ],
    Company: [
        { label: "About Us", href: "/company/about" },
        { label: "Our Mission", href: "/company/mission" },
        { label: "Careers", href: "/company/careers" },
        { label: "Contact", href: "/company/contact" },
        { label: "Partners", href: "/company/partners" }
    ],
    Legal: [
        { label: "Privacy Policy", href: "/legal/privacy-policy" },
        { label: "Terms of Service", href: "/legal/terms-of-service" },
        { label: "HIPAA Compliance", href: "/legal/hipaa-compliance" },
        { label: "Security", href: "/legal/security" }
    ]
};

const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
];

export default function Footer() {
    return (
        <footer style={{ background: 'var(--dark-blue)' }}>
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-6 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: 'var(--golden-yellow)' }}
                            >
                                <MessageSquare className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                            </div>
                            <span className="text-xl font-bold" style={{ color: 'white' }}>
                                VoiceUp Athletics
                            </span>
                        </div>
                        <p className="leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Empowering student-athletes with anonymous mental health support.
                            Your voice matters, your well-being comes first.
                        </p>

                        {/* Newsletter */}
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                                    style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full rounded-lg pl-10 pr-4 py-3 text-white placeholder:opacity-50 focus:outline-none transition-all"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)'
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                className="font-semibold px-4 rounded-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--golden-yellow)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold mb-4" style={{ color: 'white' }}>
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            className="text-sm transition-colors hover:opacity-100"
                                            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        © {new Date().getFullYear()} VoiceUp Athletics. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        color: 'rgba(255, 255, 255, 0.7)'
                                    }}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
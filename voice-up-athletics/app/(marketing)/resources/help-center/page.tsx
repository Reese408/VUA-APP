'use client';

import { Search, HelpCircle, User, Lock, MessageSquare, CreditCard, Settings, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQCategory {
    icon: any;
    title: string;
    faqs: FAQItem[];
}

export default function HelpCenterPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

    const toggleFAQ = (categoryTitle: string, index: number) => {
        const key = `${categoryTitle}-${index}`;
        setExpandedIndex(expandedIndex === key ? null : key);
    };

    const faqCategories: FAQCategory[] = [
        {
            icon: User,
            title: 'Getting Started',
            faqs: [
                {
                    question: 'How do I access VoiceUp Athletics?',
                    answer: 'VoiceUp Athletics is provided through your university athletic department. You should receive an activation email with instructions to set up your account. If you haven\'t received one, contact your athletic department or university administrator.'
                },
                {
                    question: 'What do I need to create an account?',
                    answer: 'You need an activation token sent to your university email address. Once you have this, visit the activation link, set your password, and create your anonymous display name. You\'ll never need to use your real name on the platform.'
                },
                {
                    question: 'Is VoiceUp Athletics really free for student-athletes?',
                    answer: 'Yes! Your university has partnered with VoiceUp Athletics to provide mental health support at no cost to you. There are no fees, subscriptions, or hidden charges for student-athletes.'
                },
                {
                    question: 'Can I use VoiceUp if I\'m not having a crisis?',
                    answer: 'Absolutely! VoiceUp is for all mental health concerns, from everyday stress to serious challenges. You don\'t need to be in crisis to seek support. Many athletes use it for performance anxiety, time management stress, or just to talk things through.'
                }
            ]
        },
        {
            icon: Lock,
            title: 'Privacy & Anonymity',
            faqs: [
                {
                    question: 'How does anonymity work?',
                    answer: 'When you create your account, you choose an anonymous display name that appears to counselors. Your coaches, teammates, and university administrators cannot see who is using the service or what you discuss. Counselors only know you by your display name.'
                },
                {
                    question: 'Can my coach see my messages?',
                    answer: 'No. Your conversations are completely confidential and private. Coaches, athletic directors, and university administrators cannot access your messages or even know that you\'re using the platform.'
                },
                {
                    question: 'Is my data secure?',
                    answer: 'Yes. We use bank-level encryption (AES-256) to protect your data. We are HIPAA and FERPA compliant, meaning we follow strict healthcare privacy regulations. Our security measures are regularly audited and updated.'
                },
                {
                    question: 'Are there any exceptions to confidentiality?',
                    answer: 'Counselors are required by law to break confidentiality only in specific situations: if you\'re in immediate danger of harming yourself or others, if there\'s suspected abuse of a minor, or if required by a court order. Counselors will always try to discuss these situations with you first.'
                }
            ]
        },
        {
            icon: MessageSquare,
            title: 'Using the Platform',
            faqs: [
                {
                    question: 'How do I connect with a counselor?',
                    answer: 'After logging in, you can start a new conversation from your dashboard. You\'ll be matched with a licensed counselor who specializes in sports psychology and student-athlete mental health. Response times are typically within 24 hours, often much faster.'
                },
                {
                    question: 'Can I choose my counselor?',
                    answer: 'You\'ll be matched with an available counselor based on your needs and their expertise. If you feel the match isn\'t working, you can request a different counselor at any time through your account settings.'
                },
                {
                    question: 'How quickly will a counselor respond?',
                    answer: 'Most counselors respond within 24 hours, and many reply much faster. VoiceUp is not for emergencies - if you\'re in crisis, please call 988 (Suicide & Crisis Lifeline) or your local emergency services.'
                },
                {
                    question: 'Can I use VoiceUp on my phone?',
                    answer: 'Yes! VoiceUp works on any device with a web browser - smartphones, tablets, laptops, and desktops. Simply log in through your browser. We recommend using a private/incognito window for added privacy on shared devices.'
                }
            ]
        },
        {
            icon: HelpCircle,
            title: 'Common Concerns',
            faqs: [
                {
                    question: 'Will using VoiceUp affect my playing time?',
                    answer: 'No. Your coaches and athletic department staff cannot see that you\'re using VoiceUp. Seeking mental health support is completely private and will not impact your playing time, scholarship, or standing with the team.'
                },
                {
                    question: 'What if someone sees me using the platform?',
                    answer: 'VoiceUp looks like a regular messaging app. If you\'re concerned about privacy, you can use it on your personal device in a private location, or use your browser\'s private/incognito mode which doesn\'t save history.'
                },
                {
                    question: 'I\'m worried about stigma. Is it okay to seek help?',
                    answer: 'Absolutely. Mental health is just as important as physical health. Many professional athletes openly discuss working with sports psychologists. Seeking help is a sign of strength, not weakness. Remember, your use of VoiceUp is completely anonymous.'
                },
                {
                    question: 'Can I talk about issues that aren\'t related to athletics?',
                    answer: 'Yes! Our counselors are here to support all aspects of your mental health - academic stress, relationships, family issues, identity, grief, and anything else you\'re dealing with. You\'re a whole person, not just an athlete.'
                }
            ]
        },
        {
            icon: Settings,
            title: 'Account Management',
            faqs: [
                {
                    question: 'How do I change my display name?',
                    answer: 'You can update your anonymous display name in your account settings. This won\'t affect your conversation history, but the new name will appear in future messages.'
                },
                {
                    question: 'Can I delete my account?',
                    answer: 'Yes. You can request account deletion through your settings. Your conversation history will be permanently deleted and cannot be recovered. If you graduate or leave your university, your account access will end automatically.'
                },
                {
                    question: 'I forgot my password. What do I do?',
                    answer: 'Click "Forgot Password" on the login page. You\'ll receive a reset link at your university email address. Follow the link to create a new password. If you don\'t receive the email, check your spam folder or contact support.'
                },
                {
                    question: 'What happens to my account after I graduate?',
                    answer: 'Your account access typically ends when you\'re no longer enrolled as a student-athlete at your university. You\'ll receive notification before your access ends, and you\'ll have the option to export your conversation history if desired.'
                }
            ]
        },
        {
            icon: CreditCard,
            title: 'For Universities',
            faqs: [
                {
                    question: 'How do we implement VoiceUp at our university?',
                    answer: 'Start by requesting access through our website. Our team will schedule a consultation to understand your needs, provide a demo, and create a customized implementation plan. The process typically takes 2-4 weeks from approval to launch.'
                },
                {
                    question: 'What are the pricing plans?',
                    answer: 'We offer three plans: Per-Team ($199/month for up to 50 athletes), University-Wide ($899/month for unlimited athletes), and Enterprise (custom pricing for conferences or multi-institution programs). All plans include counselor access, admin dashboard, and support.'
                },
                {
                    question: 'How do we onboard our student-athletes?',
                    answer: 'We provide activation tokens for each student-athlete that your athletic department administrator can distribute. We also offer onboarding materials, including announcement templates, FAQ documents, and optional information sessions.'
                },
                {
                    question: 'Can we integrate VoiceUp with our existing systems?',
                    answer: 'Yes. Our Enterprise plan includes API access and custom integrations with your student information systems, single sign-on (SSO), and other university platforms. Contact our partnerships team for details.'
                }
            ]
        }
    ];

    const quickLinks = [
        { title: 'Crisis Resources', description: 'Immediate help for emergencies', link: '/resources/mental-health' },
        { title: 'Mental Health Resources', description: 'Education and self-help tools', link: '/resources/mental-health' },
        { title: 'Contact Support', description: 'Get help from our team', link: '/resources/support' },
        { title: 'Privacy Policy', description: 'How we protect your data', link: '/legal/privacy-policy' }
    ];

    const filteredCategories = searchQuery
        ? faqCategories.map(category => ({
            ...category,
            faqs: category.faqs.filter(
                faq =>
                    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(category => category.faqs.length > 0)
        : faqCategories;

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Help Center
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Find answers to common questions about VoiceUp Athletics
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5"
                                style={{ color: 'var(--dark-gray)' }}
                            />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for answers..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg focus:outline-none"
                                style={{
                                    borderColor: '#e5e7eb',
                                    color: 'var(--dark-blue)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--dark-blue)' }}>
                        Popular Resources
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {quickLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.link}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all"
                            >
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    {link.title}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                    {link.description}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {searchQuery && filteredCategories.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                                No results found for "{searchQuery}". Try different keywords or browse categories below.
                            </p>
                        </div>
                    )}

                    {filteredCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <category.icon className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h2 className="text-3xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                    {category.title}
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {category.faqs.map((faq, index) => {
                                    const key = `${category.title}-${index}`;
                                    const isExpanded = expandedIndex === key;

                                    return (
                                        <div
                                            key={index}
                                            className="bg-white rounded-xl shadow-sm overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleFAQ(category.title, index)}
                                                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="text-lg font-semibold pr-4" style={{ color: 'var(--dark-blue)' }}>
                                                    {faq.question}
                                                </span>
                                                {isExpanded ? (
                                                    <ChevronUp className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                                )}
                                            </button>
                                            {isExpanded && (
                                                <div className="px-6 pb-6">
                                                    <p className="text-base leading-relaxed" style={{ color: 'var(--dark-gray)' }}>
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Still Need Help CTA */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <BookOpen className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Still Need Help?
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Can't find what you're looking for? Our support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/resources/support"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Contact Support
                            </a>
                            <a
                                href="/resources/mental-health"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                                style={{
                                    borderColor: 'var(--dark-blue)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                Mental Health Resources
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

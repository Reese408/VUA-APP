'use client';

import { Shield, MessageCircle, Users, BarChart3, Lock, Clock, Brain, Heart, CheckCircle, Zap, FileText, Award } from 'lucide-react';

export default function FeaturesPage() {
    const coreFeatures = [
        {
            icon: MessageCircle,
            title: 'Anonymous Messaging',
            description: 'Connect with licensed counselors anonymously. Your real identity is never revealed to counselors, coaches, or administrators.',
            benefits: [
                'Choose your own display name',
                'End-to-end encrypted conversations',
                'No identifying information shared',
                'Complete privacy protection'
            ]
        },
        {
            icon: Brain,
            title: 'Licensed Counselors',
            description: 'All counselors are licensed mental health professionals with expertise in sports psychology and student-athlete wellness.',
            benefits: [
                'Sports psychology specialists',
                'Understanding of athletic culture',
                'Evidence-based therapeutic approaches',
                'Ongoing professional development'
            ]
        },
        {
            icon: Clock,
            title: '24/7 Platform Access',
            description: 'Message your counselor anytime, from anywhere. Get support on your schedule, not business hours.',
            benefits: [
                'Access on any device',
                'Send messages anytime',
                'Responses within 24 hours',
                'No appointment scheduling needed'
            ]
        },
        {
            icon: Shield,
            title: 'HIPAA & FERPA Compliant',
            description: 'Your data is protected by the same standards as hospitals and universities. We take security and privacy seriously.',
            benefits: [
                'Bank-level encryption (AES-256)',
                'Regular security audits',
                'HIPAA compliance certification',
                'FERPA student privacy protection'
            ]
        },
        {
            icon: Lock,
            title: 'Complete Confidentiality',
            description: 'Your conversations are private. Coaches, teammates, and administrators cannot see your messages or know you\'re using the service.',
            benefits: [
                'Coach-proof anonymity',
                'Protected from teammates',
                'No university access to messages',
                'Strict confidentiality policies'
            ]
        },
        {
            icon: Heart,
            title: 'Holistic Support',
            description: 'Get help with any mental health concern - performance anxiety, stress, depression, relationships, identity, and more.',
            benefits: [
                'Performance & competition anxiety',
                'Academic stress management',
                'Relationship & family issues',
                'Identity & self-esteem support'
            ]
        }
    ];

    const athleteFeatures = [
        {
            icon: Zap,
            title: 'Instant Access',
            description: 'No waiting rooms or appointments. Start a conversation when you need support.'
        },
        {
            icon: FileText,
            title: 'Resource Library',
            description: 'Access mental health education, self-care guides, and wellness tools.'
        },
        {
            icon: Users,
            title: 'Peer Privacy',
            description: 'Your use of VoiceUp is completely invisible to teammates and coaches.'
        },
        {
            icon: Award,
            title: 'Performance Focus',
            description: 'Counselors understand how mental health impacts athletic performance.'
        }
    ];

    const adminFeatures = [
        {
            icon: BarChart3,
            title: 'Usage Analytics',
            description: 'Track engagement metrics without compromising student privacy',
            details: [
                'Aggregate usage statistics',
                'Trend analysis over time',
                'No individual identification',
                'Export reports for leadership'
            ]
        },
        {
            icon: Users,
            title: 'User Management',
            description: 'Easily provision and manage student-athlete accounts',
            details: [
                'Bulk activation token generation',
                'Team-based organization',
                'Simple onboarding process',
                'Automated email distribution'
            ]
        },
        {
            icon: Shield,
            title: 'Compliance Tools',
            description: 'Built-in compliance with NCAA and institutional requirements',
            details: [
                'HIPAA compliance documentation',
                'FERPA privacy protection',
                'Audit trail for accountability',
                'Regulatory reporting support'
            ]
        },
        {
            icon: FileText,
            title: 'Custom Resources',
            description: 'Upload university-specific mental health resources',
            details: [
                'Add campus counseling info',
                'Link to local resources',
                'Custom crisis protocols',
                'University branding options'
            ]
        }
    ];

    const securityFeatures = [
        'AES-256 encryption for data at rest',
        'TLS 1.3 for data in transit',
        'Multi-factor authentication (MFA)',
        'Regular penetration testing',
        'SOC 2 Type II compliance',
        'GDPR compliant data handling',
        'Automatic session timeouts',
        'Role-based access control (RBAC)'
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Platform Features
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
                        Everything you need to support student-athlete mental health. Built with privacy,
                        security, and accessibility at the core.
                    </p>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        Core Features
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {coreFeatures.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <feature.icon className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {feature.title}
                                </h3>
                                <p className="mb-4" style={{ color: 'var(--dark-gray)' }}>
                                    {feature.description}
                                </p>
                                <ul className="space-y-2">
                                    {feature.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                            <span style={{ color: 'var(--dark-gray)' }}>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* For Student-Athletes */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            For Student-Athletes
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Built for your unique needs and lifestyle
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {athleteFeatures.map((feature, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                                >
                                    <feature.icon className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    {feature.title}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* For Administrators */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            For Athletic Administrators
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Powerful tools to manage and monitor mental health support
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {adminFeatures.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div className="flex items-start gap-4 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: 'var(--golden-yellow)' }}
                                    >
                                        <feature.icon className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                            {feature.title}
                                        </h3>
                                        <p className="mb-4" style={{ color: 'var(--dark-gray)' }}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                                <ul className="space-y-2 ml-16">
                                    {feature.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--golden-yellow)' }}></span>
                                            <span style={{ color: 'var(--dark-gray)' }}>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security & Compliance */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <div className="text-center mb-10">
                            <Shield className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                            <h2 className="text-4xl font-bold mb-4" style={{ color: 'white' }}>
                                Security & Compliance
                            </h2>
                            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                Enterprise-grade security protecting your most sensitive data
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                            {securityFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white bg-opacity-10 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3"
                                >
                                    <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                    <span className="text-sm font-medium" style={{ color: 'white' }}>
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <Heart className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Experience the VoiceUp Athletics difference. Support student-athlete mental health
                            with a platform built for privacy, security, and accessibility.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/university/request-access"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Request University Access
                            </a>
                            <a
                                href="/product/pricing"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                                style={{
                                    borderColor: 'var(--dark-blue)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                View Pricing
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

'use client';

import { Mail, Phone, MessageCircle, Book, Clock, Users, AlertCircle, CheckCircle, Headphones } from 'lucide-react';

export default function SupportPage() {
    const supportChannels = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Get help via email for non-urgent questions',
            contact: 'support@voiceup-athletics.com',
            responseTime: 'Within 24 hours',
            availability: 'Monday - Friday, 9 AM - 6 PM PST',
            link: 'mailto:support@voiceup-athletics.com'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak directly with our support team',
            contact: '+1 (555) 123-4567',
            responseTime: 'Immediate during business hours',
            availability: 'Monday - Friday, 9 AM - 6 PM PST',
            link: 'tel:+15551234567'
        },
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Real-time chat with support specialists',
            contact: 'Available in your dashboard',
            responseTime: 'Typically under 5 minutes',
            availability: 'Monday - Friday, 9 AM - 6 PM PST',
            link: '/login'
        }
    ];

    const supportTypes = [
        {
            icon: Users,
            title: 'For Student-Athletes',
            description: 'Help with account access, technical issues, or questions about using the platform',
            topics: [
                'Account activation and login problems',
                'Technical issues with messaging',
                'Privacy and confidentiality questions',
                'Changing your display name or settings',
                'General platform usage questions'
            ]
        },
        {
            icon: Headphones,
            title: 'For University Staff',
            description: 'Administrative support for university administrators and athletic staff',
            topics: [
                'User provisioning and management',
                'Dashboard and reporting questions',
                'Integration and technical setup',
                'Billing and subscription management',
                'Training and onboarding assistance'
            ]
        },
        {
            icon: Book,
            title: 'For Counselors',
            description: 'Professional support for licensed mental health counselors',
            topics: [
                'Platform training and best practices',
                'Clinical documentation questions',
                'Technical support for counselor dashboard',
                'Scheduling and availability management',
                'Professional development resources'
            ]
        }
    ];

    const quickSolutions = [
        {
            issue: 'I can\'t log in to my account',
            solution: 'Try resetting your password using the "Forgot Password" link. If you\'re a new user, make sure you\'ve activated your account using the email link sent by your university. If problems persist, contact support.'
        },
        {
            issue: 'I didn\'t receive my activation email',
            solution: 'Check your spam/junk folder first. If you still can\'t find it, contact your university athletic department to confirm they have your correct email address. They can resend the activation link.'
        },
        {
            issue: 'My messages aren\'t sending',
            solution: 'Check your internet connection and try refreshing the page. If the problem continues, try logging out and back in. Clear your browser cache if issues persist, or try a different browser.'
        },
        {
            issue: 'I\'m concerned about privacy',
            solution: 'All conversations are encrypted and anonymous. Your coaches and athletic staff cannot see your messages or know that you\'re using the service. Only licensed counselors can view your conversations. Read our Privacy Policy for full details.'
        },
        {
            issue: 'How do I change my counselor?',
            solution: 'You can request a different counselor through your account settings at any time. Click on "Settings" in your dashboard, then select "Request Counselor Change." You\'ll be matched with a new counselor within 24 hours.'
        },
        {
            issue: 'I need help right now (crisis)',
            solution: 'VoiceUp is not for emergencies. If you\'re in crisis, please call 988 (Suicide & Crisis Lifeline), text HOME to 741741 (Crisis Text Line), or call 911. For non-emergency mental health support, use the VoiceUp platform to message a counselor.'
        }
    ];

    const universitySupport = [
        {
            title: 'Implementation Support',
            description: 'Dedicated onboarding specialist to help launch VoiceUp at your university'
        },
        {
            title: 'Training Sessions',
            description: 'Staff training on platform administration and best practices'
        },
        {
            title: 'Marketing Materials',
            description: 'Customizable templates to promote VoiceUp to your athletes'
        },
        {
            title: 'Technical Integration',
            description: 'API access and SSO integration for Enterprise customers'
        },
        {
            title: 'Usage Analytics',
            description: 'Aggregate, anonymized reports on platform engagement and impact'
        },
        {
            title: 'Priority Support',
            description: 'Dedicated account manager for Enterprise plan customers'
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Support Center
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
                        We're here to help. Get support for technical issues, account questions,
                        or learn more about using VoiceUp Athletics.
                    </p>
                </div>
            </section>

            {/* Crisis Alert */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-6 rounded-xl flex items-start gap-4"
                        style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            border: '2px solid rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        <AlertCircle className="h-8 w-8 flex-shrink-0 mt-1" style={{ color: '#ef4444' }} />
                        <div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                In a Mental Health Crisis?
                            </h3>
                            <p className="mb-3" style={{ color: 'var(--dark-gray)' }}>
                                VoiceUp Athletics is not for emergencies. If you're experiencing a mental health crisis, please contact:
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="tel:988"
                                    className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                                    style={{
                                        backgroundColor: '#ef4444',
                                        color: 'white'
                                    }}
                                >
                                    Call 988 - Suicide & Crisis Lifeline
                                </a>
                                <a
                                    href="sms:741741"
                                    className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 border-2"
                                    style={{
                                        borderColor: '#ef4444',
                                        color: '#ef4444'
                                    }}
                                >
                                    Text HOME to 741741
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Support Channels */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        Contact Support
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {supportChannels.map((channel, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <channel.icon className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {channel.title}
                                </h3>
                                <p className="mb-4" style={{ color: 'var(--dark-gray)' }}>
                                    {channel.description}
                                </p>
                                <div className="mb-4">
                                    <a
                                        href={channel.link}
                                        className="text-lg font-semibold hover:underline"
                                        style={{ color: 'var(--golden-yellow)' }}
                                    >
                                        {channel.contact}
                                    </a>
                                </div>
                                <div className="space-y-2 text-sm" style={{ color: 'var(--dark-gray)' }}>
                                    <div className="flex items-start gap-2">
                                        <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                        <span>{channel.availability}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                        <span>Response: {channel.responseTime}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support by User Type */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Support by User Type
                    </h2>
                    <p className="text-xl text-center mb-12" style={{ color: 'var(--dark-gray)' }}>
                        Get specialized support based on your role
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {supportTypes.map((type, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <type.icon className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {type.title}
                                </h3>
                                <p className="mb-4" style={{ color: 'var(--dark-gray)' }}>
                                    {type.description}
                                </p>
                                <ul className="space-y-2">
                                    {type.topics.map((topic, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--dark-gray)' }}>
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--golden-yellow)' }}></span>
                                            <span>{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Solutions */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Quick Solutions
                    </h2>
                    <p className="text-xl text-center mb-12" style={{ color: 'var(--dark-gray)' }}>
                        Common issues and how to solve them
                    </p>

                    <div className="space-y-6">
                        {quickSolutions.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    {item.issue}
                                </h3>
                                <p style={{ color: 'var(--dark-gray)' }}>
                                    {item.solution}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* University Support */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'white' }}>
                            University Partnership Support
                        </h2>
                        <p className="text-xl text-center mb-12" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Dedicated support for our university partners
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            {universitySupport.map((item, index) => (
                                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--golden-yellow)' }}>
                                        {item.title}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <a
                                href="/university/request-access"
                                className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--golden-yellow)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                Request University Access
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Resources */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <Book className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            More Resources
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Explore our comprehensive knowledge base and resources
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/resources/help-center"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Visit Help Center
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

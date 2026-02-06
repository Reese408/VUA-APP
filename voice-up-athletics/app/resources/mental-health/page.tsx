'use client';

import { Phone, MessageCircle, Book, Video, Heart, AlertCircle, Brain, Shield } from 'lucide-react';

export default function MentalHealthResourcesPage() {
    const crisisResources = [
        {
            name: 'National Suicide Prevention Lifeline',
            phone: '988',
            description: '24/7 free and confidential support for people in distress',
            availability: 'Available 24/7'
        },
        {
            name: 'Crisis Text Line',
            phone: 'Text HOME to 741741',
            description: 'Free, 24/7 support for those in crisis',
            availability: 'Available 24/7'
        },
        {
            name: 'SAMHSA National Helpline',
            phone: '1-800-662-4357',
            description: 'Treatment referral and information service',
            availability: 'Available 24/7'
        },
        {
            name: 'Trevor Project (LGBTQ+ Youth)',
            phone: '1-866-488-7386',
            description: 'Crisis support for LGBTQ+ young people',
            availability: 'Available 24/7'
        }
    ];

    const resourceCategories = [
        {
            icon: Brain,
            title: 'Mental Health Education',
            resources: [
                'Understanding anxiety and depression in athletes',
                'Recognizing signs of burnout',
                'Managing performance anxiety',
                'Building mental resilience',
                'Sleep and mental health connection'
            ]
        },
        {
            icon: Heart,
            title: 'Self-Care Strategies',
            resources: [
                'Mindfulness and meditation techniques',
                'Breathing exercises for stress relief',
                'Progressive muscle relaxation',
                'Journaling for emotional processing',
                'Creating healthy boundaries'
            ]
        },
        {
            icon: Shield,
            title: 'Crisis Prevention',
            resources: [
                'Warning signs to watch for',
                'Creating a safety plan',
                'How to support a teammate in crisis',
                'When and how to seek emergency help',
                'Building a support network'
            ]
        },
        {
            icon: Book,
            title: 'Recommended Reading',
            resources: [
                'The Champion\'s Mind by Jim Afremow',
                'Mind Gym by Gary Mack',
                'The Inner Game of Tennis by Timothy Gallwey',
                'Mindset by Carol Dweck',
                'The Anxiety and Phobia Workbook'
            ]
        }
    ];

    const articles = [
        {
            title: 'Understanding Performance Anxiety in Collegiate Athletes',
            category: 'Mental Health',
            readTime: '8 min read',
            description: 'Learn about the causes of performance anxiety and evidence-based strategies to manage it.'
        },
        {
            title: 'The Importance of Sleep for Athletic Performance and Mental Health',
            category: 'Wellness',
            readTime: '6 min read',
            description: 'Discover how sleep impacts both your athletic performance and mental well-being.'
        },
        {
            title: 'Building Resilience: Bouncing Back from Injury',
            category: 'Recovery',
            readTime: '10 min read',
            description: 'Strategies for maintaining mental health during injury recovery and rehabilitation.'
        },
        {
            title: 'Breaking the Stigma: Why Athletes Need Mental Health Support',
            category: 'Advocacy',
            readTime: '7 min read',
            description: 'Exploring why mental health support is essential for student-athlete success.'
        },
        {
            title: 'Mindfulness Techniques for Pre-Competition Nerves',
            category: 'Performance',
            readTime: '5 min read',
            description: 'Practical mindfulness exercises to calm nerves before competition.'
        },
        {
            title: 'Balancing Athletics and Academics: Managing Stress',
            category: 'Time Management',
            readTime: '9 min read',
            description: 'Tips for managing the dual demands of collegiate athletics and academics.'
        }
    ];

    const videos = [
        'Introduction to Sports Psychology for Athletes',
        'Guided Meditation for Athletes (15 minutes)',
        'Breathing Techniques for Performance Anxiety',
        'Building Mental Toughness: Expert Panel Discussion',
        'Student-Athlete Testimonials: Mental Health Journeys'
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Mental Health Resources
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
                        Comprehensive resources to support your mental health journey. You're not alone,
                        and help is always available.
                    </p>
                </div>
            </section>

            {/* Crisis Resources Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-8 rounded-2xl mb-12"
                        style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            border: '2px solid rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <AlertCircle className="h-8 w-8 flex-shrink-0" style={{ color: '#ef4444' }} />
                            <div>
                                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    In Crisis? Get Immediate Help
                                </h2>
                                <p className="text-lg" style={{ color: 'var(--dark-gray)' }}>
                                    If you're experiencing a mental health emergency, please reach out to one of these resources immediately.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {crisisResources.map((resource, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                        {resource.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Phone className="h-5 w-5" style={{ color: 'var(--golden-yellow)' }} />
                                        <span className="text-2xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                            {resource.phone}
                                        </span>
                                    </div>
                                    <p className="text-sm mb-2" style={{ color: 'var(--dark-gray)' }}>
                                        {resource.description}
                                    </p>
                                    <p className="text-sm font-semibold" style={{ color: 'var(--golden-yellow)' }}>
                                        {resource.availability}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Resource Categories */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        Resource Library
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {resourceCategories.map((category, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <category.icon className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                    {category.title}
                                </h3>
                                <ul className="space-y-3">
                                    {category.resources.map((resource, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--golden-yellow)' }}></span>
                                            <span style={{ color: 'var(--dark-gray)' }}>{resource}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Articles Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Featured Articles
                    </h2>
                    <p className="text-xl text-center mb-12" style={{ color: 'var(--dark-gray)' }}>
                        Expert insights on mental health for student-athletes
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {articles.map((article, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{
                                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                                            color: 'var(--dark-blue)'
                                        }}
                                    >
                                        {article.category}
                                    </span>
                                    <span className="text-xs" style={{ color: 'var(--dark-gray)' }}>
                                        {article.readTime}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {article.title}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                    {article.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Resources */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <div className="text-center mb-10">
                            <Video className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                            <h2 className="text-4xl font-bold mb-4" style={{ color: 'white' }}>
                                Video Resources
                            </h2>
                            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                Visual guides and expert talks on mental health
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                            {videos.map((video, index) => (
                                <div
                                    key={index}
                                    className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl hover:bg-opacity-20 transition-all cursor-pointer"
                                >
                                    <Video className="h-8 w-8 mb-3" style={{ color: 'var(--golden-yellow)' }} />
                                    <p className="font-semibold" style={{ color: 'white' }}>
                                        {video}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Support CTA */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <MessageCircle className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Need Someone to Talk To?
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Connect with a licensed counselor through VoiceUp Athletics. Anonymous, confidential, and always here for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/login"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Talk to a Counselor
                            </a>
                            <a
                                href="/resources/support"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                                style={{
                                    borderColor: 'var(--dark-blue)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                View Support Options
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

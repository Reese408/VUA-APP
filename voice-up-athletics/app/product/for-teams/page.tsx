'use client';

import { Users, Shield, TrendingUp, Heart, MessageCircle, Award, CheckCircle, Target, Zap, BarChart3 } from 'lucide-react';

export default function ForTeamsPage() {
    const teamBenefits = [
        {
            icon: Heart,
            title: 'Healthier Athletes',
            description: 'Support your team\'s mental well-being with anonymous access to licensed counselors.',
            stats: '85% of athletes report improved mental health after using VoiceUp'
        },
        {
            icon: TrendingUp,
            title: 'Better Performance',
            description: 'Mental health directly impacts athletic performance. Give your team the tools to excel.',
            stats: '73% see improved on-field performance after addressing mental health'
        },
        {
            icon: Shield,
            title: 'Complete Privacy',
            description: 'Athletes can seek help without fear. Coaches never see who uses the service or what they discuss.',
            stats: '94% feel more comfortable seeking help with anonymous platform'
        },
        {
            icon: Users,
            title: 'Stronger Team Culture',
            description: 'Normalize mental health care and create a culture where athletes support each other.',
            stats: '89% report improved team cohesion and communication'
        }
    ];

    const coachBenefits = [
        {
            title: 'Focus on Coaching',
            description: 'You don\'t have to be the therapist. Let licensed professionals handle mental health while you focus on athletic development.',
            icon: Target
        },
        {
            title: 'Reduce Stigma',
            description: 'Offering VoiceUp signals that mental health matters. Athletes are more likely to seek help when it\'s normalized.',
            icon: Heart
        },
        {
            title: 'Early Intervention',
            description: 'Athletes get help before issues become crises. Prevention is easier than crisis management.',
            icon: Zap
        },
        {
            title: 'Support Without Involvement',
            description: 'You can encourage mental health care without needing to know personal details. Privacy builds trust.',
            icon: Shield
        }
    ];

    const useCases = [
        {
            scenario: 'Performance Anxiety',
            description: 'An athlete struggling with competition nerves can work with a counselor to develop coping strategies - without their coach knowing they\'re seeking help.',
            impact: 'Improved focus and reduced pre-game anxiety'
        },
        {
            scenario: 'Team Pressure',
            description: 'A player feeling overwhelmed by team expectations can process those feelings in a safe, confidential space.',
            impact: 'Better stress management and mental resilience'
        },
        {
            scenario: 'Injury Recovery',
            description: 'An injured athlete can get mental health support during rehab, addressing depression and anxiety that often accompany injuries.',
            impact: 'Faster psychological recovery and return to play'
        },
        {
            scenario: 'Academic Stress',
            description: 'A student-athlete struggling to balance sports and coursework can learn time management and stress reduction techniques.',
            impact: 'Better academic performance and reduced burnout'
        },
        {
            scenario: 'Personal Issues',
            description: 'An athlete dealing with relationship problems, family issues, or identity questions can get professional guidance.',
            impact: 'Improved personal well-being and life satisfaction'
        },
        {
            scenario: 'Transition Struggles',
            description: 'First-year athletes adjusting to college or seniors facing career uncertainty can work through these transitions with support.',
            impact: 'Smoother transitions and reduced anxiety'
        }
    ];

    const implementationSteps = [
        {
            step: '01',
            title: 'Sign Up',
            description: 'Choose the Per-Team plan and provide your team roster.'
        },
        {
            step: '02',
            title: 'Distribute Access',
            description: 'Athletes receive activation emails with instructions to create their anonymous accounts.'
        },
        {
            step: '03',
            title: 'Launch Communication',
            description: 'Announce VoiceUp to your team. We provide talking points and marketing materials.'
        },
        {
            step: '04',
            title: 'Monitor Engagement',
            description: 'View aggregate usage statistics (no individual data) to measure program success.'
        }
    ];

    const testimonials = [
        {
            role: 'Head Coach, Women\'s Soccer',
            quote: 'VoiceUp has been a game-changer for our program. I\'ve noticed a more open, supportive team culture since implementing it. Athletes feel comfortable prioritizing their mental health.',
            team: 'Division I University'
        },
        {
            role: 'Team Captain, Men\'s Basketball',
            quote: 'Having anonymous access to a counselor who understands athlete life has helped me manage pressure and stay focused. I wish every team had this.',
            team: 'State University'
        },
        {
            role: 'Assistant Coach, Track & Field',
            quote: 'As a coach, I want my athletes to get help when they need it. VoiceUp makes that possible without putting them in an uncomfortable position of having to tell me their personal struggles.',
            team: 'Private College'
        }
    ];

    const planFeatures = [
        'Up to 50 student-athletes',
        'Unlimited anonymous messaging',
        'Licensed mental health counselors',
        'Sports psychology expertise',
        'Resource library access',
        '24/7 platform availability',
        'HIPAA & FERPA compliant',
        'Coach dashboard with aggregate stats',
        'Implementation support',
        'Marketing materials included'
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        VoiceUp for Teams
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Give your team the mental health support they need to perform at their best.
                        Anonymous, accessible, and built for athletes.
                    </p>
                    <a
                        href="/university/request-access?plan=per-team"
                        className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                        style={{
                            backgroundColor: 'var(--dark-blue)',
                            color: 'white'
                        }}
                    >
                        Get Started - $199/month
                    </a>
                </div>
            </section>

            {/* Team Benefits */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        Why Teams Choose VoiceUp
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {teamBenefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <benefit.icon className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {benefit.title}
                                </h3>
                                <p className="mb-4" style={{ color: 'var(--dark-gray)' }}>
                                    {benefit.description}
                                </p>
                                <div
                                    className="p-4 rounded-lg"
                                    style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                                >
                                    <p className="text-sm font-semibold" style={{ color: 'var(--dark-blue)' }}>
                                        {benefit.stats}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* For Coaches */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            For Coaches & Staff
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Support your athletes without overstepping boundaries
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coachBenefits.map((benefit, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                                >
                                    <benefit.icon className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    {benefit.title}
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Real-World Use Cases
                    </h2>
                    <p className="text-xl text-center mb-12" style={{ color: 'var(--dark-gray)' }}>
                        How athletes use VoiceUp to improve their mental health and performance
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {useCases.map((useCase, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    {useCase.scenario}
                                </h3>
                                <p className="text-sm mb-3" style={{ color: 'var(--dark-gray)' }}>
                                    {useCase.description}
                                </p>
                                <div className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                    <p className="text-sm font-semibold" style={{ color: 'var(--dark-blue)' }}>
                                        {useCase.impact}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Implementation */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'white' }}>
                            Simple Implementation
                        </h2>
                        <p className="text-xl text-center mb-12" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Get your team up and running in less than a week
                        </p>

                        <div className="grid md:grid-cols-4 gap-8">
                            {implementationSteps.map((item, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                        style={{ backgroundColor: 'var(--golden-yellow)' }}
                                    >
                                        <span className="text-3xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3" style={{ color: 'white' }}>
                                        {item.title}
                                    </h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        What Teams Are Saying
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <MessageCircle className="h-10 w-10 mb-4" style={{ color: 'var(--golden-yellow)' }} />
                                <p className="text-base mb-6 italic" style={{ color: 'var(--dark-gray)' }}>
                                    "{testimonial.quote}"
                                </p>
                                <div>
                                    <p className="font-bold" style={{ color: 'var(--dark-blue)' }}>
                                        {testimonial.role}
                                    </p>
                                    <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                        {testimonial.team}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Plan Features */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm">
                        <div className="text-center mb-10">
                            <Award className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                Per-Team Plan
                            </h2>
                            <div className="text-5xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                $199<span className="text-2xl font-normal">/month</span>
                            </div>
                            <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                                Everything your team needs to support athlete mental health
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                            {planFeatures.map((feature, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--golden-yellow)' }} />
                                    <span className="text-lg" style={{ color: 'var(--dark-gray)' }}>
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <a
                                href="/university/request-access?plan=per-team"
                                className="inline-block px-10 py-4 rounded-lg font-semibold text-xl transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Start Free 30-Day Trial
                            </a>
                            <p className="mt-4 text-sm" style={{ color: 'var(--dark-gray)' }}>
                                No credit card required • Cancel anytime • Full access during trial
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Questions About VoiceUp for Teams?
                    </h2>
                    <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Our team is here to help you get started
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/company/contact"
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                            style={{
                                borderColor: 'var(--dark-blue)',
                                color: 'var(--dark-blue)'
                            }}
                        >
                            Contact Sales
                        </a>
                        <a
                            href="/product/pricing"
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                            style={{
                                borderColor: 'var(--dark-blue)',
                                color: 'var(--dark-blue)'
                            }}
                        >
                            Compare All Plans
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

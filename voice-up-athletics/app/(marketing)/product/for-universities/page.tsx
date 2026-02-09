'use client';

import { Building2, Users, BarChart3, Shield, Award, CheckCircle, TrendingUp, Heart, Target, Zap, MessageCircle, Clock } from 'lucide-react';

export default function ForUniversitiesPage() {
    const universityBenefits = [
        {
            icon: Users,
            title: 'Support All Student-Athletes',
            description: 'Provide comprehensive mental health support across all sports programs with a single platform.',
            metrics: [
                'Unlimited student-athlete accounts',
                'All teams included',
                'Scalable across your athletic department',
                'One platform, all sports'
            ]
        },
        {
            icon: Shield,
            title: 'Meet NCAA Requirements',
            description: 'Stay compliant with NCAA mental health mandates while protecting student privacy.',
            metrics: [
                'NCAA compliance built-in',
                'HIPAA & FERPA certified',
                'Documented mental health access',
                'Annual reporting support'
            ]
        },
        {
            icon: BarChart3,
            title: 'Data-Driven Insights',
            description: 'Understand program engagement and effectiveness with aggregate analytics and reporting.',
            metrics: [
                'Usage dashboards',
                'Trend analysis',
                'Anonymized reporting',
                'ROI measurement tools'
            ]
        },
        {
            icon: Award,
            title: 'Enhance Your Program',
            description: 'Differentiate your athletic program with industry-leading mental health support.',
            metrics: [
                'Recruitment advantage',
                'Better retention rates',
                'Positive PR opportunities',
                'Alumni engagement'
            ]
        }
    ];

    const departmentFeatures = [
        {
            title: 'Centralized Administration',
            description: 'Manage all teams and athletes from a single dashboard',
            icon: Building2
        },
        {
            title: 'Bulk User Provisioning',
            description: 'Add hundreds of athletes quickly with CSV upload and automated emails',
            icon: Users
        },
        {
            title: 'Multi-Level Access',
            description: 'Grant appropriate permissions to athletic directors, compliance officers, and staff',
            icon: Shield
        },
        {
            title: 'Custom Branding',
            description: 'Add your university logo and customize the platform appearance',
            icon: Award
        },
        {
            title: 'Integration Ready',
            description: 'Connect with your student information system and SSO provider',
            icon: Zap
        },
        {
            title: 'Dedicated Support',
            description: 'Access priority support with dedicated account management',
            icon: MessageCircle
        }
    ];

    const complianceFeatures = [
        {
            standard: 'NCAA Mental Health Best Practices',
            description: 'Meets all NCAA requirements for mental health resource access',
            included: true
        },
        {
            standard: 'HIPAA Compliance',
            description: 'Full compliance with healthcare privacy regulations',
            included: true
        },
        {
            standard: 'FERPA Protection',
            description: 'Student educational record privacy safeguards',
            included: true
        },
        {
            standard: 'SOC 2 Type II',
            description: 'Third-party validated security controls',
            included: true
        },
        {
            standard: 'ADA Accessibility',
            description: 'WCAG 2.1 AA compliant platform design',
            included: true
        },
        {
            standard: 'State Privacy Laws',
            description: 'Compliant with CCPA, GDPR, and state-specific regulations',
            included: true
        }
    ];

    const implementationTimeline = [
        {
            phase: 'Week 1',
            title: 'Consultation & Planning',
            activities: [
                'Kickoff meeting with stakeholders',
                'Review university requirements',
                'Customize implementation plan',
                'Schedule training sessions'
            ]
        },
        {
            phase: 'Week 2',
            title: 'Technical Setup',
            activities: [
                'Configure university account',
                'Set up SSO integration (if applicable)',
                'Import team and athlete rosters',
                'Customize branding and resources'
            ]
        },
        {
            phase: 'Week 3',
            title: 'Training & Launch Prep',
            activities: [
                'Train administrative staff',
                'Coach and staff orientation',
                'Distribute athlete activation emails',
                'Launch marketing campaign'
            ]
        },
        {
            phase: 'Week 4',
            title: 'Launch & Support',
            activities: [
                'Official platform launch',
                'Monitor initial engagement',
                'Provide ongoing support',
                'First progress report'
            ]
        }
    ];

    const caseStudies = [
        {
            university: 'Large Division I University',
            athletes: '600+ student-athletes',
            challenge: 'Limited counseling staff, long wait times, stigma around seeking help',
            solution: 'Implemented VoiceUp university-wide with marketing campaign emphasizing anonymity',
            results: [
                '72% of athletes created accounts within first month',
                '45% actively used the platform',
                'Reduced wait times for in-person counseling',
                'Increased overall mental health engagement by 300%'
            ]
        },
        {
            university: 'Mid-Size State University',
            athletes: '350 student-athletes',
            challenge: 'Rising mental health concerns, budget constraints, compliance pressure',
            solution: 'Replaced expensive in-house counseling expansion with VoiceUp platform',
            results: [
                'Saved $150K annually vs hiring additional staff',
                'Improved access to specialized sports psychologists',
                'Met NCAA compliance requirements',
                '85% of athletes rated service as excellent'
            ]
        },
        {
            university: 'Private Liberal Arts College',
            athletes: '180 student-athletes',
            challenge: 'Small athletic department, limited resources, need for specialized care',
            solution: 'Used VoiceUp to supplement campus counseling with sports-specific expertise',
            results: [
                'Athletes access specialized care not available on campus',
                'Reduced stigma through anonymous platform',
                'Improved student-athlete retention by 15%',
                'Became recruiting differentiator'
            ]
        }
    ];

    const supportPackage = [
        'Dedicated account manager',
        'Quarterly business reviews',
        'Custom onboarding plan',
        'Staff training sessions',
        'Marketing materials & templates',
        'Launch support & guidance',
        '24/7 technical support',
        'Regular platform updates',
        'Best practices consulting',
        'Crisis protocol planning'
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        VoiceUp for Universities
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Comprehensive mental health support for your entire athletic department.
                        Meet NCAA requirements, support student-athletes, and enhance your program.
                    </p>
                    <a
                        href="/university/request-access?plan=university-wide"
                        className="inline-block px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                        style={{
                            backgroundColor: 'var(--dark-blue)',
                            color: 'white'
                        }}
                    >
                        Request a Demo
                    </a>
                </div>
            </section>

            {/* University Benefits */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        Why Universities Choose VoiceUp
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {universityBenefits.map((benefit, index) => (
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
                                <ul className="space-y-2">
                                    {benefit.metrics.map((metric, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                            <span style={{ color: 'var(--dark-gray)' }}>{metric}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Department Features */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Built for Athletic Departments
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Enterprise features designed for institutional scale
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departmentFeatures.map((feature, index) => (
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

            {/* Compliance */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Shield className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Compliance & Security
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Meet regulatory requirements with confidence
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {complianceFeatures.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <div className="flex items-start gap-3 mb-2">
                                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--golden-yellow)' }} />
                                    <div>
                                        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--dark-blue)' }}>
                                            {item.standard}
                                        </h3>
                                        <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Implementation Timeline */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'white' }}>
                            4-Week Implementation
                        </h2>
                        <p className="text-xl text-center mb-12" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            From contract to launch in one month
                        </p>

                        <div className="grid md:grid-cols-4 gap-8">
                            {implementationTimeline.map((phase, index) => (
                                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                                    <div
                                        className="px-4 py-2 rounded-lg inline-block mb-4"
                                        style={{ backgroundColor: 'var(--golden-yellow)' }}
                                    >
                                        <span className="font-bold" style={{ color: 'var(--dark-blue)' }}>
                                            {phase.phase}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4" style={{ color: 'white' }}>
                                        {phase.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {phase.activities.map((activity, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--golden-yellow)' }}></span>
                                                <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{activity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Success Stories
                    </h2>
                    <p className="text-xl text-center mb-12" style={{ color: 'var(--dark-gray)' }}>
                        How universities are transforming student-athlete mental health
                    </p>

                    <div className="space-y-8">
                        {caseStudies.map((study, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                            {study.university}
                                        </h3>
                                        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--golden-yellow)' }}>
                                            {study.athletes}
                                        </p>
                                        <div className="mb-4">
                                            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--dark-blue)' }}>
                                                Challenge:
                                            </p>
                                            <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                                {study.challenge}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--dark-blue)' }}>
                                                Solution:
                                            </p>
                                            <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                                {study.solution}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                            Results:
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {study.results.map((result, idx) => (
                                                <div key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--golden-yellow)' }} />
                                                    <span className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                                        {result}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Package */}
            <section className="py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm">
                        <div className="text-center mb-10">
                            <Heart className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                White-Glove Support
                            </h2>
                            <p className="text-xl mb-2" style={{ color: 'var(--dark-gray)' }}>
                                Dedicated partnership and support for your success
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                            {supportPackage.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--golden-yellow)' }} />
                                    <span className="text-lg" style={{ color: 'var(--dark-gray)' }}>
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <a
                                href="/university/request-access?plan=university-wide"
                                className="inline-block px-10 py-4 rounded-lg font-semibold text-xl transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Schedule a Consultation
                            </a>
                            <p className="mt-4 text-sm" style={{ color: 'var(--dark-gray)' }}>
                                Free demo • Custom pricing • Flexible contracts
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Ready to Transform Mental Health Support?
                    </h2>
                    <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Join leading universities in prioritizing student-athlete mental health
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/resources/success-stories"
                            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                            style={{
                                borderColor: 'var(--dark-blue)',
                                color: 'var(--dark-blue)'
                            }}
                        >
                            Read More Success Stories
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
            </section>
        </div>
    );
}

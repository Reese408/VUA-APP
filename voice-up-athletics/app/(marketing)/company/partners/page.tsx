'use client';

import { Shield, Users, Award, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export default function PartnersPage() {
    const partnershipTypes = [
        {
            icon: Shield,
            title: 'University Partners',
            description: 'Leading universities and athletic programs providing mental health support to their student-athletes through our platform.',
            benefits: [
                'Dedicated account management',
                'Custom implementation support',
                'Training and onboarding',
                'Priority feature access'
            ]
        },
        {
            icon: Users,
            title: 'Mental Health Organizations',
            description: 'Collaborating with mental health nonprofits and advocacy groups to expand access and improve outcomes.',
            benefits: [
                'Joint awareness campaigns',
                'Resource sharing',
                'Research collaboration',
                'Community outreach'
            ]
        },
        {
            icon: Award,
            title: 'Technology Partners',
            description: 'Working with leading technology providers to deliver secure, scalable, and innovative mental health solutions.',
            benefits: [
                'Technical integration support',
                'Co-marketing opportunities',
                'Innovation partnerships',
                'Shared expertise'
            ]
        }
    ];

    const partnerBenefits = [
        {
            title: 'Expand Your Impact',
            description: 'Reach more student-athletes and make a meaningful difference in mental health outcomes across collegiate athletics.'
        },
        {
            title: 'Access to Innovation',
            description: 'Collaborate on cutting-edge mental health technology and contribute to the future of athlete wellness.'
        },
        {
            title: 'Thought Leadership',
            description: 'Position your organization as a leader in athlete mental health through joint research and advocacy.'
        },
        {
            title: 'Network Growth',
            description: 'Connect with a growing network of universities, counselors, and mental health professionals.'
        }
    ];

    const currentPartners = [
        { name: 'Stanford University', type: 'University' },
        { name: 'UCLA Athletics', type: 'University' },
        { name: 'University of Michigan', type: 'University' },
        { name: 'Duke University', type: 'University' },
        { name: 'Active Minds', type: 'Mental Health Organization' },
        { name: 'The Jed Foundation', type: 'Mental Health Organization' },
        { name: 'AWS for Startups', type: 'Technology' },
        { name: 'Stripe', type: 'Technology' }
    ];

    const partnershipProcess = [
        {
            step: '01',
            title: 'Initial Consultation',
            description: 'Schedule a call to discuss your goals and how we can collaborate effectively.'
        },
        {
            step: '02',
            title: 'Proposal & Agreement',
            description: 'Review our partnership proposal and finalize terms that work for both organizations.'
        },
        {
            step: '03',
            title: 'Onboarding',
            description: 'Complete onboarding process with dedicated support from our partnerships team.'
        },
        {
            step: '04',
            title: 'Launch & Grow',
            description: 'Launch the partnership and work together to maximize impact and achieve shared goals.'
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Partner With Us
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Join us in transforming mental health support for student-athletes. Together, we can
                        create a healthier, more supportive environment in collegiate athletics.
                    </p>
                    <a
                        href="/company/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                        style={{
                            backgroundColor: 'var(--dark-blue)',
                            color: 'white'
                        }}
                    >
                        Become a Partner
                        <ArrowRight className="h-5 w-5" />
                    </a>
                </div>
            </section>

            {/* Partnership Types */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Partnership Opportunities
                    </h2>
                    <p className="text-xl text-center mb-12 max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
                        We offer multiple partnership models to fit your organization's goals and capabilities
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {partnershipTypes.map((type, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <type.icon className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                    {type.title}
                                </h3>
                                <p className="mb-6" style={{ color: 'var(--dark-gray)' }}>
                                    {type.description}
                                </p>
                                <div className="space-y-3">
                                    {type.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                                            <span className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                                {benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Partner Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'white' }}>
                            Why Partner With VoiceUp Athletics
                        </h2>
                        <p className="text-xl text-center mb-12" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Partnership benefits that create lasting impact
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {partnerBenefits.map((benefit, index) => (
                                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                                    <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--golden-yellow)' }}>
                                        {benefit.title}
                                    </h3>
                                    <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Current Partners */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Our Partners
                    </h2>
                    <p className="text-xl text-center mb-12" style={{ color: 'var(--dark-gray)' }}>
                        Proud to work with leading organizations in collegiate athletics and mental health
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {currentPartners.map((partner, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center"
                            >
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                                    style={{ backgroundColor: 'rgba(30, 58, 138, 0.1)' }}
                                >
                                    <span className="text-2xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                        {partner.name.charAt(0)}
                                    </span>
                                </div>
                                <h4 className="font-bold mb-1" style={{ color: 'var(--dark-blue)' }}>
                                    {partner.name}
                                </h4>
                                <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                    {partner.type}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership Process */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4" style={{ color: 'var(--dark-blue)' }}>
                        How to Become a Partner
                    </h2>
                    <p className="text-xl text-center mb-12" style={{ color: 'var(--dark-gray)' }}>
                        A simple process to get started
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {partnershipProcess.map((item, index) => (
                            <div key={index} className="text-center">
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <span className="text-3xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                        {item.step}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: 'var(--dark-gray)' }}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <TrendingUp className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Ready to Make an Impact?
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Let's discuss how we can work together to support student-athlete mental health
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/company/contact"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Contact Us
                            </a>
                            <a
                                href="/university/request-access"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                                style={{
                                    borderColor: 'var(--dark-blue)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                Request a Demo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

'use client';

import { Check, X, Zap, Building2, Network, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

    const plans = [
        {
            name: 'Per-Team',
            tagline: 'Perfect for individual athletic teams',
            price: { monthly: 199, annual: 1990 },
            description: 'Complete mental health support for up to 50 student-athletes',
            icon: Zap,
            popular: false,
            features: [
                { name: 'Up to 50 student-athletes', included: true },
                { name: 'Anonymous messaging platform', included: true },
                { name: 'Licensed mental health counselors', included: true },
                { name: 'Sports psychology expertise', included: true },
                { name: 'Mental health resource library', included: true },
                { name: '24/7 platform access', included: true },
                { name: 'HIPAA & FERPA compliant', included: true },
                { name: 'Coach dashboard (aggregate stats)', included: true },
                { name: 'Email support', included: true },
                { name: 'Implementation guide', included: true },
                { name: 'Unlimited student-athletes', included: false },
                { name: 'Admin dashboard', included: false },
                { name: 'Priority support', included: false },
                { name: 'Custom integrations', included: false },
                { name: 'Dedicated account manager', included: false }
            ],
            cta: 'Start Free Trial',
            link: '/university/request-access?plan=per-team'
        },
        {
            name: 'University-Wide',
            tagline: 'Comprehensive support for all programs',
            price: { monthly: 899, annual: 8990 },
            description: 'Complete solution for your entire athletic department',
            icon: Building2,
            popular: true,
            features: [
                { name: 'Unlimited student-athletes', included: true },
                { name: 'All teams included', included: true },
                { name: 'Anonymous messaging platform', included: true },
                { name: 'Licensed mental health counselors', included: true },
                { name: 'Sports psychology expertise', included: true },
                { name: 'Mental health resource library', included: true },
                { name: '24/7 platform access', included: true },
                { name: 'HIPAA & FERPA compliant', included: true },
                { name: 'Admin dashboard with analytics', included: true },
                { name: 'Bulk user provisioning', included: true },
                { name: 'Priority email & chat support', included: true },
                { name: 'Quarterly usage reports', included: true },
                { name: 'Training & onboarding', included: true },
                { name: 'Custom integrations', included: false },
                { name: 'Dedicated account manager', included: false }
            ],
            cta: 'Request Demo',
            link: '/university/request-access?plan=university-wide'
        },
        {
            name: 'Enterprise',
            tagline: 'For conferences & multi-institution programs',
            price: { monthly: null, annual: null },
            description: 'Custom solution with advanced features and dedicated support',
            icon: Network,
            popular: false,
            features: [
                { name: 'Unlimited student-athletes', included: true },
                { name: 'Multi-school access', included: true },
                { name: 'Anonymous messaging platform', included: true },
                { name: 'Licensed mental health counselors', included: true },
                { name: 'Sports psychology expertise', included: true },
                { name: 'Mental health resource library', included: true },
                { name: '24/7 platform access', included: true },
                { name: 'HIPAA & FERPA compliant', included: true },
                { name: 'Advanced admin dashboard', included: true },
                { name: 'Custom integrations & API access', included: true },
                { name: 'SSO integration', included: true },
                { name: 'Dedicated account manager', included: true },
                { name: '24/7 priority support', included: true },
                { name: 'Custom onboarding & training', included: true },
                { name: 'White-label options', included: true }
            ],
            cta: 'Contact Sales',
            link: '/company/contact'
        }
    ];

    const faqs = [
        {
            question: 'Is there a free trial?',
            answer: 'Yes! We offer a 30-day free trial for the Per-Team and University-Wide plans. No credit card required. You can cancel anytime during the trial period.'
        },
        {
            question: 'What happens after the free trial ends?',
            answer: 'After your 30-day trial, you\'ll be automatically billed based on your chosen plan unless you cancel. We\'ll send reminders before the trial ends.'
        },
        {
            question: 'Can I switch plans later?',
            answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
        },
        {
            question: 'What\'s included in the annual discount?',
            answer: 'Annual plans save approximately 17% compared to monthly billing. You pay upfront for the year and receive two months free.'
        },
        {
            question: 'Do you offer discounts for smaller schools?',
            answer: 'Yes, we offer discounted pricing for Division II, Division III, NAIA, and junior colleges. Contact our sales team for custom pricing.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, ACH transfers, and purchase orders from accredited institutions.'
        },
        {
            question: 'Is there a setup fee?',
            answer: 'No setup fees for any plan. All implementation, training, and onboarding support is included in your subscription.'
        },
        {
            question: 'Can we add more athletes later?',
            answer: 'For University-Wide and Enterprise plans, you have unlimited athletes. For Per-Team plans, you can upgrade to a higher tier or add additional team licenses.'
        }
    ];

    const savingsPercent = 17;

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Simple, Transparent Pricing
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Choose the plan that fits your athletic program. All plans include anonymous messaging,
                        licensed counselors, and comprehensive mental health support.
                    </p>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${billingCycle === 'monthly' ? 'scale-105' : 'opacity-50'}`}
                            style={{
                                backgroundColor: billingCycle === 'monthly' ? 'var(--dark-blue)' : 'transparent',
                                color: billingCycle === 'monthly' ? 'white' : 'var(--dark-blue)',
                                border: billingCycle === 'monthly' ? 'none' : '2px solid var(--dark-blue)'
                            }}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annual')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${billingCycle === 'annual' ? 'scale-105' : 'opacity-50'}`}
                            style={{
                                backgroundColor: billingCycle === 'annual' ? 'var(--dark-blue)' : 'transparent',
                                color: billingCycle === 'annual' ? 'white' : 'var(--dark-blue)',
                                border: billingCycle === 'annual' ? 'none' : '2px solid var(--dark-blue)'
                            }}
                        >
                            Annual
                            <span
                                className="ml-2 px-2 py-0.5 rounded text-xs"
                                style={{ backgroundColor: 'var(--golden-yellow)', color: 'var(--dark-blue)' }}
                            >
                                Save {savingsPercent}%
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm relative"
                                style={{
                                    border: plan.popular ? '4px solid var(--golden-yellow)' : '1px solid #e5e7eb'
                                }}
                            >
                                {plan.popular && (
                                    <div
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full font-bold text-sm"
                                        style={{
                                            backgroundColor: 'var(--golden-yellow)',
                                            color: 'var(--dark-blue)'
                                        }}
                                    >
                                        Most Popular
                                    </div>
                                )}

                                <div className="p-8">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                        style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                                    >
                                        <plan.icon className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                        {plan.name}
                                    </h3>
                                    <p className="text-sm mb-6" style={{ color: 'var(--dark-gray)' }}>
                                        {plan.tagline}
                                    </p>

                                    <div className="mb-6">
                                        {plan.price.monthly !== null ? (
                                            <>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-5xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                                        ${billingCycle === 'monthly' ? plan.price.monthly : Math.floor(plan.price.annual / 12)}
                                                    </span>
                                                    <span className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                                                        /month
                                                    </span>
                                                </div>
                                                {billingCycle === 'annual' && (
                                                    <p className="text-sm mt-2" style={{ color: 'var(--dark-gray)' }}>
                                                        ${plan.price.annual}/year, billed annually
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <div className="text-4xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                                Custom
                                            </div>
                                        )}
                                    </div>

                                    <p className="mb-6 text-sm" style={{ color: 'var(--dark-gray)' }}>
                                        {plan.description}
                                    </p>

                                    <a
                                        href={plan.link}
                                        className="w-full py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
                                        style={{
                                            backgroundColor: plan.popular ? 'var(--dark-blue)' : 'transparent',
                                            color: plan.popular ? 'white' : 'var(--dark-blue)',
                                            border: plan.popular ? 'none' : '2px solid var(--dark-blue)'
                                        }}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="h-4 w-4" />
                                    </a>

                                    <div className="mt-8 space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                {feature.included ? (
                                                    <Check className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--golden-yellow)' }} />
                                                ) : (
                                                    <X className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: '#d1d5db' }} />
                                                )}
                                                <span
                                                    className="text-sm"
                                                    style={{
                                                        color: feature.included ? 'var(--dark-gray)' : '#d1d5db'
                                                    }}
                                                >
                                                    {feature.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Note */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg mb-4" style={{ color: 'var(--dark-gray)' }}>
                        All plans include HIPAA & FERPA compliance, 24/7 access, and sports psychology expertise.
                        Need help choosing? <a href="/company/contact" className="underline font-semibold" style={{ color: 'var(--dark-blue)' }}>Contact our team</a>.
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        Frequently Asked Questions
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {faq.question}
                                </h3>
                                <p style={{ color: 'var(--dark-gray)' }}>
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <p className="text-lg mb-4" style={{ color: 'var(--dark-gray)' }}>
                            Have more questions?
                        </p>
                        <a
                            href="/resources/help-center"
                            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 border-2"
                            style={{
                                borderColor: 'var(--dark-blue)',
                                color: 'var(--dark-blue)'
                            }}
                        >
                            Visit Help Center
                        </a>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Join leading universities in supporting student-athlete mental health.
                            Start your free 30-day trial today.
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
                                Start Free Trial
                            </a>
                            <a
                                href="/company/contact"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                                style={{
                                    borderColor: 'var(--dark-blue)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                Talk to Sales
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

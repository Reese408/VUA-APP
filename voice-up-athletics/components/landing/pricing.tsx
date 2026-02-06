'use client';

import { useState } from "react";
import Link from "next/link";
import { Check, Banknote } from "lucide-react";
import ComparePlans from "./compare-pricing";

const pricingPlans = [
  {
    name: "Per-Team",
    description: "Perfect for individual athletic teams wanting to support their athletes.",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Up to 50 student-athletes",
      "Anonymous messaging system",
      "Basic resource library",
      "Email support",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
    type: "basic",
    planId: "per-team",
  },
  {
    name: "University-Wide",
    description: "Comprehensive mental health support for all athletic programs across campus.",
    monthlyPrice: 899,
    yearlyPrice: 8990,
    features: [
      "Unlimited student-athletes",
      "Admin dashboard & analytics",
      "Counselor management portal",
      "Custom university branding",
      "Priority support 24/7",
      "Advanced reporting tools",
      "Training & onboarding included",
    ],
    cta: "Contact Sales",
    type: "popular",
    planId: "university-wide",
  },
  {
    name: "Enterprise",
    description: "For athletic conferences, leagues, or multi-institution programs.",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Multi-school access",
      "Custom integrations & API",
      "Dedicated success manager",
      "White-label options",
      "Advanced security features",
      "SLA guarantees",
      "Custom contract terms",
    ],
    cta: "Talk to Us",
    type: "enterprise",
    planId: "enterprise",
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getCardStyle = (index: number, type: string) => {
    const isHovered = hoveredIndex === index;
    const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

    let background = '';
    if (type === 'basic') {
      background = 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)';
    } else if (type === 'popular') {
      background = 'linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)';
    } else {
      background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)';
    }

    return {
      background,
      transform: isHovered
        ? 'scale(1.06) translateY(-6px)'
        : isOtherHovered
        ? 'scale(0.95)'
        : 'scale(1)',
      opacity: isOtherHovered ? 0.75 : 1,
      zIndex: isHovered ? 10 : 1,
    };
  };

  const getTextColor = (type: string) =>
    type === 'enterprise' ? 'white' : 'var(--dark-blue)';

  const getButtonStyle = () => ({
    backgroundColor: 'white',
    color: 'var(--dark-blue)',
  });

  return (
    <section
      id="pricing"
      className="py-24 lg:py-32"
      style={{ background: 'linear-gradient(135deg, #e5e7eb 0%, #ffffff 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="font-semibold text-sm uppercase tracking-wide"
            style={{ color: 'var(--golden-yellow)' }}
          >
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4" style={{ color: 'var(--dark-blue)' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-xl mt-6 max-w-2xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
            Support student-athlete mental health with plans designed to scale from teams to entire universities.
          </p>
            <div className="flex items-center justify-center gap-4 mt-10">
            {/* Monthly label */}
            <span
                className={`w-20 text-right transition-opacity ${
                !isYearly ? 'opacity-100' : 'opacity-50'
                }`}
            >
                Monthly
            </span>

            {/* Toggle */}
            <button
                type="button"
                onClick={() => setIsYearly((prev) => !prev)}
                aria-label="Toggle billing period"
                className="relative h-8 w-16 rounded-full transition-colors"
                style={{
                backgroundColor: isYearly ? 'var(--golden-yellow)' : 'var(--dark-gray)',
                }}
            >
                <span
                className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform duration-200 ease-in-out ${
                    isYearly ? 'translate-x-8' : 'translate-x-0'
                }`}
                />
            </button>

            {/* Yearly label */}
            <span
                className={`w-28 text-left transition-opacity ${
                isYearly ? 'opacity-100' : 'opacity-50'
                }`}
            >
                Yearly <span className="text-sm">(Save 17%)</span>
            </span>
            </div>
        </div>

        {/* Pricing Plans Pill */}
        <div className="flex justify-center mb-10">
            <div
                className="flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold"
                style={{
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                color: 'var(--dark-gray)',
                }}
            >
                <Banknote className="w-4 h-4" />
                Pricing Plans
            </div>
        </div>

        {/* Pricing Cards (NO FRAMER MOTION) */}
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex flex-col rounded-2xl p-8 border-2 transition-all"
              style={{
                ...getCardStyle(index, plan.type),
                borderColor: plan.type === 'popular' ? 'var(--dark-blue)' : 'transparent',
                boxShadow:
                  hoveredIndex === index
                    ? '0 20px 40px rgba(0,0,0,0.2)'
                    : '0 6px 12px rgba(0,0,0,0.1)',
                maxWidth: 380,
                minWidth: 300,
              }}
            >
              {plan.type === 'popular' && (
                <span
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: 'var(--dark-blue)', color: 'white' }}
                >
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold" style={{ color: getTextColor(plan.type) }}>
                {plan.name}
              </h3>
              <p className="mt-2 mb-6 text-sm" style={{ color: 'var(--dark-gray)' }}>
                {plan.description}
              </p>

              <div className="mb-6">
                {plan.monthlyPrice ? (
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-bold" style={{ color: getTextColor(plan.type) }}>
                      ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-lg">/{isYearly ? 'year' : 'month'}</span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold" style={{ color: getTextColor(plan.type) }}>
                    Custom
                  </span>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm">
                    <Check className="w-5 h-5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/university/request-access?plan=${plan.planId}`}
                className="block w-full py-3 rounded-xl font-semibold hover:scale-105 transition text-center"
                style={getButtonStyle()}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Compare Plans */}
        <ComparePlans />
      </div>
    </section>
  );
}

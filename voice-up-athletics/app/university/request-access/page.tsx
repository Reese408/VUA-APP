'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Building2, Users, Mail, Phone, MessageSquare, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const plans = {
  'per-team': {
    name: 'Per-Team',
    price: '$199/month',
    description: 'Perfect for individual athletic teams',
    features: ['Up to 50 student-athletes', 'Anonymous messaging', 'Basic resources']
  },
  'university-wide': {
    name: 'University-Wide',
    price: '$899/month',
    description: 'Comprehensive support for all programs',
    features: ['Unlimited student-athletes', 'Admin dashboard', 'Priority support']
  },
  'enterprise': {
    name: 'Enterprise',
    price: 'Custom pricing',
    description: 'For conferences and multi-institution programs',
    features: ['Multi-school access', 'Custom integrations', 'Dedicated success manager']
  }
};

function RequestAccessForm() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'university-wide';
  const selectedPlan = plans[planParam as keyof typeof plans] || plans['university-wide'];

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    universityName: '',
    contactName: '',
    email: '',
    phone: '',
    numTeams: '',
    numAthletes: '',
    message: '',
    plan: planParam
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    setLoading(false);
    setSubmitted(true);

    // TODO: Send to backend API
    // await fetch('/api/university/request-access', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'linear-gradient(135deg, #e5e7eb 0%, #ffffff 100%)' }}>
        <div className="max-w-2xl w-full">
          <div
            className="rounded-2xl p-12 text-center"
            style={{
              background: 'white',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
            >
              <CheckCircle2 className="w-12 h-12" style={{ color: 'var(--golden-yellow)' }} />
            </div>

            <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
              Request Received!
            </h1>

            <p className="text-lg mb-8" style={{ color: 'var(--dark-gray)' }}>
              Thank you for your interest in VoiceUp Athletics. Our team will review your request and contact you within 24 hours to discuss next steps.
            </p>

            <div
              className="rounded-xl p-6 mb-8"
              style={{ backgroundColor: 'rgba(30, 58, 138, 0.05)' }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--dark-blue)' }}>
                What happens next?
              </h3>
              <ul className="text-left space-y-2" style={{ color: 'var(--dark-gray)' }}>
                <li className="flex items-start gap-2">
                  <span className="text-lg">1.</span>
                  <span>We'll review your university's information and requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">2.</span>
                  <span>A member of our team will reach out to schedule a demo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">3.</span>
                  <span>We'll create a customized plan for your athletic program</span>
                </li>
              </ul>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--golden-yellow)',
                color: 'var(--dark-blue)'
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6" style={{ background: 'linear-gradient(135deg, #e5e7eb 0%, #ffffff 100%)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:opacity-70"
            style={{ color: 'var(--dark-blue)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </Link>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--golden-yellow)' }}
            >
              <MessageSquare className="h-7 w-7" style={{ color: 'var(--dark-blue)' }} />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--dark-blue)' }}>
              Request University Access
            </h1>
          </div>

          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
            Join leading universities in supporting student-athlete mental health.
            Fill out the form below and we'll be in touch within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'white',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* University Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                    University Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                        University Name *
                      </label>
                      <div className="relative">
                        <Building2
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                          style={{ color: 'var(--dark-gray)' }}
                        />
                        <input
                          type="text"
                          name="universityName"
                          value={formData.universityName}
                          onChange={handleChange}
                          required
                          placeholder="e.g., Stanford University"
                          className="w-full pl-11 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                          style={{
                            borderColor: '#e5e7eb',
                            color: 'var(--dark-blue)'
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                          Number of Teams *
                        </label>
                        <input
                          type="number"
                          name="numTeams"
                          value={formData.numTeams}
                          onChange={handleChange}
                          required
                          placeholder="e.g., 15"
                          className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                          style={{
                            borderColor: '#e5e7eb',
                            color: 'var(--dark-blue)'
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                          Estimated Athletes *
                        </label>
                        <input
                          type="number"
                          name="numAthletes"
                          value={formData.numAthletes}
                          onChange={handleChange}
                          required
                          placeholder="e.g., 500"
                          className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                          style={{
                            borderColor: '#e5e7eb',
                            color: 'var(--dark-blue)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        placeholder="Athletic Director or Department Contact"
                        className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                        style={{
                          borderColor: '#e5e7eb',
                          color: 'var(--dark-blue)'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                          style={{ color: 'var(--dark-gray)' }}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@university.edu"
                          className="w-full pl-11 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                          style={{
                            borderColor: '#e5e7eb',
                            color: 'var(--dark-blue)'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                          style={{ color: 'var(--dark-gray)' }}
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="(555) 123-4567"
                          className="w-full pl-11 pr-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                          style={{
                            borderColor: '#e5e7eb',
                            color: 'var(--dark-blue)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                    Tell us about your needs (optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any specific requirements, timeline, or questions you have..."
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none resize-none"
                    style={{
                      borderColor: '#e5e7eb',
                      color: 'var(--dark-blue)'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--golden-yellow)',
                    color: 'var(--dark-blue)'
                  }}
                >
                  {loading ? 'Submitting...' : 'Request Access'}
                </button>

                <p className="text-sm text-center" style={{ color: 'var(--dark-gray)' }}>
                  By submitting this form, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </div>
          </div>

          {/* Plan Summary Card */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{
                background: 'var(--dark-blue)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: 'var(--golden-yellow)' }}>
                Selected Plan
              </h3>

              <div className="mb-6">
                <h4 className="text-2xl font-bold mb-2" style={{ color: 'white' }}>
                  {selectedPlan.name}
                </h4>
                <p className="text-3xl font-bold mb-3" style={{ color: 'var(--golden-yellow)' }}>
                  {selectedPlan.price}
                </p>
                <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {selectedPlan.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-semibold" style={{ color: 'white' }}>
                  Includes:
                </p>
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--golden-yellow)' }} />
                    <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
              >
                <p className="text-sm font-semibold mb-2" style={{ color: 'white' }}>
                  🎯 What's Next?
                </p>
                <ul className="text-sm space-y-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  <li>• Free 30-day trial</li>
                  <li>• Custom demo</li>
                  <li>• Flexible contracts</li>
                  <li>• No credit card required</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UniversityRequestAccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg" style={{ color: 'var(--dark-blue)' }}>Loading...</p>
        </div>
      </div>
    }>
      <RequestAccessForm />
    </Suspense>
  );
}

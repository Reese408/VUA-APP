'use client';

import { useState } from 'react';
import { User, Mail, Phone, Building2, MessageSquare, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface ContactFormProps {
  defaultSubject?: string;
  title?: string;
  description?: string;
}

export default function ContactForm({
  defaultSubject = '',
  title = 'Get In Touch',
  description = "Have questions or want to learn more? Fill out the form below and we'll get back to you within 24 hours."
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: defaultSubject,
    message: ''
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

    console.log('Contact form submitted:', formData);
    setLoading(false);
    setSubmitted(true);

    // TODO: Send to backend API
    // await fetch('/api/contact', {
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
              Message Received!
            </h1>

            <p className="text-lg mb-8" style={{ color: 'var(--dark-gray)' }}>
              Thank you for reaching out to VoiceUp Athletics. Our team will review your message and get back to you within 24 hours.
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
                  <span>A member of our team will review your inquiry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">2.</span>
                  <span>We'll reach out via your preferred contact method</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lg">3.</span>
                  <span>We'll work together to address your questions or needs</span>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--golden-yellow)' }}
            >
              <MessageSquare className="h-7 w-7" style={{ color: 'var(--dark-blue)' }} />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: 'var(--dark-blue)' }}>
              {title}
            </h1>
          </div>

          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
            {description}
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-2xl p-8 md:p-10"
          style={{
            background: 'white',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                Your Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: 'var(--dark-gray)' }}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
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
                      Phone Number
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
                        placeholder="(555) 123-4567"
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
                      Organization / University
                    </label>
                    <div className="relative">
                      <Building2
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                        style={{ color: 'var(--dark-gray)' }}
                      />
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Your Organization"
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
            </div>

            {/* Message Details */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                Your Message
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none"
                    style={{
                      borderColor: '#e5e7eb',
                      color: 'var(--dark-blue)'
                    }}
                  >
                    <option value="">Select a subject</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="demo">Request a Demo</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="career">Career Opportunity</option>
                    <option value="media">Media Inquiry</option>
                    <option value="general">General Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--dark-blue)' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none resize-none"
                    style={{
                      borderColor: '#e5e7eb',
                      color: 'var(--dark-blue)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--golden-yellow)',
                color: 'var(--dark-blue)'
              }}
            >
              {loading ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-sm text-center" style={{ color: 'var(--dark-gray)' }}>
              By submitting this form, you agree to our{' '}
              <Link href="/legal/terms-of-service" className="underline hover:opacity-70">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/legal/privacy-policy" className="underline hover:opacity-70">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'var(--golden-yellow)' }}
            >
              <Mail className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
            </div>
            <h4 className="font-semibold mb-1" style={{ color: 'var(--dark-blue)' }}>
              Email Us
            </h4>
            <a
              href="mailto:hello@voiceup-athletics.com"
              className="text-sm hover:underline"
              style={{ color: 'var(--dark-gray)' }}
            >
              hello@voiceup-athletics.com
            </a>
          </div>

          <div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'var(--golden-yellow)' }}
            >
              <Phone className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
            </div>
            <h4 className="font-semibold mb-1" style={{ color: 'var(--dark-blue)' }}>
              Call Us
            </h4>
            <a
              href="tel:+15551234567"
              className="text-sm hover:underline"
              style={{ color: 'var(--dark-gray)' }}
            >
              +1 (555) 123-4567
            </a>
          </div>

          <div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
              style={{ backgroundColor: 'var(--golden-yellow)' }}
            >
              <MessageSquare className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
            </div>
            <h4 className="font-semibold mb-1" style={{ color: 'var(--dark-blue)' }}>
              Response Time
            </h4>
            <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
              Within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

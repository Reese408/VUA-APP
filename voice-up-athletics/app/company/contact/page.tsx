'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            content: 'hello@voiceup-athletics.com',
            link: 'mailto:hello@voiceup-athletics.com'
        },
        {
            icon: Phone,
            title: 'Call Us',
            content: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: MapPin,
            title: 'Visit Us',
            content: '123 Mental Health Way, San Francisco, CA 94102',
            link: 'https://maps.google.com'
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Get In Touch
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
                        Have questions about VoiceUp Athletics? We're here to help. Reach out to learn more about
                        our platform, discuss partnership opportunities, or get support.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.link}
                                target={info.link.startsWith('http') ? '_blank' : undefined}
                                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center group"
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <info.icon className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    {info.title}
                                </h3>
                                <p className="text-base" style={{ color: 'var(--dark-gray)' }}>
                                    {info.content}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-10 md:p-12 rounded-2xl shadow-sm">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                Send Us a Message
                            </h2>
                            <p className="text-lg" style={{ color: 'var(--dark-gray)' }}>
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                                        style={{ borderColor: 'rgba(30, 58, 138, 0.2)' }}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                                        style={{ borderColor: 'rgba(30, 58, 138, 0.2)' }}
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="organization" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    Organization / University
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                                    style={{ borderColor: 'rgba(30, 58, 138, 0.2)' }}
                                    placeholder="University of Example"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    Subject *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors"
                                    style={{ borderColor: 'rgba(30, 58, 138, 0.2)', color: 'var(--dark-gray)' }}
                                >
                                    <option value="">Select a subject</option>
                                    <option value="partnership">Partnership Inquiry</option>
                                    <option value="demo">Request a Demo</option>
                                    <option value="support">Technical Support</option>
                                    <option value="billing">Billing Question</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-opacity-100 transition-colors resize-none"
                                    style={{ borderColor: 'rgba(30, 58, 138, 0.2)' }}
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 rounded-lg font-semibold text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                <Send className="h-5 w-5" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Office Hours Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl text-center"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <h2 className="text-3xl font-bold mb-4" style={{ color: 'white' }}>
                            Office Hours
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            Our support team is available to assist you
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--golden-yellow)' }}>
                                    Monday - Friday
                                </h3>
                                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                    9:00 AM - 6:00 PM PST
                                </p>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl">
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--golden-yellow)' }}>
                                    Weekend
                                </h3>
                                <p className="text-base" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                    Emergency Support Only
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Quick Links */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                        Looking for Quick Answers?
                    </h2>
                    <p className="text-lg mb-8" style={{ color: 'var(--dark-gray)' }}>
                        Check out our frequently asked questions or explore our resources
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/#faq"
                            className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                            style={{
                                backgroundColor: 'var(--golden-yellow)',
                                color: 'var(--dark-blue)'
                            }}
                        >
                            View FAQ
                        </a>
                        <a
                            href="/legal/security"
                            className="px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105 border-2"
                            style={{
                                borderColor: 'var(--dark-blue)',
                                color: 'var(--dark-blue)'
                            }}
                        >
                            Security Info
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

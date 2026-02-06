'use client';

import Link from 'next/link';
import { Target, Heart, Shield, Users, Lightbulb, Globe } from 'lucide-react';

export default function OurMission() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16 text-center">
          <Link
            href="/"
            className="text-sm mb-4 inline-block transition-colors"
            style={{ color: 'var(--dark-blue)' }}
          >
            ← Back to Home
          </Link>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--dark-blue)' }}
          >
            Our Mission
          </h1>
          <div
            className="text-2xl md:text-3xl font-semibold max-w-4xl mx-auto leading-relaxed p-8 rounded-2xl"
            style={{
              color: 'var(--dark-blue)',
              backgroundColor: 'rgba(253, 184, 39, 0.15)',
              border: '2px solid rgba(253, 184, 39, 0.4)'
            }}
          >
            "To empower student-athletes to prioritize their mental health by providing anonymous, stigma-free access to professional support."
          </div>
        </div>

        {/* The Challenge Section */}
        <section className="mb-16">
          <div
            className="p-8 md:p-12 rounded-2xl"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--dark-blue)' }}
            >
              The Challenge We're Solving
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              Student-athletes face unique mental health challenges that often go unaddressed:
            </p>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span><strong>Performance Pressure:</strong> Constant expectations to excel both athletically and academically</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span><strong>Fear of Judgment:</strong> Worry that seeking help will be seen as weakness or impact playing time</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span><strong>Stigma:</strong> Mental health remains taboo in many athletic cultures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span><strong>Limited Resources:</strong> Many universities lack sufficient mental health support for their athletic programs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold mt-1">•</span>
                <span><strong>Privacy Concerns:</strong> Fear that seeking counseling will become known to coaches, teammates, or staff</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Our Solution */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Our Solution
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-8 rounded-xl"
              style={{ backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Shield className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                Complete Anonymity
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Athletes connect with counselors using anonymous display names. Coaches, teammates, and even university administrators cannot identify who seeks support, eliminating fear of judgment or career impact.
              </p>
            </div>

            <div
              className="p-8 rounded-xl"
              style={{ backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Users className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                Specialized Counselors
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our licensed mental health professionals specialize in sports psychology and understand the unique pressures of collegiate athletics. They speak your language and get your world.
              </p>
            </div>

            <div
              className="p-8 rounded-xl"
              style={{ backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Heart className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                Accessible 24/7
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Mental health challenges don't follow a 9-5 schedule. Our platform allows athletes to reach out when they need support, whether it's after a tough game or during finals week.
              </p>
            </div>

            <div
              className="p-8 rounded-xl"
              style={{ backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Target className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                University Integration
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We partner directly with athletic departments to ensure seamless integration with existing support systems while maintaining strict confidentiality boundaries.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <div
            className="p-10 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.8) 100%)'
            }}
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              Our Vision for the Future
            </h2>
            <p className="text-white text-xl leading-relaxed text-center max-w-4xl mx-auto mb-8">
              We envision a future where every student-athlete has immediate access to mental health support without fear, stigma, or barriers. Where seeking help is seen as a sign of strength, not weakness. Where athletic excellence and mental well-being go hand in hand.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(253, 184, 39, 0.3)' }}
                >
                  <Globe className="h-8 w-8" style={{ color: 'var(--golden-yellow)' }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--golden-yellow)' }}>
                  National Reach
                </h3>
                <p className="text-white text-sm">
                  Partner with every NCAA university by 2027
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(253, 184, 39, 0.3)' }}
                >
                  <Lightbulb className="h-8 w-8" style={{ color: 'var(--golden-yellow)' }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--golden-yellow)' }}>
                  Innovation
                </h3>
                <p className="text-white text-sm">
                  Continuously improve our platform with athlete feedback
                </p>
              </div>
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(253, 184, 39, 0.3)' }}
                >
                  <Heart className="h-8 w-8" style={{ color: 'var(--golden-yellow)' }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--golden-yellow)' }}>
                  Cultural Change
                </h3>
                <p className="text-white text-sm">
                  Normalize mental health support in athletic culture
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Priorities */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Our Strategic Priorities
          </h2>
          <div className="space-y-4">
            {[
              {
                number: '01',
                title: 'Expand Access',
                description: 'Partner with more universities to reach underserved athletic programs and bring mental health support to every student-athlete who needs it.'
              },
              {
                number: '02',
                title: 'Enhance Quality',
                description: 'Recruit and train the best sports psychology professionals, continuously improving our counselor network and support quality.'
              },
              {
                number: '03',
                title: 'Build Trust',
                description: 'Maintain the highest standards of privacy, security, and HIPAA compliance to ensure athletes feel safe seeking support.'
              },
              {
                number: '04',
                title: 'Drive Research',
                description: 'Partner with universities to advance research in student-athlete mental health and share insights with the broader community.'
              },
              {
                number: '05',
                title: 'Foster Community',
                description: 'Create resources and programming that help universities build mentally healthy athletic cultures.'
              }
            ].map((priority, index) => (
              <div
                key={index}
                className="p-6 rounded-xl flex gap-6 items-start transition-transform hover:scale-102"
                style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <div
                  className="text-5xl font-bold flex-shrink-0"
                  style={{ color: 'var(--golden-yellow)' }}
                >
                  {priority.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                    {priority.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {priority.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Commitment Section */}
        <section className="mb-16">
          <div
            className="p-8 md:p-12 rounded-2xl text-center"
            style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '2px solid rgba(253, 184, 39, 0.4)' }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--dark-blue)' }}
            >
              Our Commitment to You
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto mb-6">
              We promise to always put student-athlete mental health first. Every feature we build, every partner we choose, every decision we make is guided by one question: "Is this best for the athletes we serve?"
            </p>
            <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
              Your mental health matters. Your voice matters. You matter.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div
          className="p-10 rounded-2xl text-center"
          style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)' }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
            Join Us in Our Mission
          </h2>
          <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
            Whether you're a university administrator, mental health professional, or supporter of student-athlete well-being, there's a place for you in our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/university/request-access"
              className="px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--golden-yellow)', color: 'var(--dark-blue)' }}
            >
              Partner With Us
            </Link>
            <Link
              href="/company/careers"
              className="px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--dark-blue)',
                border: '2px solid var(--dark-blue)'
              }}
            >
              Join Our Team
            </Link>
          </div>
        </div>

        {/* Related Links */}
        <div
          className="mt-12 p-6 rounded-xl"
          style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)' }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--dark-blue)' }}>
            Learn More
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/company/about" className="underline" style={{ color: 'var(--dark-blue)' }}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/company/partners" className="underline" style={{ color: 'var(--dark-blue)' }}>
                Our Partners
              </Link>
            </li>
            <li>
              <Link href="/company/contact" className="underline" style={{ color: 'var(--dark-blue)' }}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

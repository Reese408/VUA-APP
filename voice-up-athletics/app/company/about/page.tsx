'use client';

import Link from 'next/link';
import { Heart, Users, Shield, Target, Award, TrendingUp } from 'lucide-react';

export default function AboutUs() {
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
            About VoiceUp Athletics
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Empowering student-athletes to prioritize their mental health through anonymous, confidential support.
          </p>
        </div>

        {/* Hero Story Section */}
        <section className="mb-16">
          <div
            className="p-8 md:p-12 rounded-2xl"
            style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)', border: '1px solid rgba(33, 32, 156, 0.1)' }}
          >
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: 'var(--dark-blue)' }}
            >
              Our Story
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              VoiceUp Athletics was founded by former college athletes who understood firsthand the unique mental health challenges facing student-athletes. The pressure to perform, fear of judgment, and stigma around mental health often prevented athletes from seeking the support they needed.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              We created VoiceUp Athletics to break down these barriers. By providing a platform where athletes can connect with professional counselors anonymously, we're making mental health support accessible, confidential, and stigma-free.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Today, we partner with universities across the country to support thousands of student-athletes in prioritizing their mental well-being alongside their athletic goals.
            </p>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="p-8 rounded-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Shield className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                Confidentiality First
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We protect athlete privacy through complete anonymity and industry-leading security practices.
              </p>
            </div>

            <div
              className="p-8 rounded-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Heart className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                Athlete-Centered
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Every decision we make prioritizes the well-being and needs of student-athletes.
              </p>
            </div>

            <div
              className="p-8 rounded-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Award className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                Excellence
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We maintain the highest standards in mental health care, technology, and compliance.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="mb-16">
          <div
            className="p-10 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.8) 100%)'
            }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">
              Our Impact
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: 'var(--golden-yellow)' }}
                >
                  50+
                </div>
                <p className="text-white text-lg">Partner Universities</p>
              </div>
              <div>
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: 'var(--golden-yellow)' }}
                >
                  10K+
                </div>
                <p className="text-white text-lg">Student-Athletes</p>
              </div>
              <div>
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: 'var(--golden-yellow)' }}
                >
                  25K+
                </div>
                <p className="text-white text-lg">Conversations</p>
              </div>
              <div>
                <div
                  className="text-5xl font-bold mb-2"
                  style={{ color: 'var(--golden-yellow)' }}
                >
                  98%
                </div>
                <p className="text-white text-lg">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Sarah Johnson',
                role: 'CEO & Co-Founder',
                bio: 'Former Division I athlete and licensed clinical psychologist with 15 years of experience in sports psychology.',
              },
              {
                name: 'Michael Chen',
                role: 'CTO & Co-Founder',
                bio: 'Tech entrepreneur passionate about healthcare innovation. Previously led engineering at two healthcare startups.',
              },
              {
                name: 'Dr. Emily Rodriguez',
                role: 'Chief Clinical Officer',
                bio: 'Board-certified psychiatrist specializing in student mental health and collegiate athletic programs.',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-xl"
                style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(33, 32, 156, 0.1)' }}
                />
                <h3 className="text-xl font-bold mb-1 text-center" style={{ color: 'var(--dark-blue)' }}>
                  {member.name}
                </h3>
                <p
                  className="text-sm mb-3 text-center font-semibold"
                  style={{ color: 'var(--golden-yellow)' }}
                >
                  {member.role}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed text-center">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why We're Different */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Why We're Different
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-xl flex gap-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--golden-yellow)' }}
              >
                <Users className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                  Built by Athletes, for Athletes
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our founders and team understand the unique pressures of collegiate athletics firsthand.
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-xl flex gap-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--golden-yellow)' }}
              >
                <Shield className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                  Complete Anonymity
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Athletes can seek help without fear of judgment, stigma, or impact on their athletic career.
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-xl flex gap-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--golden-yellow)' }}
              >
                <Target className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                  Specialized Counselors
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our mental health professionals specialize in sports psychology and athlete mental health.
                </p>
              </div>
            </div>

            <div
              className="p-6 rounded-xl flex gap-4"
              style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--golden-yellow)' }}
              >
                <TrendingUp className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                  Evidence-Based Approach
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We use proven therapeutic techniques backed by research in sports psychology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div
          className="p-10 rounded-2xl text-center"
          style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)' }}
        >
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
            Join Our Mission
          </h2>
          <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
            Whether you're a university, counselor, or supporter of student-athlete mental health, we'd love to connect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/company/contact"
              className="px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--golden-yellow)', color: 'var(--dark-blue)' }}
            >
              Contact Us
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
              <Link href="/company/mission" className="underline" style={{ color: 'var(--dark-blue)' }}>
                Our Mission
              </Link>
            </li>
            <li>
              <Link href="/company/careers" className="underline" style={{ color: 'var(--dark-blue)' }}>
                Careers
              </Link>
            </li>
            <li>
              <Link href="/company/partners" className="underline" style={{ color: 'var(--dark-blue)' }}>
                Partners
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

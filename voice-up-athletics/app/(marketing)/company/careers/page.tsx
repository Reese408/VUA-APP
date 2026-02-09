'use client';

import Link from 'next/link';
import { Briefcase, Heart, Users, Zap, Coffee, Home, DollarSign, Award } from 'lucide-react';

export default function Careers() {
  const openings = [
    {
      title: 'Senior Full-Stack Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-Time',
      description: 'Build secure, scalable features for our mental health platform. Work with React, Next.js, Node.js, and PostgreSQL.'
    },
    {
      title: 'Licensed Mental Health Counselor',
      department: 'Clinical',
      location: 'Remote',
      type: 'Part-Time / Contract',
      description: 'Provide anonymous mental health support to student-athletes. Sports psychology background preferred.'
    },
    {
      title: 'Product Designer',
      department: 'Product',
      location: 'Remote (US)',
      type: 'Full-Time',
      description: 'Design intuitive, empathetic user experiences for athletes and counselors. Strong portfolio in healthcare or mental health required.'
    },
    {
      title: 'University Partnership Manager',
      department: 'Sales',
      location: 'Hybrid / Travel',
      type: 'Full-Time',
      description: 'Build relationships with athletic departments and expand our university network. Experience in higher ed sales preferred.'
    },
    {
      title: 'Security Engineer',
      department: 'Engineering',
      location: 'Remote (US)',
      type: 'Full-Time',
      description: 'Ensure HIPAA compliance and platform security. Experience with healthcare data protection required.'
    },
    {
      title: 'Content & Community Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-Time',
      description: 'Create mental health resources and build community. Background in mental health advocacy or student affairs a plus.'
    }
  ];

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
            Careers at VoiceUp Athletics
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join our team in transforming student-athlete mental health. We're looking for passionate people who want to make a real difference.
          </p>
        </div>

        {/* Why Work Here */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Why Work With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="p-6 rounded-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Heart className="h-7 w-7" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                Meaningful Impact
              </h3>
              <p className="text-gray-700 text-sm">
                Directly improve mental health outcomes for thousands of student-athletes
              </p>
            </div>

            <div
              className="p-6 rounded-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Home className="h-7 w-7" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                Remote First
              </h3>
              <p className="text-gray-700 text-sm">
                Work from anywhere in the US with flexible hours and async communication
              </p>
            </div>

            <div
              className="p-6 rounded-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Users className="h-7 w-7" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                Amazing Team
              </h3>
              <p className="text-gray-700 text-sm">
                Collaborate with former athletes, clinicians, and experienced tech professionals
              </p>
            </div>

            <div
              className="p-6 rounded-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <div
                className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)' }}
              >
                <Zap className="h-7 w-7" style={{ color: 'var(--dark-blue)' }} />
              </div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                Fast Growth
              </h3>
              <p className="text-gray-700 text-sm">
                Join an early-stage startup with strong traction and ambitious goals
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div
            className="p-10 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.8) 100%)'
            }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Benefits & Perks
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, title: 'Competitive Salary', description: 'Market-rate compensation with equity options' },
                { icon: Heart, title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
                { icon: Coffee, title: 'Unlimited PTO', description: 'Take the time you need to recharge and stay healthy' },
                { icon: Home, title: 'Remote Stipend', description: '$500/year for home office equipment' },
                { icon: Award, title: 'Professional Development', description: '$2,000/year for courses, conferences, and learning' },
                { icon: Users, title: 'Team Retreats', description: 'Annual all-hands retreats to connect in person' }
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(253, 184, 39, 0.3)' }}
                  >
                    <benefit.icon className="h-6 w-6" style={{ color: 'var(--golden-yellow)' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: 'var(--golden-yellow)' }}>
                      {benefit.title}
                    </h3>
                    <p className="text-white text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            What We Value
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Empathy First',
                description: 'We design and build with deep empathy for student-athletes and their unique challenges.'
              },
              {
                title: 'Privacy & Security',
                description: 'We never compromise on protecting athlete confidentiality and data security.'
              },
              {
                title: 'Continuous Learning',
                description: 'We embrace feedback, iterate quickly, and constantly improve our platform and processes.'
              },
              {
                title: 'Inclusive Culture',
                description: 'We celebrate diversity and create a welcoming environment where everyone can thrive.'
              },
              {
                title: 'Ownership & Autonomy',
                description: 'We trust our team to make decisions and take ownership of their work.'
              },
              {
                title: 'Mental Health Matters',
                description: 'We practice what we preach—prioritizing team mental health and work-life balance.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl"
                style={{ backgroundColor: 'rgba(253, 184, 39, 0.1)', border: '1px solid rgba(253, 184, 39, 0.3)' }}
              >
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Open Positions
          </h2>
          <div className="space-y-4">
            {openings.map((job, index) => (
              <div
                key={index}
                className="p-6 rounded-xl transition-all hover:shadow-lg"
                style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: 'rgba(33, 32, 156, 0.1)', color: 'var(--dark-blue)' }}
                      >
                        {job.department}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: 'rgba(253, 184, 39, 0.2)', color: 'var(--dark-blue)' }}
                      >
                        {job.location}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: 'rgba(74, 74, 74, 0.1)', color: 'var(--dark-gray)' }}
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <button
                    className="mt-4 md:mt-0 px-6 py-2 rounded-lg font-semibold transition-transform hover:scale-105"
                    style={{ backgroundColor: 'var(--golden-yellow)', color: 'var(--dark-blue)' }}
                  >
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Process */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            style={{ color: 'var(--dark-blue)' }}
          >
            Our Hiring Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Apply', description: 'Submit your application and tell us why you\'re excited about VoiceUp' },
              { step: '02', title: 'Screen', description: 'Quick 20-minute call with our recruiting team to learn more about you' },
              { step: '03', title: 'Interviews', description: '2-3 interviews with team members, including technical or case challenges' },
              { step: '04', title: 'Offer', description: 'If it\'s a match, we\'ll extend an offer and welcome you to the team!' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  style={{ backgroundColor: 'var(--golden-yellow)', color: 'var(--dark-blue)' }}
                >
                  {phase.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--dark-blue)' }}>
                  {phase.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Diversity Statement */}
        <section className="mb-16">
          <div
            className="p-8 md:p-12 rounded-2xl"
            style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)', border: '1px solid rgba(33, 32, 156, 0.1)' }}
          >
            <h2
              className="text-3xl font-bold mb-6 text-center"
              style={{ color: 'var(--dark-blue)' }}
            >
              Diversity & Inclusion
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg text-center max-w-4xl mx-auto mb-4">
              VoiceUp Athletics is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees. We do not discriminate based on race, religion, color, national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg text-center max-w-4xl mx-auto">
              We strongly encourage applications from people of color, LGBTQ+ individuals, veterans, people with disabilities, and others who are underrepresented in tech and healthcare.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div
          className="p-10 rounded-2xl text-center"
          style={{ backgroundColor: 'rgba(253, 184, 39, 0.15)', border: '2px solid rgba(253, 184, 39, 0.4)' }}
        >
          <Briefcase className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--dark-blue)' }} />
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
            Don't See Your Role?
          </h2>
          <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
            We're always looking for talented people who are passionate about our mission. Send us your resume and tell us how you'd like to contribute.
          </p>
          <Link
            href="/company/contact"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            style={{ backgroundColor: 'var(--dark-blue)', color: 'white' }}
          >
            Get in Touch
          </Link>
        </div>

        {/* Related Links */}
        <div
          className="mt-12 p-6 rounded-xl"
          style={{ backgroundColor: 'rgba(33, 32, 156, 0.05)' }}
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--dark-blue)' }}>
            Learn More About Us
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/company/about" className="underline" style={{ color: 'var(--dark-blue)' }}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/company/mission" className="underline" style={{ color: 'var(--dark-blue)' }}>
                Our Mission
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

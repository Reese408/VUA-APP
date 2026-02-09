'use client';

import { Quote, Heart, Trophy, Star, TrendingUp, Users } from 'lucide-react';

export default function SuccessStoriesPage() {
    const athleteStories = [
        {
            sport: 'Basketball',
            university: 'Division I University',
            quote: "I was dealing with serious anxiety that was affecting my performance and my life. Being able to talk to someone anonymously made all the difference. I didn't have to worry about my coaches or teammates finding out. Now I'm playing my best basketball and feeling healthier mentally than ever.",
            impact: 'Improved performance and mental well-being',
            athlete: 'Anonymous Student-Athlete'
        },
        {
            sport: 'Swimming',
            university: 'State University',
            quote: "After a season-ending injury, I fell into depression. VoiceUp Athletics connected me with a counselor who understood the athlete experience. They helped me find purpose beyond swimming and taught me coping strategies I still use today.",
            impact: 'Successful recovery from depression',
            athlete: 'Anonymous Student-Athlete'
        },
        {
            sport: 'Soccer',
            university: 'Private College',
            quote: "The pressure to maintain my scholarship while performing at a high level was overwhelming. Through VoiceUp, I learned stress management techniques and built resilience. I graduated with honors and a clear mind.",
            impact: 'Better stress management and academic success',
            athlete: 'Anonymous Student-Athlete'
        },
        {
            sport: 'Track & Field',
            university: 'Large University',
            quote: "I struggled with eating disorders that no one knew about. The anonymity of VoiceUp gave me the courage to seek help. My counselor connected me with additional resources and supported me throughout recovery.",
            impact: 'Recovery from eating disorder',
            athlete: 'Anonymous Student-Athlete'
        },
        {
            sport: 'Football',
            university: 'Division I University',
            quote: "When my father passed away during the season, I didn't know how to cope. VoiceUp provided grief counseling that helped me process my loss while still supporting my team. I'm grateful I didn't have to go through it alone.",
            impact: 'Successful grief processing',
            athlete: 'Anonymous Student-Athlete'
        },
        {
            sport: 'Volleyball',
            university: 'Community College',
            quote: "Coming out as LGBTQ+ in a competitive athletic environment felt impossible. My VoiceUp counselor provided a safe space to explore my identity and gave me the confidence to be my authentic self.",
            impact: 'Increased self-acceptance and confidence',
            athlete: 'Anonymous Student-Athlete'
        }
    ];

    const universityTestimonials = [
        {
            role: 'Athletic Director',
            university: 'Stanford University',
            quote: "VoiceUp Athletics has transformed how we support our student-athletes' mental health. The anonymous platform removes barriers and the usage rates show our athletes trust the service. It's become an essential part of our athletic department.",
            results: '85% of athletes engaged within first semester'
        },
        {
            role: 'Head Coach',
            university: 'UCLA',
            quote: "I've seen the difference VoiceUp makes. Athletes are more open about mental health, and when they struggle, they know where to get help without fear of judgment. It's made our team culture healthier.",
            results: 'Improved team cohesion and performance'
        },
        {
            role: 'Sports Medicine Director',
            university: 'University of Michigan',
            quote: "The integration with our existing mental health services has been seamless. VoiceUp fills a critical gap by providing immediate, anonymous access to support when athletes need it most.",
            results: 'Reduced mental health crisis incidents'
        }
    ];

    const counselorInsights = [
        {
            name: 'Dr. Sarah Thompson',
            credentials: 'Licensed Clinical Psychologist',
            quote: "Working with VoiceUp allows me to reach student-athletes who might never walk into a traditional counseling office. The anonymity empowers them to be vulnerable and honest from the first session.",
            specialty: 'Sports Psychology'
        },
        {
            name: 'James Rodriguez, LMFT',
            credentials: 'Licensed Marriage & Family Therapist',
            quote: "I've worked in college counseling for 15 years, and VoiceUp is the most effective platform I've used for engaging student-athletes. The interface makes it easy to provide quality care remotely.",
            specialty: 'Performance Anxiety'
        }
    ];

    const impactStats = [
        { number: '94%', label: 'Report Improved Mental Health' },
        { number: '89%', label: 'Would Recommend to Teammates' },
        { number: '4.8/5', label: 'Average Satisfaction Rating' },
        { number: '10K+', label: 'Lives Impacted' }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Success Stories
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
                        Real stories from student-athletes, universities, and counselors who have experienced
                        the transformative impact of mental health support.
                    </p>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'white' }}>
                            Our Impact by the Numbers
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {impactStats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-5xl font-bold mb-2" style={{ color: 'var(--golden-yellow)' }}>
                                        {stat.number}
                                    </div>
                                    <p className="text-lg" style={{ color: 'white' }}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Athlete Stories */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Heart className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Student-Athlete Stories
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Hear from athletes whose lives have been transformed by mental health support
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {athleteStories.map((story, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <Quote className="h-10 w-10 mb-4" style={{ color: 'var(--golden-yellow)' }} />
                                <div className="flex gap-2 mb-4">
                                    <span
                                        className="px-3 py-1 rounded-full text-sm font-semibold"
                                        style={{
                                            backgroundColor: 'rgba(30, 58, 138, 0.1)',
                                            color: 'var(--dark-blue)'
                                        }}
                                    >
                                        {story.sport}
                                    </span>
                                    <span
                                        className="px-3 py-1 rounded-full text-sm"
                                        style={{
                                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                                            color: 'var(--dark-blue)'
                                        }}
                                    >
                                        {story.university}
                                    </span>
                                </div>
                                <p className="text-lg mb-6 italic" style={{ color: 'var(--dark-gray)' }}>
                                    "{story.quote}"
                                </p>
                                <div className="pt-4 border-t" style={{ borderColor: 'rgba(30, 58, 138, 0.1)' }}>
                                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--dark-blue)' }}>
                                        Impact: {story.impact}
                                    </p>
                                    <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                        — {story.athlete}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* University Testimonials */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Trophy className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            University Partners
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            What athletic departments are saying about VoiceUp Athletics
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {universityTestimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: 'var(--golden-yellow)' }}
                                    >
                                        <Users className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                    </div>
                                    <div>
                                        <p className="font-bold" style={{ color: 'var(--dark-blue)' }}>
                                            {testimonial.role}
                                        </p>
                                        <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                            {testimonial.university}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base mb-4 italic" style={{ color: 'var(--dark-gray)' }}>
                                    "{testimonial.quote}"
                                </p>
                                <div
                                    className="p-3 rounded-lg"
                                    style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                                >
                                    <p className="text-sm font-semibold" style={{ color: 'var(--dark-blue)' }}>
                                        Results: {testimonial.results}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Counselor Insights */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Star className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Counselor Perspectives
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Mental health professionals share their experiences
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {counselorInsights.map((insight, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--dark-blue)' }}>
                                        {insight.name}
                                    </h3>
                                    <p className="text-sm mb-2" style={{ color: 'var(--dark-gray)' }}>
                                        {insight.credentials}
                                    </p>
                                    <span
                                        className="px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{
                                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                                            color: 'var(--dark-blue)'
                                        }}
                                    >
                                        {insight.specialty}
                                    </span>
                                </div>
                                <Quote className="h-8 w-8 mb-3" style={{ color: 'var(--golden-yellow)' }} />
                                <p className="text-base italic" style={{ color: 'var(--dark-gray)' }}>
                                    "{insight.quote}"
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
                            Start Your Success Story
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Join thousands of student-athletes who have prioritized their mental health.
                            Your journey to wellness starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/login"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
                                style={{
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white'
                                }}
                            >
                                Get Started Today
                            </a>
                            <a
                                href="/university/request-access"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                                style={{
                                    borderColor: 'var(--dark-blue)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                For Universities
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

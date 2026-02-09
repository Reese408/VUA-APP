'use client';

import { BarChart3, Brain, TrendingUp, FileText, Users, AlertTriangle, Target, BookOpen } from 'lucide-react';

export default function ResearchInsightsPage() {
    const keyFindings = [
        {
            stat: '35%',
            finding: 'of student-athletes experience anxiety or depression',
            source: 'NCAA Mental Health Best Practices, 2023'
        },
        {
            stat: '25%',
            finding: 'report feeling overwhelming anxiety',
            source: 'American College Health Association, 2024'
        },
        {
            stat: '70%',
            finding: 'say fear of judgment prevents them from seeking help',
            source: 'Journal of Athletic Training, 2023'
        },
        {
            stat: '50%',
            finding: 'of athletes with mental health issues never receive treatment',
            source: 'Sports Medicine Research, 2024'
        }
    ];

    const researchAreas = [
        {
            icon: Brain,
            title: 'Mental Health Prevalence',
            findings: [
                'Student-athletes experience mental health issues at similar or higher rates than non-athletes',
                'Depression rates among collegiate athletes range from 15-21%',
                'Anxiety disorders affect approximately 23% of student-athletes',
                'Performance pressure significantly increases psychological distress'
            ]
        },
        {
            icon: AlertTriangle,
            title: 'Barriers to Care',
            findings: [
                'Stigma remains the primary barrier to seeking mental health support',
                'Fear of appearing weak or losing playing time deters help-seeking',
                'Limited awareness of available resources',
                'Concerns about confidentiality and privacy',
                'Time constraints due to athletic and academic demands'
            ]
        },
        {
            icon: Target,
            title: 'Effective Interventions',
            findings: [
                'Anonymous platforms increase help-seeking behavior by 40%',
                'Sports psychology interventions improve both performance and well-being',
                'Early intervention reduces severity of mental health symptoms',
                'Peer support programs enhance treatment engagement',
                'Integrated care models show best outcomes'
            ]
        },
        {
            icon: TrendingUp,
            title: 'Impact on Performance',
            findings: [
                'Mental health treatment correlates with improved athletic performance',
                'Addressing anxiety reduces injury risk by up to 30%',
                'Depression treatment improves focus and decision-making',
                'Better mental health leads to enhanced team cohesion',
                'Recovery from mental health issues strengthens resilience'
            ]
        }
    ];

    const recentStudies = [
        {
            title: 'The Impact of Anonymous Mental Health Services on Student-Athlete Help-Seeking Behavior',
            journal: 'Journal of College Student Mental Health',
            year: '2024',
            summary: 'Study finds that anonymous mental health platforms increase help-seeking by 43% among student-athletes compared to traditional counseling services.',
            category: 'Access & Utilization'
        },
        {
            title: 'Mental Health Stigma in Collegiate Athletics: A Longitudinal Study',
            journal: 'Sport Psychology Review',
            year: '2024',
            summary: 'Five-year study reveals persistent stigma around mental health in athletic culture, with significant gender and sport-specific differences.',
            category: 'Stigma & Culture'
        },
        {
            title: 'Performance Anxiety and Academic Success in Division I Athletes',
            journal: 'Athletic Training & Sports Medicine',
            year: '2023',
            summary: 'Research demonstrates strong correlation between untreated performance anxiety and academic underperformance in student-athletes.',
            category: 'Performance & Academics'
        },
        {
            title: 'Effectiveness of Digital Mental Health Interventions for Athletes',
            journal: 'Clinical Sport Psychology',
            year: '2023',
            summary: 'Meta-analysis of 45 studies shows digital mental health interventions are as effective as in-person therapy for athlete populations.',
            category: 'Treatment Efficacy'
        },
        {
            title: 'The Role of Coaches in Student-Athlete Mental Health',
            journal: 'Coaching Science Journal',
            year: '2024',
            summary: 'Study highlights the critical influence of coaching staff on creating mentally healthy athletic environments and reducing stigma.',
            category: 'Prevention & Support'
        },
        {
            title: 'Injury Recovery and Mental Health in Collegiate Athletes',
            journal: 'Sports Medicine',
            year: '2023',
            summary: 'Research shows that psychological support during injury recovery reduces depression risk by 60% and improves return-to-play outcomes.',
            category: 'Injury & Recovery'
        }
    ];

    const whitePapers = [
        {
            title: 'Best Practices for Implementing Mental Health Services in Athletic Departments',
            description: 'Comprehensive guide for universities on building effective mental health support systems for student-athletes.',
            pages: '42 pages'
        },
        {
            title: 'The State of Student-Athlete Mental Health: 2024 Report',
            description: 'Annual report analyzing trends, challenges, and progress in collegiate athlete mental health.',
            pages: '68 pages'
        },
        {
            title: 'Anonymity and Mental Health: Removing Barriers to Care',
            description: 'Evidence-based analysis of how anonymous platforms improve mental health access for athletes.',
            pages: '28 pages'
        }
    ];

    const industryInsights = [
        {
            title: 'NCAA Mandates Mental Health Resources',
            date: '2024',
            insight: 'NCAA now requires all member institutions to provide dedicated mental health services for student-athletes, recognizing the unique mental health needs of this population.'
        },
        {
            title: 'Rise of Digital Mental Health Platforms',
            date: '2023-2024',
            insight: 'Universities increasingly adopt digital platforms to supplement traditional counseling, with usage rates increasing 200% over two years.'
        },
        {
            title: 'Athlete Mental Health Advocacy Movement',
            date: 'Ongoing',
            insight: 'High-profile athletes speaking openly about mental health has significantly reduced stigma and increased help-seeking behavior among collegiate athletes.'
        }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#fafafa' }}>
            {/* Header Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--dark-blue)' }}>
                        Research & Insights
                    </h1>
                    <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--dark-gray)' }}>
                        Evidence-based insights on mental health in collegiate athletics. Stay informed
                        with the latest research, statistics, and industry trends.
                    </p>
                </div>
            </section>

            {/* Key Statistics */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div
                        className="p-12 rounded-2xl"
                        style={{
                            background: 'linear-gradient(135deg, var(--dark-blue) 0%, rgba(33, 32, 156, 0.9) 100%)'
                        }}
                    >
                        <div className="text-center mb-10">
                            <BarChart3 className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                            <h2 className="text-4xl font-bold mb-4" style={{ color: 'white' }}>
                                Key Statistics
                            </h2>
                            <p className="text-xl" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                                The data behind student-athlete mental health
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {keyFindings.map((item, index) => (
                                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl">
                                    <div className="text-6xl font-bold mb-4" style={{ color: 'var(--golden-yellow)' }}>
                                        {item.stat}
                                    </div>
                                    <p className="text-xl mb-4 font-semibold" style={{ color: 'white' }}>
                                        {item.finding}
                                    </p>
                                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                        Source: {item.source}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Areas */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--dark-blue)' }}>
                        Research Areas
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {researchAreas.map((area, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <area.icon className="h-8 w-8" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                                    {area.title}
                                </h3>
                                <ul className="space-y-3">
                                    {area.findings.map((finding, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--golden-yellow)' }}></span>
                                            <span style={{ color: 'var(--dark-gray)' }}>{finding}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Studies */}
            <section className="py-16 px-6" style={{ backgroundColor: 'rgba(30, 58, 138, 0.03)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Recent Studies
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Latest peer-reviewed research on student-athlete mental health
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentStudies.map((study, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3"
                                    style={{
                                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                                        color: 'var(--dark-blue)'
                                    }}
                                >
                                    {study.category}
                                </span>
                                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--dark-blue)' }}>
                                    {study.title}
                                </h3>
                                <p className="text-sm mb-3" style={{ color: 'var(--dark-gray)' }}>
                                    <em>{study.journal}</em> ({study.year})
                                </p>
                                <p className="text-sm" style={{ color: 'var(--dark-gray)' }}>
                                    {study.summary}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* White Papers */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <BookOpen className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            White Papers & Reports
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            In-depth analysis and comprehensive guides
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {whitePapers.map((paper, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                    style={{ backgroundColor: 'var(--golden-yellow)' }}
                                >
                                    <FileText className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--dark-blue)' }}>
                                    {paper.title}
                                </h3>
                                <p className="text-sm mb-4" style={{ color: 'var(--dark-gray)' }}>
                                    {paper.description}
                                </p>
                                <p className="text-sm font-semibold" style={{ color: 'var(--golden-yellow)' }}>
                                    {paper.pages}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industry Insights */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <Users className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Industry Trends & Insights
                        </h2>
                        <p className="text-xl" style={{ color: 'var(--dark-gray)' }}>
                            Key developments shaping the future of athlete mental health
                        </p>
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {industryInsights.map((insight, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}
                                    >
                                        <TrendingUp className="h-6 w-6" style={{ color: 'var(--dark-blue)' }} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold" style={{ color: 'var(--dark-blue)' }}>
                                                {insight.title}
                                            </h3>
                                            <span
                                                className="px-3 py-1 rounded-full text-xs font-semibold"
                                                style={{
                                                    backgroundColor: 'rgba(30, 58, 138, 0.1)',
                                                    color: 'var(--dark-blue)'
                                                }}
                                            >
                                                {insight.date}
                                            </span>
                                        </div>
                                        <p style={{ color: 'var(--dark-gray)' }}>
                                            {insight.insight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <Brain className="h-16 w-16 mx-auto mb-6" style={{ color: 'var(--golden-yellow)' }} />
                        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--dark-blue)' }}>
                            Partner with Us on Research
                        </h2>
                        <p className="text-xl mb-8" style={{ color: 'var(--dark-gray)' }}>
                            Interested in collaborating on mental health research? We partner with universities
                            and research institutions to advance the field.
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
                                Contact Research Team
                            </a>
                            <a
                                href="/company/partners"
                                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105 border-2"
                                style={{
                                    borderColor: 'var(--dark-blue)',
                                    color: 'var(--dark-blue)'
                                }}
                            >
                                Partnership Opportunities
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

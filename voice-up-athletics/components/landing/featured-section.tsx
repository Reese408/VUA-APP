'use client';

import { motion } from "motion/react";
import { Lock, UserCheck, Building2, Users, CheckCircle2 } from "lucide-react";

const features = [
    {
        icon: Lock,
        title: "Complete Anonymity",
        description: "Athletes use company-provided user IDs instead of names. Only the platform administrator has access to the secure identity mapping.",
        benefits: [
            "End-to-end encrypted communications",
            "HIPAA-compliant data storage",
            "No personally identifiable information in requests"
        ]
    },
    {
        icon: UserCheck,
        title: "Reduce Stigma",
        description: "Athletes feel safe reaching out for help without fear of judgment from teammates, coaches, or the athletic department.",
        benefits: [
            "Low-barrier access to mental health support",
            "Private request submission",
            "Confidential appointment coordination"
        ]
    },
    {
        icon: Building2,
        title: "Flexible Team Options",
        description: "Subscribe individual teams or get full-university access covering all athletic programs.",
        benefits: [
            "Per-team subscription options",
            "University-wide access packages",
            "Custom deployment for any number of teams"
        ]
    },
    {
        icon: Users,
        title: "Counselor Dashboard",
        description: "School counselors receive and manage anonymous requests through a dedicated, secure interface.",
        benefits: [
            "Centralized request management",
            "Secure messaging with athletes",
            "Appointment scheduling tools"
        ]
    },
];

export default function FeaturedSection(){
    return(
        <section id='features' className="py-24 lg:py-32" style={{backgroundColor: 'var(--dark-blue)'}}>
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4" style={{color: 'var(--golden-yellow)'}}>
                        Built for Universities
                    </h2>
                    <p className="text-xl" style={{color: 'var(--golden-yellow)'}}>
                        Flexible solutions that scale with your athletic programs
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-8 rounded-xl border-2 hover:shadow-lg transition-all hover:border-[var(--golden-yellow)]"
                                style={{
                                    backgroundColor: 'var(--light-gray)',
                                    borderColor: 'var(--dark-blue)'
                                }}
                            >
                                <Icon className="w-12 h-12 mb-4" style={{color: 'var(--golden-yellow)'}} />
                                <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--dark-blue)'}}>
                                    {feature.title}
                                </h3>
                                <p className="mb-4" style={{color: 'var(--dark-gray)'}}>
                                    {feature.description}
                                </p>
                                <ul className="space-y-2">
                                    {feature.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color: 'var(--golden-yellow)'}} />
                                            <span className="text-sm" style={{color: 'var(--dark-gray)'}}>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
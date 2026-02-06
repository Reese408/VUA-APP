'use client';

import { motion } from "motion/react";
import { UserPlus, Compass, TrendingUp, Award } from "lucide-react";
import { IMAGES } from "@/config/s3";

const steps = [
    {
        step: "01",
        icon: UserPlus,
        image: IMAGES.loginImage,
        title: "Login to Your Account",
        description: "Once your university has registered you, access the platform using your student credentials. Your privacy is our priority; all data is kept confidential."
    },
    {
       step:"02",
       icon: Compass,
       image: IMAGES.dashboardCapture,
       title: "Explore Your Dashboard",
       description: "View your personal dashboard with your anonymous ID, access past conversations with university resources, and track all your interactions in one secure place."
    },
    {
       step:"03",
       icon: TrendingUp,
       image: IMAGES.supportRequestCapture,
       title: "Submit a Support Request",
       description: "Fill out a confidential form to reach out to university resources. Share your concerns in a safe and anonymous way through our secure submission system."
    },
    {
       step:"04",
       icon: Award,
       image: IMAGES.resourcesCapture,
       title: "Browse Available Resources",
       description: "Explore the resources page to discover additional methods of help and support provided by your university, all tailored to student athlete needs."
    },
    {
       step:"05",
       icon: UserPlus,
       image: IMAGES.chatImage,
       title: "Receive Professional Response",
       description: "University officials review your ticket and respond with guidance, resources, or counseling options tailored to your specific situation."
    },
    {
       step:"06",
       icon: Compass,
       image: IMAGES.escalationImage,
       title: "Escalation When Needed",
       description: "For serious matters requiring immediate attention, university officials will coordinate with Athletic Directors or administrators to ensure you receive comprehensive support."
    }
];

export default function HowItWorksSection(){
    return(
        <section id='how-it-works' className="py-24 lg:py-32" style={{backgroundColor: 'white'}}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{color: 'var(--dark-blue)'}}>
                        How It Works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{color: 'var(--dark-blue)'}}>
                        Start building mental strength in minutes
                    </h2>
                    <p className="text-xl leading-relaxed mb-2" style={{color: 'var(--dark-gray)'}}>
                        Getting started is simple. We&apos;ve designed the onboarding to respect your time.
                    </p>
                    <p className="text-sm font-medium" style={{color: 'var(--golden-yellow)'}}>
                        ← Scroll to explore all steps →
                    </p>
                </motion.div>
                
                {/* Steps - Horizontal Scrollable */}
                <div className="relative -mx-6 px-6">
                    <div
                        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex-shrink-0 w-[340px] md:w-[400px] snap-center"
                                >
                                    <div className="rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border-2 h-full flex flex-col hover:scale-105 hover:border-[var(--golden-yellow)]" style={{backgroundColor: 'var(--light-gray)', borderColor: 'var(--dark-blue)'}}>
                                        {/* Image */}
                                        <div className="w-full h-56 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden flex items-center justify-center relative">
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                            {/* Step number overlay on image */}
                                            <div className="absolute top-4 right-4 text-4xl font-bold px-4 py-2 rounded-xl backdrop-blur-sm" style={{backgroundColor: 'rgba(255, 193, 7, 0.9)', color: 'var(--dark-blue)'}}>
                                                {step.step}
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--dark-blue)'}}>
                                                {step.title}
                                            </h3>

                                            <p className="leading-relaxed text-sm flex-1" style={{color: 'var(--dark-gray)'}}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Scroll indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {steps.map((_, index) => (
                            <div
                                key={index}
                                className="w-2 h-2 rounded-full transition-all"
                                style={{backgroundColor: 'var(--golden-yellow)', opacity: 0.3}}
                            />
                        ))}
                    </div>
                </div>
                </div>
        </section>
    );
}
'use client';

import { motion } from "motion/react";
import StatCards from "../landing/stat-cards";
import { AlertTriangle, TrendingDown, Clock, Users } from "lucide-react";

const stats: { number: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { number: "33%", label: "of college athletes experience anxiety", icon: AlertTriangle },
    { number: "24%", label: "report symptoms of depression", icon: TrendingDown },
    { number: "6hrs", label: "average daily time commitment to sports", icon: Clock },
    { number: "1 in 3", label: "feel isolated from non-athlete peers", icon: Users }
];

//this component will be focuesed on showing challenges that athletes face and the stats behind them and then a relational quote or statement to connect with the user
export default function ChallengeSection(){
    return(
        <section id="challenge" className='w-full py-20 px-4' style={{backgroundColor: 'var(--light-gray)'}}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-lg font-semibold mb-2" style={{color: 'var(--dark-blue)'}}>The Challenge</h2>
                    <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--dark-blue)'}}>Student Athletes are facing a mental health crisis</h1>
                    <p className="text-lg max-w-2xl mx-auto" style={{color: 'var(--dark-gray)'}}>Student athletes often struggle with balancing academic responsibilities, training schedules, and personal well-being, leading to increased stress and mental health issues.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {stats.map((stat, index) => (
                        <StatCards key={index} number={stat.number} label={stat.label} icon={stat.icon} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
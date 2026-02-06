'use client';

import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How does VoiceUp Athletics protect student athlete anonymity?",
        answer: "Athletes are assigned company-provided anonymous IDs instead of using their names. All communications are end-to-end encrypted, and only the platform administrator has access to the secure identity mapping. We use HIPAA-compliant data storage to ensure your privacy is always protected."
    },
    {
        question: "What happens after I submit a support request?",
        answer: "Once you submit a request, university officials receive and review your ticket through their secure dashboard. They will respond with guidance, resources, or counseling options tailored to your specific situation. For serious matters requiring immediate attention, they can coordinate with Athletic Directors or administrators to ensure comprehensive support."
    },
    {
        question: "Can my coaches or teammates see my requests?",
        answer: "No. Your requests are completely confidential and only visible to authorized university mental health professionals and administrators. Your teammates, coaches, and other staff cannot access your information without proper authorization."
    },
    {
        question: "Is VoiceUp Athletics available for my university?",
        answer: "We offer flexible subscription options for universities, including per-team subscriptions and university-wide access packages covering all athletic programs. Contact us to discuss custom deployment options for your institution."
    },
    {
        question: "What kind of resources are available on the platform?",
        answer: "The platform provides access to university-provided mental health resources, counseling services, crisis support information, and educational materials tailored specifically for student athletes. You can also view past conversations and track your interactions in one secure place."
    },
    {
        question: "How quickly will I receive a response to my request?",
        answer: "Response times vary depending on the severity of the situation and your university's staffing. Urgent matters are prioritized and may be escalated to ensure you receive timely support. Your university's mental health team monitors requests regularly to provide prompt assistance."
    }
];

export default function QuestionAnswerSection(){
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return(
        <section id='faq' className="py-24 lg:py-32" style={{backgroundColor: "var(--light-gray)"}}>
            <div className="max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-semibold text-sm tracking-wide uppercase mb-4 block" style={{color: 'var(--golden-yellow)'}}>
                        FAQ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{color: 'var(--dark-blue)'}}>
                        Questions? We&apos;ve got answers
                    </h2>
                    <p className="text-xl" style={{color: 'var(--dark-gray)'}}>
                        Everything you need to know about VoiceUp Athletics
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div
                                className="rounded-xl border-2 overflow-hidden transition-all cursor-pointer"
                                style={{
                                    backgroundColor: openIndex === index ? 'var(--light-gray)' : 'white',
                                    borderColor: openIndex === index ? 'var(--golden-yellow)' : 'var(--dark-blue)'
                                }}
                                onClick={() => toggleFAQ(index)}
                            >
                                {/* Question */}
                                <div className="p-6 flex items-center justify-between gap-4">
                                    <h3 className="text-lg font-semibold flex-1" style={{color: 'var(--dark-blue)'}}>
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                        style={{color: openIndex === index ? 'var(--golden-yellow)' : 'var(--dark-blue)'}}
                                    />
                                </div>

                                {/* Answer */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openIndex === index ? 'auto' : 0,
                                        opacity: openIndex === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-6 pt-0">
                                        <p className="leading-relaxed" style={{color: 'var(--dark-gray)'}}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center p-8 rounded-2xl"
                    style={{backgroundColor: 'var(--light-gray)'}}
                >
                    <h3 className="text-2xl font-semibold mb-3" style={{color: 'var(--dark-blue)'}}>
                        Still have questions?
                    </h3>
                    <p className="mb-6" style={{color: 'var(--dark-gray)'}}>
                        Can&apos;t find the answer you&apos;re looking for? Please reach out to our team.
                    </p>
                    <button
                        type="button"
                        className="px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105"
                        style={{
                            backgroundColor: 'var(--golden-yellow)',
                            color: 'var(--dark-blue)'
                        }}
                    >
                        Contact Us
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
'use client';

import { Card } from "../ui/card";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
    number?: string;
    label?: string;
    title?: string;
    description?: string;
    icon: React.ComponentType<{ className?: string }>;
    isAlternate?: boolean;
}

export default function StatCards({ number, label, title, description, icon: Icon, isAlternate }: StatCardProps) {
    // For stat cards (number + label)
    if (number && label) {
        return(
            <Card className="rounded-2xl p-8 border-none transition-all hover:shadow-xl hover:scale-105" style={{backgroundColor: 'rgba(255, 193, 7, 0.15)', backdropFilter: 'blur(10px)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{backgroundColor: 'var(--golden-yellow)', color: 'var(--dark-blue)'}}>
                    <Icon className="h-6 w-6" />
                </div>
                <p className="text-4xl font-bold mb-2" style={{color: 'var(--dark-blue)'}}>{number}</p>
                <p className="text-sm leading-relaxed" style={{color: 'var(--dark-gray)'}}>{label}</p>
            </Card>
        );
    }

    // For feature cards (title + description)
    return (
        <Card className="group relative p-8 rounded-2xl border-2 h-full hover:shadow-lg transition-all duration-300 cursor-pointer"
            style={{
                backgroundColor: isAlternate ? 'var(--golden-yellow)' : 'var(--light-gray)',
                borderColor: 'var(--dark-blue)'
            }}
        >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                style={{
                    backgroundColor: isAlternate ? 'var(--dark-blue)' : 'var(--golden-yellow)',
                    color: isAlternate ? 'var(--golden-yellow)' : 'var(--dark-blue)'
                }}
            >
                <Icon className="h-7 w-7" />
            </div>
            
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{color: 'var(--dark-blue)'}}>
                {title}
                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" style={{color: 'var(--dark-blue)'}} />
            </h3>
            
            <p className="leading-relaxed" style={{color: 'var(--dark-gray)'}}>
                {description}
            </p>
        </Card>
    );
}

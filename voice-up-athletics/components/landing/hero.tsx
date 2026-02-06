'use client';

import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/config/s3";

export default function Hero(){
    return(
        <section id='hero' className="py-20 px-6">
        <div className="flex justify-center">
            <div className="inline-block px-3 py-1 rounded-full mb-12" style={{backgroundColor: 'rgba(253, 184, 39, 0.2)'}}>
                <span className="text-sm" style={{color: 'var(--gray)'}}>100% Anonymous & Confidential</span>
            </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-secondary rounded-full mb-6">
                <span className="text-sm">For College Athletes</span>
              </div>
              <h1 className="text-5xl mb-6">
                Your Mental Game Matters
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
               Empowering atheletes to prioritize mental health and unlock their full potential both on and off the field.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Your Journey
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  For Universities
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden">
                <img
                  src={IMAGES.hero}
                  alt="College athletes"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
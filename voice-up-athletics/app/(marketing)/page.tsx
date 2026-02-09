import ChallengeSection from "@/components/landing/challenge-section";
import QuestionAnswerSection from "@/components/landing/FAQ";
import FeaturedSection from "@/components/landing/featured-section";
import Hero from "@/components/landing/hero";
import HowItWorksSection from "@/components/landing/HowItWorks-section";
import PricingSection from "@/components/landing/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans">
      <Hero />
      <ChallengeSection />
      <FeaturedSection />
      <HowItWorksSection />
      <QuestionAnswerSection />
      <PricingSection />
    </div>
  );
}

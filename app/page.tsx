import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { StatsSection } from '@/components/home/StatsSection';
import Faq02 from '@/components/kokonutui/faq-02';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { NFTShowcase } from '@/components/home/NFTShowcase';

export default function Home() {
  return (
    <div className="space-y-1 pb-24">
      <ScrollReveal>
        <div className="mb-[220px]">
          <HeroSection />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <HowItWorks />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <StatsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <FeaturedCourses />
      </ScrollReveal>

      {/* <ScrollReveal delay={0.1}>
        <NFTShowcase />
      </ScrollReveal> */}

      <ScrollReveal delay={0.1}>
        <Faq02 />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <NewsletterSection />
      </ScrollReveal>
    </div>
  );
}
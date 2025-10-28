import { ScrollReveal } from '@/components/animation/ScrollReveal';
import { CommunityHighlights } from '@/components/home/CommunityHighlights';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { FeaturedQuestions } from '@/components/home/FeaturedQuestions';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { StatsSection } from '@/components/home/StatsSection';
import { TopContributors } from '@/components/home/TopContributors';
import { TrendingTags } from '@/components/home/TrendingTags';
import { WelcomeBanner } from '@/components/home/WelcomeBanner';
import { NotificationCard } from '@/components/ui/notification-card';
import GridMotion from '@/components/home/GridMotion';
import { Award } from 'lucide-react';
import Faq02 from '@/components/kokonutui/faq-02';

export default function Home() {
  // Sample images for the grid motion component
  const questionImages = [
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1623479322729-28b25c16b011?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  return (
    <div className="space-y-1 pb-24">
      <WelcomeBanner />

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
        <CommunityHighlights />
      </ScrollReveal>


      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <ScrollReveal delay={0.1}>
          <FeaturedQuestions />
        </ScrollReveal>

        <div className="space-y-8">
          <TopContributors />
          <TrendingTags />
        </div>
      </div>
      <ScrollReveal delay={0.1}>
        <Faq02 />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <NewsletterSection />
      </ScrollReveal>

    </div>
  );
}
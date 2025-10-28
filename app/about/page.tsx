import { AboutHero } from '@/components/about/AboutHero'
import { OurMission } from '@/components/about/OurMission'
import { TeamSection } from '@/components/about/TeamSection'
import { TechnologyStack } from '@/components/about/TechnologyStack'
import { CommunityValues } from '@/components/about/CommunityValues'
import { ContactSection } from '@/components/about/ContactSection'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'

export default function AboutPage() {
  return (
    <div className="space-y-24 pb-24">
      <AboutHero />
      <OurMission />
      <CommunityValues />
      <TeamSection />
    
      <ContactSection />
    </div>
  )
}
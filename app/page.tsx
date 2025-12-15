import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CtaBanner } from "@/components/cta-banner"
import { SupportedLivingSection } from "@/components/supported-living-section"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"

import { HomeSeo } from "@/components/home-seo"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Elegant Care Service | NDIS Disability Service Provider',
  description: 'Professional NDIS disability support services. We provide supported independent living, respite support, community participation, and personalized care services.',
  keywords: 'NDIS provider, disability support, supported independent living, respite care, community participation'
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeSeo />
      <TopBar />
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <CtaBanner />
      <SupportedLivingSection />
      <TeamSection />
      <Footer />
    </main>
  )
}

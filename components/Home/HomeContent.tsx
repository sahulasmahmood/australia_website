"use client"

import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CtaBanner } from "@/components/cta-banner"
import { SupportedLivingSection } from "@/components/supported-living-section"
import { TeamSection } from "@/components/team-section"

export function HomeContent() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <CtaBanner />
      <SupportedLivingSection />
      <TeamSection />
    </>
  )
}

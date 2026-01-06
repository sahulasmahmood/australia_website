"use client"

import { DynamicHeroSection } from "@/components/Home/DynamicHeroSection"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { SupportedLivingSection } from "@/components/supported-living-section"
import { TeamSection } from "@/components/team-section"
import { Testimonial } from "@/components/clean-testimonial"

export function HomeContent() {
  return (
    <>
      <DynamicHeroSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseUsSection />
      <SupportedLivingSection />
      <TeamSection />
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="text-secondary">WHAT OUR</span> <span className="text-primary">CLIENTS SAY</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6" />
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4 sm:px-0">
              Hear from the families and individuals we've had the privilege to support
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  )
}

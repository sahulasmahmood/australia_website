"use client"

import { Button } from "@/components/ui/button"
import { useSettings } from "@/hooks/use-settings"
import Image from "next/image"

export function AboutSection() {
  const { settings } = useSettings()
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative flex items-center justify-center">
              {settings?.logo ? (
                <Image
                  src={settings.logo}
                  alt={settings.siteName || "Elegant Care Service"}
                  width={320}
                  height={384}
                  className="w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-96 object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/placeholder-logo.png"
                  alt="Elegant Care Service Logo"
                  width={320}
                  height={384}
                  className="w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-96 object-contain"
                  priority
                />
              )}
            </div>
          </div>

          <div className="bg-light-gray p-6 sm:p-8 md:p-10 lg:p-12 rounded-sm order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              <span className="text-secondary">PROFESSIONAL SUPPORT,</span>
              <br />
              <span className="text-primary">PERSONAL COMFORT...</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base text-justify">
              <p>
                At <strong className="text-secondary">Elegant Care Service</strong>, we believe that everyone deserves to
                live a life filled with dignity, independence, and joy. Our dedicated team of experienced professionals
                is committed to providing{" "}
                <strong className="text-primary">exceptional disability support services</strong> tailored to your
                unique needs.
              </p>
              <p>
                We understand that each individual's journey is different, which is why we take a{" "}
                <strong className="text-secondary">person-centered approach</strong> to care. Whether you need
                assistance with daily living, community participation, or specialized support, we're here to help you
                achieve your goals.
              </p>
              <p className="hidden sm:block">
                Our services are designed to empower you to make your own choices, pursue your interests, and connect
                with your community in meaningful ways.
              </p>
            </div>

            <Button className="mt-6 sm:mt-8 w-full sm:w-auto bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 sm:px-8" asChild>
              <a href="/about">READ MORE</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

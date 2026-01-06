"use client"

import { Logo } from "@/components/logo"
import { CheckCircle, Check } from "lucide-react"
import Image from "next/image"

export function AboutContent() {
  const values = [
    { title: "Respect", description: "We treat every individual with dignity and respect their choices." },
    { title: "Integrity", description: "We operate with honesty and transparency in all our services." },
    { title: "Excellence", description: "We strive for the highest quality in everything we do." },
    { title: "Compassion", description: "We provide care with empathy and understanding." },
    { title: "Empowerment", description: "We support individuals to achieve their goals and independence." },
    { title: "Inclusion", description: "We embrace diversity and create welcoming environments for all." },
  ]

  return (
    <>
      {/* Our Story Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-48 sm:w-64 md:w-80">
                <Logo />
              </div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="text-secondary">OUR </span>
                <span className="text-primary">STORY</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Elegant Care Service was founded with a simple yet powerful vision: to provide
                <strong className="text-secondary"> person-centered disability support services</strong> that truly make
                a difference in people's lives.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                As a registered NDIS service provider, we understand that each individual has unique needs, goals, and
                aspirations. Our team of dedicated professionals works tirelessly to ensure that every participant
                receives the support they need to live their best life.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                We have extended our services across Adelaide, Adelaide Hills, Mount Barker, Riverland region, Renmark,
                Mildura, and Murray region, bringing quality disability support to communities throughout South
                Australia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-12 sm:py-16 md:py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="text-secondary">OUR </span>
                <span className="text-primary">MISSION</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Our mission is to <strong className="text-secondary">empower individuals with disabilities</strong> to
                live fulfilling, independent lives by providing tailored support services that respect their choices and
                promote their wellbeing.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 text-justify">
                We believe that everyone deserves access to quality support that enables them to participate fully in
                their community and achieve their personal goals.
              </p>
              <ul className="space-y-3">
                {[
                  "Person-centered approach",
                  "Flexible support options",
                  "Community integration",
                  "Continuous improvement",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <div className="mt-0.5 p-1 bg-primary rounded-full flex-shrink-0">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/people-helping-community-care.jpg"
                alt="People helping in community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-secondary">OUR </span>
              <span className="text-primary">VALUES</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do and shape how we deliver our services.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-light-gray p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-secondary mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

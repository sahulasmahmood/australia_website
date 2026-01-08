"use client"

import { Logo } from "@/components/logo"
import { CheckCircle, Check, HeartHandshake, Scale, Award, Heart, Lightbulb, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function AboutContent() {
  const values = [
    { 
      title: "Respect", 
      description: "We treat every individual with dignity and respect their choices.",
      icon: <HeartHandshake className="h-6 w-6" />
    },
    { 
      title: "Integrity", 
      description: "We operate with honesty and transparency in all our services.",
      icon: <Scale className="h-6 w-6" />
    },
    { 
      title: "Excellence", 
      description: "We strive for the highest quality in everything we do.",
      icon: <Award className="h-6 w-6" />
    },
    { 
      title: "Compassion", 
      description: "We provide care with empathy and understanding.",
      icon: <Heart className="h-6 w-6" />
    },
    { 
      title: "Empowerment", 
      description: "We support individuals to achieve their goals and independence.",
      icon: <Lightbulb className="h-6 w-6" />
    },
    { 
      title: "Inclusion", 
      description: "We embrace diversity and create welcoming environments for all.",
      icon: <Users className="h-6 w-6" />
    },
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
                <span className="text-[#1E3A5F]">OUR </span>
                <span className="text-[#8CC63F]">STORY</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Elegant Care Services was founded with a simple yet powerful vision: to provide
                <strong className="text-[#1E3A5F]"> person-centered disability support services</strong> that truly make
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
      <section id="mission" className="py-12 sm:py-16 md:py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="text-[#1E3A5F]">OUR </span>
                <span className="text-[#8CC63F]">MISSION</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Our mission is to <strong className="text-[#1E3A5F]">empower individuals with disabilities</strong> to
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
                    <div className="mt-0.5 p-1 bg-[#8CC63F] rounded-full flex-shrink-0">
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
      <section id="values" className="py-12 sm:py-16 md:py-20 bg-white relative">
        {/* Background image strip */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-5"
          style={{
            backgroundImage: `url('/people-helping-community-care.jpg')`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-[#1E3A5F]">OUR </span>
              <span className="text-[#8CC63F]">VALUES</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do and shape how we deliver our services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative">
            {values.map((value, index) => (
              <div 
                key={value.title} 
                className={cn(
                  "flex flex-col py-8 sm:py-10 px-6 sm:px-8 relative group/value border-gray-100",
                  // Right border for all except last in row
                  index % 3 !== 2 && "lg:border-r",
                  index % 2 !== 1 && "sm:border-r lg:border-r-0",
                  // Bottom border for top rows
                  index < 3 && "lg:border-b",
                  index < 4 && "sm:border-b lg:border-b-0",
                  // Mobile: all have bottom border except last
                  index < 5 && "border-b sm:border-b-0",
                  index < 4 && "sm:border-b"
                )}
              >
                {/* Hover gradient effect - top rows */}
                {index < 3 && (
                  <div className="opacity-0 group-hover/value:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-[#8CC63F]/10 to-transparent pointer-events-none" />
                )}
                {/* Hover gradient effect - bottom rows */}
                {index >= 3 && (
                  <div className="opacity-0 group-hover/value:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-[#8CC63F]/10 to-transparent pointer-events-none" />
                )}

                {/* Icon */}
                <div className="mb-4 relative z-10 text-[#8CC63F]">
                  {value.icon}
                </div>

                {/* Title with animated bar */}
                <div className="text-base sm:text-lg font-semibold mb-2 relative z-10">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/value:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-200 group-hover/value:bg-[#8CC63F] transition-all duration-300 origin-center -ml-6 sm:-ml-8" />
                  <span className="group-hover/value:translate-x-2 transition duration-300 inline-block text-[#1E3A5F]">
                    {value.title}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed relative z-10">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

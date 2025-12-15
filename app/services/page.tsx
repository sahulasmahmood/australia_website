import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { PageBanner } from "@/components/page-banner"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import Link from "next/link"
import { Clock, Home, Users, ShoppingCart, Car, Smile, Activity } from "lucide-react"

const services = [
  {
    icon: Clock,
    title: "SUPPORTED INDEPENDENT LIVING",
    description:
      "We provide 24/7 support in shared or individual living arrangements, helping participants develop daily living skills and maintain their independence.",
    href: "/services/supported-living",
  },
  {
    icon: Home,
    title: "RESPITE SUPPORT MTA & STA",
    description:
      "Short-term and medium-term accommodation options that provide a break for carers while ensuring participants receive quality care.",
    href: "/services/respite-support",
  },
  {
    icon: Users,
    title: "SOCIAL & COMMUNITY PARTICIPATION",
    description:
      "Supporting participants to engage with their community, develop social connections, and participate in meaningful activities.",
    href: "/services/community-participation",
  },
  {
    icon: ShoppingCart,
    title: "ASSISTANCE WITH DAILY LIVING",
    description:
      "Help with personal care, household tasks, meal preparation, and other daily activities to support independent living.",
    href: "/services/daily-living",
  },
  {
    icon: Car,
    title: "TRANSPORT SUPPORT",
    description:
      "Reliable transport assistance to help participants attend appointments, activities, and community events.",
    href: "/services/transport",
  },
  {
    icon: Activity,
    title: "INDIVIDUAL AND GROUP ACTIVITIES",
    description:
      "Structured programs and activities designed to build skills, promote wellbeing, and foster social connections.",
    href: "/services/activities",
  },
  {
    icon: Smile,
    title: "BEHAVIOUR SUPPORT",
    description:
      "Specialist behavior support services delivered by qualified practitioners to help participants and their families.",
    href: "/services/behaviour-support",
  },
]

import { ServicesSeo } from "@/components/services-seo"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Our Services | Elegant Care Service',
  description: 'Explore our comprehensive range of NDIS services including supported independent living, community participation, and respite care.',
  keywords: 'NDIS services, supported living, respite care, community participation, disability support'
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesSeo />
      <TopBar />
      <Header />
      <PageBanner
        title="OUR SERVICES"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-[#8CC63F]">SERVICES </span>
              <span className="text-[#1E3A5F]">WE OFFER</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As a registered NDIS provider, we offer a comprehensive range of disability support services tailored to
              meet individual needs and goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-[#F5F5F5] p-6 sm:p-8 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center text-[#8CC63F] group-hover:scale-110 transition-transform">
                    <service.icon className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-bold text-[#1E3A5F] mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  <span className="mt-4 text-[#8CC63F] text-sm font-medium group-hover:underline">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  )
}

import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { PageBanner } from "@/components/page-banner"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const servicesData: Record<
  string,
  {
    title: string
    description: string
    features: string[]
    image: string
    content: string[]
  }
> = {
  "supported-living": {
    title: "Supported Independent Living",
    description: "24/7 support in shared or individual living arrangements",
    image: "/caregiver-helping-person-with-disability-home-care.jpg",
    features: [
      "24/7 support staff available",
      "Shared or individual living options",
      "Daily living skills development",
      "Medication management",
      "Household task assistance",
      "Community access support",
    ],
    content: [
      "Our Supported Independent Living (SIL) services provide comprehensive support for participants who want to live independently in their own home or in shared accommodation with other NDIS participants.",
      "We work with each participant to develop a personalized support plan that addresses their specific needs while promoting independence and skill development.",
      "Our dedicated support workers are available around the clock to assist with personal care, household tasks, meal preparation, and community access.",
    ],
  },
  "respite-support": {
    title: "Respite Support MTA & STA",
    description: "Short-term and medium-term accommodation options",
    image: "/people-helping-community-care.jpg",
    features: [
      "Short Term Accommodation (STA)",
      "Medium Term Accommodation (MTA)",
      "Carer respite support",
      "Emergency respite available",
      "Comfortable accommodation",
      "Engaging activities program",
    ],
    content: [
      "Our respite services provide short-term and medium-term accommodation options for NDIS participants, giving primary carers a well-deserved break while ensuring participants receive quality care.",
      "Whether you need planned respite or emergency support, our team is here to help with comfortable accommodation and engaging activities.",
      "We offer flexible arrangements to suit your needs, from overnight stays to extended periods of support.",
    ],
  },
  "community-participation": {
    title: "Social & Community Participation",
    description: "Supporting participants to engage with their community",
    image: "/people-helping-community-care.jpg",
    features: [
      "Community event participation",
      "Social skills development",
      "Group activities and outings",
      "Volunteer opportunities",
      "Recreational programs",
      "Building social connections",
    ],
    content: [
      "Our Social and Community Participation services help participants engage with their local community, develop meaningful relationships, and participate in activities they enjoy.",
      "We believe that social connection is vital to wellbeing, and our support workers are dedicated to helping participants explore new interests and build lasting friendships.",
      "From local community events to recreational activities, we support participants to lead active and fulfilling social lives.",
    ],
  },
  "daily-living": {
    title: "Assistance with Daily Living",
    description: "Help with personal care and household tasks",
    image: "/caregiver-helping-person-with-disability-home-care.jpg",
    features: [
      "Personal care assistance",
      "Meal preparation",
      "Household cleaning",
      "Shopping assistance",
      "Medication reminders",
      "Appointment support",
    ],
    content: [
      "Our Assistance with Daily Living services provide practical support with everyday tasks, helping participants maintain their independence and quality of life.",
      "Our trained support workers assist with personal care, meal preparation, household tasks, and other activities as needed.",
      "We tailor our support to each individual's needs and preferences, ensuring they receive the help they need while maintaining their dignity and autonomy.",
    ],
  },
  transport: {
    title: "Transport Support",
    description: "Reliable transport assistance for appointments and activities",
    image: "/people-helping-community-care.jpg",
    features: [
      "Medical appointment transport",
      "Community activity access",
      "Shopping trips",
      "Social event transport",
      "Accessible vehicle options",
      "Trained transport staff",
    ],
    content: [
      "Our Transport Support services ensure participants can access the community, attend appointments, and participate in activities they enjoy.",
      "We offer reliable, safe transport with trained staff who understand the needs of people with disabilities.",
      "Whether you need regular transport to appointments or occasional trips to community events, we're here to help you get where you need to go.",
    ],
  },
  "behaviour-support": {
    title: "Behaviour Support",
    description: "Specialist behaviour support services",
    image: "/caregiver-helping-person-with-disability-home-care.jpg",
    features: [
      "Functional behaviour assessments",
      "Positive behaviour support plans",
      "Specialist practitioner services",
      "Family and carer training",
      "Progress monitoring",
      "Evidence-based interventions",
    ],
    content: [
      "Our Behaviour Support services are delivered by qualified behaviour support practitioners who use evidence-based approaches to support participants and their families.",
      "We conduct comprehensive assessments and develop positive behaviour support plans that focus on understanding the function of behaviour and implementing proactive strategies.",
      "Our goal is to improve quality of life for participants and their families by reducing behaviours of concern and building new skills.",
    ],
  },
  activities: {
    title: "Individual and Group Activities",
    description: "Structured programs to build skills and social connections",
    image: "/people-helping-community-care.jpg",
    features: [
      "Life skills programs",
      "Art and creative activities",
      "Exercise and fitness groups",
      "Cooking classes",
      "Social clubs",
      "Educational workshops",
    ],
    content: [
      "Our Individual and Group Activities provide structured programs designed to build skills, promote wellbeing, and foster social connections.",
      "We offer a wide range of activities to suit different interests and abilities, from creative arts to fitness programs.",
      "Participants can join group activities to meet others and develop friendships, or access individual programs tailored to their specific goals.",
    ],
  },
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <PageBanner
        title={service.title.toUpperCase()}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title, href: `/services/${slug}` },
        ]}
      />

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-6">{service.description}</h2>
              {service.content.map((paragraph, index) => (
                <p key={index} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-4">What We Offer:</h3>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle className="w-5 h-5 text-[#8CC63F] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-block bg-[#8CC63F] text-white font-medium px-6 py-3 rounded hover:bg-[#7AB82F] transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/services"
                  className="inline-block border-2 border-[#8CC63F] text-[#8CC63F] font-medium px-6 py-3 rounded hover:bg-[#8CC63F] hover:text-white transition-colors"
                >
                  View All Services
                </Link>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-[500px] rounded-lg overflow-hidden">
              <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  )
}

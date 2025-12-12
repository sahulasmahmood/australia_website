import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { PageBanner } from "@/components/page-banner"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { Target, Users, Heart, TrendingUp } from "lucide-react"
import Image from "next/image"

export default function SupportModelPage() {
  const principles = [
    {
      icon: Target,
      title: "Person-Centered",
      description:
        "Everything we do starts with you. Your goals, preferences, and choices drive the support we provide.",
    },
    {
      icon: Users,
      title: "Collaborative",
      description:
        "We work alongside participants, families, and other service providers to deliver coordinated support.",
    },
    {
      icon: Heart,
      title: "Respectful",
      description:
        "We treat everyone with dignity and respect, honoring individual differences and cultural backgrounds.",
    },
    {
      icon: TrendingUp,
      title: "Empowering",
      description:
        "We focus on building capacity and independence, helping participants develop skills and confidence.",
    },
  ]

  return (
    <main className="min-h-screen">
      <TopBar />
      <Header />
      <PageBanner
        title="OUR SUPPORT MODEL"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Support Model", href: "/support-model" },
        ]}
      />

      {/* How We Work Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                <span className="text-[#1E3A5F]">HOW </span>
                <span className="text-[#8CC63F]">WE WORK</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At My Support My Way, we believe that quality disability support is about more than just providing
                services – it's about building genuine relationships and empowering individuals to live their best
                lives.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our support model is built on a foundation of{" "}
                <strong className="text-[#1E3A5F]">respect, collaboration, and empowerment</strong>. We work closely
                with participants and their families to understand their unique needs, goals, and aspirations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every support plan we develop is tailored to the individual, ensuring they receive the right level of
                support at the right time to achieve their goals.
              </p>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/people-helping-community-care.jpg"
                alt="Support workers helping participant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section id="approach" className="py-12 sm:py-16 md:py-20 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-[#1E3A5F]">OUR </span>
              <span className="text-[#8CC63F]">APPROACH</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our support model is guided by four core principles that shape how we deliver services and interact with
              participants.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-[#8CC63F]/10 rounded-full">
                  <principle.icon className="w-8 h-8 text-[#8CC63F]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">{principle.title}</h3>
                <p className="text-gray-600 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
            <span className="text-[#1E3A5F]">OUR </span>
            <span className="text-[#8CC63F]">PROCESS</span>
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Initial Consultation",
                desc: "We meet with you to understand your needs, goals, and how we can best support you.",
              },
              {
                step: "2",
                title: "Personalized Plan Development",
                desc: "We work together to create a support plan that reflects your individual goals and preferences.",
              },
              {
                step: "3",
                title: "Matching Support Workers",
                desc: "We carefully match you with support workers who have the right skills and personality fit.",
              },
              {
                step: "4",
                title: "Ongoing Support & Review",
                desc: "We regularly review your progress and adjust your support plan as your needs change.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className={`flex flex-col md:flex-row gap-6 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-20 h-20 flex-shrink-0 rounded-full bg-[#8CC63F] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{item.step}</span>
                </div>
                <div className={`flex-1 text-center md:text-left ${index % 2 === 1 ? "md:text-right" : ""}`}>
                  <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </main>
  )
}

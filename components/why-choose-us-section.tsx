import { Shield, Heart, Users, Clock, Award, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "NDIS registered provider with rigorous quality standards and compliance.",
  },
  {
    icon: Heart,
    title: "Person-Centered Care",
    description: "Individualized support plans designed around your unique needs and goals.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Qualified professionals with extensive experience in disability support.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Round-the-clock support whenever you need assistance.",
  },
  {
    icon: Award,
    title: "Trusted Provider",
    description: "Building lasting relationships based on trust and respect.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Personal coordinators to guide you through your support journey.",
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative">
      {/* Background image strip */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-5"
        style={{
          backgroundImage: `url('/people-helping-community-care.jpg')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-3 sm:mb-4">WHY CHOOSE US</h2>
          <div className="w-16 sm:w-20 h-1 bg-[#8CC63F] mx-auto mb-4 sm:mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4 sm:px-0">
            We are committed to providing the highest quality disability support services. Here's what sets us apart
            from others.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 border-t-4 border-[#8CC63F] shadow-md hover:shadow-lg active:shadow-lg transition-shadow"
            >
              <div className="mb-3 sm:mb-4">
                <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 text-[#8CC63F]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#1E3A5F] mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

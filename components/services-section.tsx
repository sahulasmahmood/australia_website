import { Home, Users, Heart, Car, Calendar, Activity, Brain } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Supported Independent Living",
    description: "Assistance to live independently in your own home with personalized support.",
  },
  {
    icon: Heart,
    title: "Respite Support MTA & STA",
    description: "Short-term and medium-term accommodation with quality care services.",
  },
  {
    icon: Users,
    title: "Social & Community Participation",
    description: "Engage with your community through social activities and events.",
  },
  {
    icon: Activity,
    title: "Assistance with Daily Living",
    description: "Support with everyday tasks to maintain your lifestyle and wellbeing.",
  },
  {
    icon: Car,
    title: "Transport Support",
    description: "Reliable transportation to appointments, activities, and community events.",
  },
  {
    icon: Calendar,
    title: "Individual and Group Activities",
    description: "Structured programs designed for personal growth and social connection.",
  },
  {
    icon: Brain,
    title: "Behaviour Support",
    description: "Professional support to develop positive behavior strategies.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-[#8CC63F]">SERVICES</span> <span className="text-[#1E3A5F]">WE OFFER</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-[#8CC63F] mx-auto mt-3 sm:mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-[#F5F5F5] p-6 sm:p-8 text-center hover:shadow-lg active:shadow-lg transition-all duration-300 hover:-translate-y-1 active:bg-gray-100"
            >
              <div className="mb-3 sm:mb-4 flex justify-center">
                <service.icon className="h-10 w-10 sm:h-12 sm:w-12 text-[#8CC63F] group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-[#1E3A5F] uppercase tracking-wide mb-2">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

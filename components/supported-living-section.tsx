import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const options = [
  "24/7 supported living arrangements",
  "Individual accommodation",
  "Skill development programs",
  "Community access support",
  "Personal care assistance",
  "Meal preparation and nutrition",
  "Household management support",
  "Social and recreational activities",
]

export function SupportedLivingSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Side */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              <span className="text-secondary">SUPPORTED</span>{" "}
              <span className="text-primary">INDEPENDENT LIVING</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mb-4 sm:mb-6" />

            <p className="text-gray-700 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base text-justify">
              Our Supported Independent Living (SIL) services are designed to help individuals with disabilities live as
              independently as possible in their own homes. We provide tailored support that respects your choices and
              promotes your wellbeing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-6 sm:mb-8">
              {options.map((option, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-0.5 p-1 bg-primary rounded-full flex-shrink-0">
                    <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                  </div>
                  <span className="text-gray-700 text-xs sm:text-sm">{option}</span>
                </div>
              ))}
            </div>

            <Button className="w-full sm:w-auto bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 sm:px-8" asChild>
              <a href="/support-model">READ MORE</a>
            </Button>
          </div>

          {/* Image Side */}
          <div className="relative mt-6 lg:mt-0">
            <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img
                src="/caregiver-helping-person-with-disability-home-care.jpg"
                alt="Supported living care assistance"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 lg:w-32 h-24 lg:h-32 bg-primary/20 rounded-lg -z-10" />
            <div className="hidden sm:block absolute -top-4 -left-4 w-16 lg:w-24 h-16 lg:h-24 bg-secondary/10 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

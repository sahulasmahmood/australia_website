import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <div className="relative">
              <svg viewBox="0 0 300 350" className="w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-96">
                {/* Tree trunk */}
                <rect x="135" y="200" width="30" height="120" fill="#8B7355" rx="4" />

                {/* Tree canopy - overlapping circles */}
                <circle cx="150" cy="100" r="60" fill="#8CC63F" />
                <circle cx="100" cy="140" r="40" fill="#7AB82F" />
                <circle cx="200" cy="140" r="40" fill="#9DD64F" />
                <circle cx="120" cy="80" r="30" fill="#A8D86F" />
                <circle cx="180" cy="80" r="30" fill="#7AB82F" />
                <circle cx="150" cy="60" r="25" fill="#8CC63F" />

                {/* Person silhouette in tree */}
                <circle cx="150" cy="110" r="20" fill="#1E3A5F" />
                <ellipse cx="150" cy="155" rx="15" ry="25" fill="#1E3A5F" />

                {/* Arms reaching out */}
                <path d="M135 140 Q110 130 95 145" stroke="#1E3A5F" strokeWidth="8" fill="none" strokeLinecap="round" />
                <path
                  d="M165 140 Q190 130 205 145"
                  stroke="#1E3A5F"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Ground line */}
                <ellipse cx="150" cy="320" rx="80" ry="15" fill="#E8E8E8" />
              </svg>
            </div>
          </div>

          <div className="bg-[#F5F5F5] p-6 sm:p-8 md:p-10 lg:p-12 rounded-sm order-1 lg:order-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              <span className="text-[#1E3A5F]">PROFESSIONAL SUPPORT,</span>
              <br />
              <span className="text-[#8CC63F]">PERSONAL COMFORT...</span>
            </h2>

            <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>
                At <strong className="text-[#1E3A5F]">Elegant Care Service</strong>, we believe that everyone deserves to
                live a life filled with dignity, independence, and joy. Our dedicated team of experienced professionals
                is committed to providing{" "}
                <strong className="text-[#8CC63F]">exceptional disability support services</strong> tailored to your
                unique needs.
              </p>
              <p>
                We understand that each individual's journey is different, which is why we take a{" "}
                <strong className="text-[#1E3A5F]">person-centered approach</strong> to care. Whether you need
                assistance with daily living, community participation, or specialized support, we're here to help you
                achieve your goals.
              </p>
              <p className="hidden sm:block">
                Our services are designed to empower you to make your own choices, pursue your interests, and connect
                with your community in meaningful ways.
              </p>
            </div>

            <Button className="mt-6 sm:mt-8 w-full sm:w-auto bg-transparent border-2 border-[#8CC63F] text-[#8CC63F] hover:bg-[#8CC63F] hover:text-white font-semibold px-6 sm:px-8">
              READ MORE
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

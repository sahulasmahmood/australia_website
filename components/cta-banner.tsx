import { Phone, Mail } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="bg-[#8CC63F] py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:justify-center md:gap-12 lg:gap-16 text-white">
          <a
            href="tel:1300000000"
            className="flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity group text-center md:text-left"
          >
            <div className="p-2.5 sm:p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
              <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-90">Call Us Now</p>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold">1300 000 000</p>
            </div>
          </a>

          <div className="hidden md:block w-px h-12 lg:h-16 bg-white/30" />
          <div className="md:hidden w-32 h-px bg-white/30" />

          <a
            href="mailto:info@mysupportmyway.com.au"
            className="flex items-center gap-3 sm:gap-4 hover:opacity-90 transition-opacity group text-center md:text-left"
          >
            <div className="p-2.5 sm:p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
              <Mail className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium uppercase tracking-wider opacity-90">Email Us</p>
              <p className="text-base sm:text-xl md:text-2xl font-bold break-all sm:break-normal">
                info@mysupportmyway.com.au
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

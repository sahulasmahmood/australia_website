"use client"

import { Phone, Mail } from "lucide-react"
import { useContact } from "@/hooks/use-contact"
import { CtaBannerSkeleton } from "@/components/ui/skeletons"

export function CtaBanner() {
  const { contactInfo, isLoading } = useContact()

  if (isLoading) {
    return <CtaBannerSkeleton />
  }

  return (
    <section className="bg-primary py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-center md:gap-10 lg:gap-14 text-white">
          <a
            href={`tel:${contactInfo?.primaryPhone || ""}`}
            className="flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity group w-64 md:w-auto"
          >
            <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-90">Call Us Now</p>
              <p className="text-base sm:text-lg md:text-xl font-semibold">{contactInfo?.primaryPhone || "Contact Us"}</p>
            </div>
          </a>

          <div className="hidden md:block w-px h-10 bg-white/30" />
          <div className="md:hidden w-24 h-px bg-white/30" />

          <a
            href={`mailto:${contactInfo?.email || ""}`}
            className="flex items-center gap-2.5 sm:gap-3 hover:opacity-90 transition-opacity group w-64 md:w-auto"
          >
            <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider opacity-90">Email Us</p>
              <p className="text-sm sm:text-base md:text-lg font-semibold break-all sm:break-normal">
                {contactInfo?.email || "Email Us"}
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

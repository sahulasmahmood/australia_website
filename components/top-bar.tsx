import { Phone, Mail } from "lucide-react"
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export function TopBar() {
  return (
    <div className="hidden sm:block bg-[#1E3A5F] text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
          <a href="tel:1300000000" className="flex items-center gap-2 hover:text-[#8CC63F] transition-colors">
            <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span>1300 000 000</span>
          </a>
          <a
            href="mailto:info@mysupportmyway.com.au"
            className="flex items-center gap-2 hover:text-[#8CC63F] transition-colors"
          >
            <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="hidden md:inline">info@mysupportmyway.com.au</span>
            <span className="md:hidden">Email Us</span>
          </a>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-[#8CC63F] transition-colors p-1">
            <Facebook className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[#8CC63F] transition-colors p-1">
            <Instagram className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-[#8CC63F] transition-colors p-1">
            <Twitter className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-[#8CC63F] transition-colors p-1">
            <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

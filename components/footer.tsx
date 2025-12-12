import { Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "NDIS", href: "#" },
  { label: "Contact", href: "#contact" },
  { label: "Feedback", href: "#" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-[#1E3A5F] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Column 1 - About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 60 60" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true">
                  <rect x="27" y="35" width="6" height="20" fill="#8B7355" rx="1" />
                  <circle cx="30" cy="20" r="12" fill="#8CC63F" />
                  <circle cx="20" cy="28" r="8" fill="#7AB82F" />
                  <circle cx="40" cy="28" r="8" fill="#9DD64F" />
                  <circle cx="25" cy="15" r="6" fill="#A8D86F" />
                  <circle cx="35" cy="15" r="6" fill="#7AB82F" />
                  <circle cx="30" cy="22" r="4" fill="#1E3A5F" />
                  <path d="M26 28 L30 38 L34 28 Z" fill="#1E3A5F" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-base sm:text-lg leading-tight">MY SUPPORT</span>
                  <span className="text-[#8CC63F] font-bold text-base sm:text-lg leading-tight">MY WAY</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              My Support My Way is a registered NDIS provider committed to delivering high-quality disability support
              services. We believe in empowering individuals to live life on their own terms with dignity and
              independence.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="#"
                className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-[#8CC63F] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-[#8CC63F] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-[#8CC63F] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a
                href="#"
                className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-[#8CC63F] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#8CC63F] transition-colors text-xs sm:text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#8CC63F] rounded-full flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4">
              <a href="tel:1300000000" className="flex items-start gap-3 text-gray-300 hover:text-[#8CC63F] group">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-[#8CC63F]" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-white">Phone</p>
                  <p className="text-xs sm:text-sm">1300 000 000</p>
                </div>
              </a>
              <a
                href="mailto:info@mysupportmyway.com.au"
                className="flex items-start gap-3 text-gray-300 hover:text-[#8CC63F] group"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-[#8CC63F]" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-white">Email</p>
                  <p className="text-xs sm:text-sm break-all sm:break-normal">info@mysupportmyway.com.au</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-[#8CC63F]" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-white">Address</p>
                  <p className="text-xs sm:text-sm">123 Support Street, Sydney NSW 2000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indigenous Acknowledgment */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed text-center">
            My Support My Way acknowledges the Traditional Custodians of Country throughout Australia and recognizes
            their continuing connection to land, waters, and community. We pay our respects to Aboriginal and Torres
            Strait Islander cultures and to Elders past, present, and emerging.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#152D4A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} My Support My Way. All rights reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#" className="hover:text-[#8CC63F] transition-colors">
                Privacy Policy
              </a>
              <span>|</span>
              <a href="#" className="hover:text-[#8CC63F] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

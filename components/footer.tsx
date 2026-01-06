"use client"

import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, Send, Sparkles } from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"
import { Logo } from "@/components/logo"
import { useContact } from "@/hooks/use-contact"
import { FooterSkeleton } from "@/components/ui/skeletons"
import Link from "next/link"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "NDIS", href: "/ndis" },
  { label: "Contact", href: "/contact" },
  { label: "Feedback", href: "/feedback" },
]

export function Footer() {
  const { contactInfo, isLoading } = useContact()

  // Format full address
  const getFullAddress = () => {
    if (!contactInfo) return ""
    const parts = [
      contactInfo.address,
      contactInfo.city,
      contactInfo.state,
      contactInfo.postcode,
    ].filter(Boolean)
    return parts.join(", ")
  }

  if (isLoading) {
    return <FooterSkeleton />
  }

  return (
    <footer id="contact" className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Column 1 - About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <Logo className="[&_span]:text-white [&_span:last-child]:text-primary" />
            </div>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              Elegant Care Service is a registered NDIS provider committed to delivering high-quality disability support
              services. We believe in empowering individuals to live life on their own terms with dignity and
              independence.
            </p>
            <div className="flex gap-3 sm:gap-4">
              {contactInfo?.facebook && (
                <a
                  href={contactInfo.facebook}
                  className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {contactInfo?.instagram && (
                <a
                  href={contactInfo.instagram}
                  className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {contactInfo?.twitter && (
                <a
                  href={contactInfo.twitter}
                  className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {contactInfo?.linkedin && (
                <a
                  href={contactInfo.linkedin}
                  className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {contactInfo?.youtube && (
                <a
                  href={contactInfo.youtube}
                  className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {contactInfo?.whatsapp && (
                <a
                  href={contactInfo.whatsapp}
                  className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
              {contactInfo?.telegram && (
                <a
                  href={contactInfo.telegram}
                  className="p-2.5 sm:p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"
                  aria-label="Telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-xs sm:text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-white">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4">
              {contactInfo?.primaryPhone && (
                <a 
                  href={`tel:${contactInfo.primaryPhone}`} 
                  className="flex items-start gap-3 text-gray-300 hover:text-primary group"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">Phone</p>
                    <p className="text-xs sm:text-sm">{contactInfo.primaryPhone}</p>
                  </div>
                </a>
              )}
              {contactInfo?.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 text-gray-300 hover:text-primary group"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">Email</p>
                    <p className="text-xs sm:text-sm break-all sm:break-normal">
                      {contactInfo.email}
                    </p>
                  </div>
                </a>
              )}
              {getFullAddress() && (
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-white">Address</p>
                    <p className="text-xs sm:text-sm">{getFullAddress()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Indigenous Acknowledgment */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed text-center">
            Elegant Care Service acknowledges the Traditional Custodians of Country throughout Australia and recognizes
            their continuing connection to land, waters, and community. We pay our respects to Aboriginal and Torres
            Strait Islander cultures and to Elders past, present, and emerging.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-center text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-2 flex-wrap">
            <span>&copy; {new Date().getFullYear()} Elegant Care Service. All rights reserved.</span>
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary inline-block" />
            <span className="hover:text-primary transition-colors">
              <a href="https://mntfuture.com/" target="_blank" rel="noopener noreferrer">
                Developed by MnT
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}

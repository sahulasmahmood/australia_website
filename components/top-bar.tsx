"use client"

import { Phone, Mail, Send } from "lucide-react"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon"
import { useContact } from "@/hooks/use-contact"
import { TopBarSkeleton } from "@/components/ui/skeletons"

export function TopBar() {
  const { contactInfo, isLoading } = useContact()

  if (isLoading) {
    return <TopBarSkeleton />
  }

  return (
    <div className="hidden sm:block bg-secondary text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
          {contactInfo?.primaryPhone && (
            <a 
              href={`tel:${contactInfo.primaryPhone}`} 
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>{contactInfo.primaryPhone}</span>
            </a>
          )}
          {contactInfo?.email && (
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden md:inline">{contactInfo.email}</span>
              <span className="md:hidden">Email Us</span>
            </a>
          )}
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          {contactInfo?.facebook && (
            <a 
              href={contactInfo.facebook} 
              aria-label="Facebook" 
              className="hover:text-primary transition-colors p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </a>
          )}
          {contactInfo?.instagram && (
            <a 
              href={contactInfo.instagram} 
              aria-label="Instagram" 
              className="hover:text-primary transition-colors p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </a>
          )}
          {contactInfo?.twitter && (
            <a 
              href={contactInfo.twitter} 
              aria-label="Twitter" 
              className="hover:text-primary transition-colors p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </a>
          )}
          {contactInfo?.linkedin && (
            <a 
              href={contactInfo.linkedin} 
              aria-label="LinkedIn" 
              className="hover:text-primary transition-colors p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </a>
          )}
          {contactInfo?.youtube && (
            <a 
              href={contactInfo.youtube} 
              aria-label="YouTube" 
              className="hover:text-primary transition-colors p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </a>
          )}
          {contactInfo?.whatsapp && (
            <a 
              href={contactInfo.whatsapp} 
              aria-label="WhatsApp" 
              className="hover:text-primary transition-colors p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </a>
          )}
          {contactInfo?.telegram && (
            <a 
              href={contactInfo.telegram} 
              aria-label="Telegram" 
              className="hover:text-primary transition-colors p-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

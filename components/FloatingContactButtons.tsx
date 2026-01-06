"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone, X, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useContact } from "@/hooks/use-contact";

export default function FloatingContactButtons() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showCallTooltip, setShowCallTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { contactInfo } = useContact();
  const pathname = usePathname();

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide floating buttons on admin and login pages
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm interested in your services. Please provide more details.";
    const whatsappNumber = contactInfo?.whatsappNumber || "";
    if (!whatsappNumber) return;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    const phoneNumber = contactInfo?.primaryPhone || "";
    if (!phoneNumber) return;
    window.open(`tel:${phoneNumber}`, '_self');
  };

  if (!contactInfo?.primaryPhone && !contactInfo?.whatsappNumber) return null;

  // Mobile: Collapsible FAB menu
  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        {/* Expanded buttons */}
        <div className={`flex flex-col gap-3 mb-3 transition-all duration-300 ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          {/* WhatsApp Button */}
          {contactInfo?.whatsappNumber && (
            <Button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-12 h-12 shadow-lg"
              aria-label="Contact via WhatsApp"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </Button>
          )}

          {/* Call Button */}
          {contactInfo?.primaryPhone && (
            <Button
              onClick={handleCallClick}
              className="bg-secondary hover:bg-secondary-hover text-white rounded-full w-12 h-12 shadow-lg"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Main FAB toggle button */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`rounded-full w-14 h-14 shadow-2xl transition-all duration-300 ${
            isExpanded 
              ? 'bg-gray-600 hover:bg-gray-700 rotate-0' 
              : 'bg-primary hover:bg-primary-hover animate-pulse'
          }`}
          aria-label={isExpanded ? "Close contact menu" : "Open contact menu"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    );
  }

  // Desktop: Original layout with tooltips
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 sm:gap-4 z-50">
      {/* WhatsApp Button */}
      {contactInfo?.whatsappNumber && (
        <div className="relative group">
          <Button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            onFocus={() => setShowWhatsAppTooltip(true)}
            onBlur={() => setShowWhatsAppTooltip(false)}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-green-500/25 animate-bounce hover:animate-none focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            style={{
              animationDuration: '2s',
              animationIterationCount: 'infinite'
            }}
            aria-label={`Contact via WhatsApp: ${contactInfo.whatsappNumber}`}
          >
            <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </Button>
          
          {showWhatsAppTooltip && (
            <div 
              className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-secondary text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-lg"
              role="tooltip"
            >
              WhatsApp: {contactInfo.whatsappNumber}
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-secondary border-t-4 border-t-transparent border-b-4 border-b-transparent" aria-hidden="true"></div>
            </div>
          )}
        </div>
      )}

      {/* Call Button */}
      {contactInfo?.primaryPhone && (
        <div className="relative group">
          <Button
            onClick={handleCallClick}
            onMouseEnter={() => setShowCallTooltip(true)}
            onMouseLeave={() => setShowCallTooltip(false)}
            onFocus={() => setShowCallTooltip(true)}
            onBlur={() => setShowCallTooltip(false)}
            className="bg-secondary hover:bg-secondary-hover text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label={`Call us: ${contactInfo.primaryPhone}`}
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          
          {showCallTooltip && (
            <div 
              className="absolute right-14 sm:right-16 top-1/2 transform -translate-y-1/2 bg-secondary text-white px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap shadow-lg"
              role="tooltip"
            >
              Call: {contactInfo.primaryPhone}
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-secondary border-t-4 border-t-transparent border-b-4 border-b-transparent" aria-hidden="true"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { useContact } from "@/hooks/use-contact";

export default function FloatingContactButtons() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false);
  const [showCallTooltip, setShowCallTooltip] = useState(false);
  const { contactInfo } = useContact();

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

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {/* WhatsApp Button */}
      {contactInfo?.whatsappNumber && (
        <div className="relative">
          <Button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setShowWhatsAppTooltip(true)}
            onMouseLeave={() => setShowWhatsAppTooltip(false)}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-green-500/25 animate-bounce hover:animate-none"
            style={{
              animationDuration: '2s',
              animationIterationCount: 'infinite'
            }}
          >
            <WhatsAppIcon className="h-7 w-7" />
          </Button>
          
          {showWhatsAppTooltip && (
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#1E3A5F] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              WhatsApp: {contactInfo.whatsappNumber}
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#1E3A5F] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          )}
        </div>
      )}

      {/* Call Button */}
      {contactInfo?.primaryPhone && (
        <div className="relative">
          <Button
            onClick={handleCallClick}
            onMouseEnter={() => setShowCallTooltip(true)}
            onMouseLeave={() => setShowCallTooltip(false)}
            className="bg-[#1E3A5F] hover:bg-[#2c5282] text-white rounded-full w-14 h-14 shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-blue-500/25"
          >
            <Phone className="h-6 w-6" />
          </Button>
          
          {showCallTooltip && (
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-[#1E3A5F] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
              Call: {contactInfo.primaryPhone}
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-[#1E3A5F] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

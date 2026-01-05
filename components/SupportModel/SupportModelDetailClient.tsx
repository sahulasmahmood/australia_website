"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import Image from "next/image";
import { useState } from "react";
import { useContact } from "@/hooks/use-contact";

interface SupportModelData {
  _id?: string;
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  gallery?: string[];
  features: string[];
  slug: string;
  status?: string;
  views?: number;
  bookings?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface SupportModelDetailClientProps {
  supportModelData: SupportModelData;
}

export default function SupportModelDetailClient({
  supportModelData,
}: SupportModelDetailClientProps) {
  const { contactInfo } = useContact();
  const [selectedImage, setSelectedImage] = useState(supportModelData.image || "/placeholder.svg");

  const allImages = [
    supportModelData.image,
    ...(supportModelData.gallery || []),
  ].filter(img => img && img.trim() !== "");

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">
                About This Support Model
              </h2>

              <div
                className="prose prose-lg text-gray-600 mb-8 text-justify"
                dangerouslySetInnerHTML={{ __html: supportModelData.description }}
              />

              {/* Features */}
              {supportModelData.features && supportModelData.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {supportModelData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-0.5 p-1 bg-[#8CC63F] rounded-full flex-shrink-0">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={`tel:${contactInfo?.primaryPhone || ""}`}
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="bg-[#8CC63F] hover:bg-[#7AB52F] text-white w-full"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us
                  </Button>
                </a>
                <a 
                  href={`https://wa.me/${contactInfo?.whatsappNumber?.replace(/\s+/g, '') || ""}?text=I'm interested in ${supportModelData.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white w-full"
                  >
                    <WhatsAppIcon className="h-4 w-4 mr-2" />
                    Get a Quote
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right - Images */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg mb-4">
                <Image
                  src={selectedImage}
                  alt={supportModelData.title || "Support Model"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Gallery Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        selectedImage === image
                          ? "border-[#8CC63F]"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${supportModelData.title || "Support Model"} - Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Info Section */}
      <section className="py-12 sm:py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold">
              <span className="text-[#1E3A5F]">WHY CHOOSE</span>{" "}
              <span className="text-[#8CC63F]">US</span>
            </h3>
            <div className="w-16 h-1 bg-[#8CC63F] mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#8CC63F] shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-[#1E3A5F] mb-2 text-lg">
                NDIS Registered
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fully registered NDIS provider with qualified and experienced staff dedicated to your care.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#8CC63F] shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-[#1E3A5F] mb-2 text-lg">
                Personalized Care
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tailored support plans designed around your unique needs, goals, and preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#8CC63F] shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-[#1E3A5F] mb-2 text-lg">
                24/7 Support
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Round-the-clock assistance and support whenever you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

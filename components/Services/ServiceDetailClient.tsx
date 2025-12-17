"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ServiceData {
  _id?: string;
  serviceName: string;
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

interface ServiceDetailClientProps {
  serviceData: ServiceData;
}

export default function ServiceDetailClient({
  serviceData,
}: ServiceDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(serviceData.image);

  const allImages = [
    serviceData.image,
    ...(serviceData.gallery || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg mb-4">
                <Image
                  src={selectedImage}
                  alt={serviceData.serviceName}
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
                        alt={`Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">
                About This Service
              </h2>

              <div
                className="prose prose-lg text-gray-600 mb-8"
                dangerouslySetInnerHTML={{ __html: serviceData.description }}
              />

              {/* Features */}
              {serviceData.features && serviceData.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#1E3A5F] mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {serviceData.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-[#8CC63F] shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-[#8CC63F] hover:bg-[#7AB52F] text-white w-full sm:w-auto"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white w-full sm:w-auto"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Info Section */}
      <section className="py-12 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1E3A5F] mb-4">
              Why Choose Elegant Care Service?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-[#8CC63F]" />
                </div>
                <h4 className="font-semibold text-[#1E3A5F] mb-2">
                  NDIS Registered
                </h4>
                <p className="text-sm text-gray-600">
                  Fully registered NDIS provider with qualified staff
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-[#8CC63F]" />
                </div>
                <h4 className="font-semibold text-[#1E3A5F] mb-2">
                  Personalized Care
                </h4>
                <p className="text-sm text-gray-600">
                  Tailored support plans to meet your individual needs
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#8CC63F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-[#8CC63F]" />
                </div>
                <h4 className="font-semibold text-[#1E3A5F] mb-2">
                  24/7 Support
                </h4>
                <p className="text-sm text-gray-600">
                  Round-the-clock assistance when you need it most
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

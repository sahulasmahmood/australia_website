"use client";

import Link from "next/link";
import Image from "next/image";
import { useServices } from "@/hooks/use-services";
import { Briefcase } from "lucide-react";
import { HomeServicesSkeleton } from "@/components/ui/skeletons";

// Helper function to strip HTML tags and decode entities
const stripHtml = (html: string) => {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .trim();
};

export function ServicesSection() {
  const { services, isLoading } = useServices(1, 8);

  if (isLoading) {
    return <HomeServicesSkeleton />;
  }

  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              <span className="text-primary">SERVICES</span>{" "}
              <span className="text-secondary">WE OFFER</span>
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mt-3 sm:mt-4" />
          </div>
          <div className="text-center">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Services coming soon...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-primary">SERVICES</span>{" "}
            <span className="text-secondary">WE OFFER</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mt-3 sm:mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug}`}
              className="group bg-light-gray overflow-hidden hover:shadow-lg active:shadow-lg transition-all duration-300 hover:-translate-y-1 active:bg-gray-100 rounded-lg"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={service.image}
                  alt={service.serviceName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-xs sm:text-sm font-semibold text-secondary uppercase tracking-wide mb-2 text-center">
                  {service.serviceName}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2 text-center">
                  {service.shortDescription || stripHtml(service.description)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/services"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}

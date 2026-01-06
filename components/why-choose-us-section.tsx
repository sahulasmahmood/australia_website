"use client";

import { cn } from "@/lib/utils";
import { Shield, Heart, Users, Clock, Handshake, UserCheck } from "lucide-react";

const features = [
  {
    title: "Quality Assured",
    description: "NDIS registered provider with rigorous quality standards and compliance.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Person-Centered Care",
    description: "Individualized support plans designed around your unique needs and goals.",
    icon: <Heart className="h-6 w-6" />,
  },
  {
    title: "Experienced Team",
    description: "Qualified professionals with extensive experience in disability support.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "24/7 Availability",
    description: "Round-the-clock support whenever you need assistance.",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: "Trusted Provider",
    description: "Building lasting relationships based on trust and respect.",
    icon: <Handshake className="h-6 w-6" />,
  },
  {
    title: "Dedicated Support",
    description: "Personal coordinators to guide you through your support journey.",
    icon: <UserCheck className="h-6 w-6" />,
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white relative">
      {/* Background image strip */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-5"
        style={{
          backgroundImage: `url('/people-helping-community-care.jpg')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="text-secondary">WHY CHOOSE</span>{" "}
            <span className="text-primary">US</span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-4 sm:px-0">
            We are committed to providing the highest quality disability support services. Here&apos;s what sets us apart from others.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-8 sm:py-10 px-6 sm:px-8 relative group/feature border-gray-200",
        // Right border for all except last in row
        index % 3 !== 2 && "lg:border-r",
        index % 2 !== 1 && "sm:border-r lg:border-r-0",
        index % 3 !== 2 && "lg:border-r",
        // Bottom border for top rows
        index < 3 && "lg:border-b",
        index < 4 && "sm:border-b lg:border-b-0",
        index < 3 && "lg:border-b",
        // Mobile: all have bottom border except last
        index < 5 && "border-b sm:border-b-0",
        index < 4 && "sm:border-b"
      )}
    >
      {/* Hover gradient effect - top rows */}
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
      )}
      {/* Hover gradient effect - bottom rows */}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-300 absolute inset-0 h-full w-full bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      )}

      {/* Icon */}
      <div className="mb-4 relative z-10 text-primary">
        {icon}
      </div>

      {/* Title with animated bar */}
      <div className="text-base sm:text-lg font-semibold mb-2 relative z-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-200 group-hover/feature:bg-primary transition-all duration-300 origin-center -ml-6 sm:-ml-8" />
        <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-secondary">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  );
};

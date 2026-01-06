"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBanner } from "@/hooks/use-banner";
import { HeroSkeleton } from "@/components/ui/skeletons";
import Image from "next/image";

const defaultSlides = [
  {
    title: "Empowering Your Independence",
    subtitle: "Professional NDIS Support Services",
    description:
      "We provide personalized disability support services that help you live life on your terms.",
  },
  {
    title: "Your Journey, Your Choice",
    subtitle: "Tailored Care Solutions",
    description:
      "Experience compassionate care designed around your unique needs and goals.",
  },
  {
    title: "Building Connections",
    subtitle: "Community & Social Participation",
    description:
      "Join a supportive community that celebrates diversity and inclusion.",
  },
];

export function DynamicHeroSection() {
  const { banner, isLoading } = useBanner("home");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get banner images from the images array
  const bannerImages =
    banner?.images && Array.isArray(banner.images) && banner.images.length > 0
      ? banner.images.filter(
          (img): img is string => typeof img === "string" && img.length > 0
        )
      : [];

  const slides = bannerImages.length > 0 ? bannerImages : [];
  const totalSlides = Math.max(slides.length, defaultSlides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <section className="relative min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Images */}
      {slides.length > 0 ? (
        slides.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-primary" />
            <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-primary" />
            <div className="absolute top-20 sm:top-40 right-20 sm:right-40 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-white" />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-white text-center lg:text-left">
            <div className="mb-6">
              {defaultSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    currentSlide === index
                      ? "opacity-100"
                      : "opacity-0 absolute"
                  }`}
                >
                  {currentSlide === index && (
                    <>
                      <p className="text-primary font-medium mb-2 text-xs sm:text-sm uppercase tracking-wider">
                        {slide.subtitle}
                      </p>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight text-balance">
                        {slide.title}
                      </h1>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        {slide.description}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 sm:px-8 text-sm sm:text-base"
                asChild
              >
                <a href="/contact">Get Started</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold px-6 sm:px-8 bg-transparent text-sm sm:text-base"
                asChild
              >
                <a href="/about">Learn More</a>
              </Button>
            </div>
          </div>

          {/* Right side - can be used for additional content if needed */}
          <div className="hidden lg:block" />
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
          <button
            onClick={prevSlide}
            className="p-2 sm:p-2 text-white/70 hover:text-white active:text-white transition-colors touch-manipulation"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <div className="flex gap-2 sm:gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors touch-manipulation ${
                  currentSlide === index ? "bg-primary" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            className="p-2 sm:p-2 text-white/70 hover:text-white active:text-white transition-colors touch-manipulation"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}

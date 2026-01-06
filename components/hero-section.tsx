"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "Empowering Your Independence",
    subtitle: "Professional NDIS Support Services",
    description: "We provide personalized disability support services that help you live life on your terms.",
  },
  {
    title: "Your Journey, Your Choice",
    subtitle: "Tailored Care Solutions",
    description: "Experience compassionate care designed around your unique needs and goals.",
  },
  {
    title: "Building Connections",
    subtitle: "Community & Social Participation",
    description: "Join a supportive community that celebrates diversity and inclusion.",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)

  return (
    <section className="relative bg-gradient-to-br from-secondary via-secondary to-secondary min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 rounded-full bg-primary" />
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 rounded-full bg-primary" />
        <div className="absolute top-20 sm:top-40 right-20 sm:right-40 w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-white text-center lg:text-left">
            <div className="mb-6">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-500 ${
                    currentSlide === index ? "opacity-100" : "opacity-0 absolute"
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
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-secondary font-semibold px-6 sm:px-8 bg-transparent text-sm sm:text-base"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <svg viewBox="0 0 400 400" className="w-60 h-60 lg:w-80 lg:h-80">
                {/* Abstract person with flowing ribbons */}
                <defs>
                  <linearGradient id="ribbon1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary)" />
                    <stop offset="100%" stopColor="var(--primary-hover)" />
                  </linearGradient>
                  <linearGradient id="ribbon2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9F43" />
                    <stop offset="100%" stopColor="#F7B731" />
                  </linearGradient>
                  <linearGradient id="ribbon3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#54A0FF" />
                    <stop offset="100%" stopColor="#2E86DE" />
                  </linearGradient>
                </defs>

                {/* Central figure */}
                <circle cx="200" cy="120" r="45" fill="white" />
                <ellipse cx="200" cy="220" rx="35" ry="60" fill="white" />

                {/* Flowing ribbons */}
                <path
                  d="M160 150 Q100 180 80 250 Q60 320 120 350"
                  stroke="url(#ribbon1)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M240 150 Q300 180 320 250 Q340 320 280 350"
                  stroke="url(#ribbon2)"
                  strokeWidth="20"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M200 280 Q200 320 160 360"
                  stroke="url(#ribbon3)"
                  strokeWidth="15"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M200 280 Q200 320 240 360"
                  stroke="url(#ribbon1)"
                  strokeWidth="15"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="w-10 sm:w-12 h-6 sm:h-8 bg-black flex items-center justify-center rounded overflow-hidden">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-black" />
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-yellow-500" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-red-600" />
            </div>
          </div>
          <div className="w-10 sm:w-12 h-6 sm:h-8 rounded overflow-hidden">
            <div className="w-full h-full bg-blue-900 relative">
              <div className="absolute top-0 left-0 w-1/4 h-1/2 bg-blue-800 flex items-center justify-center">
                <span className="text-white text-[5px] sm:text-[6px]">★</span>
              </div>
            </div>
          </div>
          <div className="w-10 sm:w-12 h-6 sm:h-8 rounded overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-blue-600" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white" />
          </div>
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
            {slides.map((_, index) => (
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
  )
}

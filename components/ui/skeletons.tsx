"use client"

import { Skeleton } from "@/components/ui/skeleton"

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
    <section className="relative min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] flex items-center overflow-hidden bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left space-y-4">
            <Skeleton className="h-4 w-32 bg-white/20 mx-auto lg:mx-0" />
            <Skeleton className="h-10 sm:h-12 md:h-14 w-full max-w-md bg-white/20 mx-auto lg:mx-0" />
            <Skeleton className="h-10 sm:h-12 md:h-14 w-3/4 max-w-sm bg-white/20 mx-auto lg:mx-0" />
            <Skeleton className="h-5 w-full max-w-lg bg-white/10 mx-auto lg:mx-0" />
            <Skeleton className="h-5 w-2/3 max-w-md bg-white/10 mx-auto lg:mx-0" />
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
              <Skeleton className="h-11 w-36 bg-primary/30 rounded-md" />
              <Skeleton className="h-11 w-36 bg-white/20 rounded-md" />
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
          <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
          <div className="flex gap-2">
            <Skeleton className="h-3 w-3 rounded-full bg-primary/50" />
            <Skeleton className="h-3 w-3 rounded-full bg-white/30" />
            <Skeleton className="h-3 w-3 rounded-full bg-white/30" />
          </div>
          <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
        </div>
      </div>
    </section>
  )
}

// Service Card Skeleton
export function ServiceCardSkeleton() {
  return (
    <div className="bg-light-gray overflow-hidden rounded-lg">
      <Skeleton className="h-48 w-full bg-gray-300" />
      <div className="p-6 sm:p-8 text-center space-y-3">
        <Skeleton className="h-4 w-3/4 mx-auto bg-gray-300" />
        <Skeleton className="h-3 w-full bg-gray-200" />
        <Skeleton className="h-3 w-5/6 mx-auto bg-gray-200" />
        <Skeleton className="h-4 w-24 mx-auto bg-primary/30 mt-4" />
      </div>
    </div>
  )
}

// Services Section Skeleton
export function ServicesSectionSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 sm:h-10 w-64 mx-auto bg-gray-200" />
          <Skeleton className="h-1 w-20 mx-auto mt-4 bg-primary/50" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Home Services Section Skeleton (4 columns)
export function HomeServicesSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 sm:h-10 w-64 mx-auto bg-gray-200" />
          <Skeleton className="h-1 w-20 mx-auto mt-4 bg-primary/50" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-light-gray overflow-hidden rounded-lg">
              <Skeleton className="h-40 w-full bg-gray-300" />
              <div className="p-4 sm:p-6 text-center space-y-2">
                <Skeleton className="h-3 w-3/4 mx-auto bg-gray-300" />
                <Skeleton className="h-3 w-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Skeleton className="h-12 w-40 mx-auto bg-primary/30 rounded" />
        </div>
      </div>
    </section>
  )
}


// About Section Skeleton
export function AboutSectionSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex justify-center order-2 lg:order-1">
            <Skeleton className="w-48 h-60 sm:w-64 sm:h-80 md:w-80 md:h-96 bg-gray-200" />
          </div>
          <div className="bg-light-gray p-6 sm:p-8 md:p-10 lg:p-12 rounded-sm order-1 lg:order-2 space-y-4">
            <Skeleton className="h-8 w-3/4 bg-gray-300" />
            <Skeleton className="h-8 w-1/2 bg-primary/30" />
            <div className="space-y-3 pt-4">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-4/5 bg-gray-200" />
            </div>
            <Skeleton className="h-10 w-32 bg-primary/30 mt-6" />
          </div>
        </div>
      </div>
    </section>
  )
}

// Why Choose Us Skeleton
export function WhyChooseUsSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 sm:h-10 w-56 mx-auto bg-gray-200" />
          <Skeleton className="h-1 w-20 mx-auto mt-4 bg-primary/50" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mt-6 bg-gray-200" />
          <Skeleton className="h-4 w-2/3 max-w-xl mx-auto mt-2 bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white/90 p-6 sm:p-8 border-t-4 border-primary/30 shadow-md min-h-[140px]">
              <Skeleton className="h-5 w-2/3 bg-gray-300 mb-3" />
              <Skeleton className="h-3 w-full bg-gray-200" />
              <Skeleton className="h-3 w-5/6 bg-gray-200 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Supported Living Section Skeleton
export function SupportedLivingSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4">
            <Skeleton className="h-8 sm:h-10 w-3/4 bg-gray-300" />
            <Skeleton className="h-1 w-20 bg-primary/50" />
            <Skeleton className="h-4 w-full bg-gray-200" />
            <Skeleton className="h-4 w-5/6 bg-gray-200" />
            <Skeleton className="h-4 w-4/5 bg-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full bg-primary/30" />
                  <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>
              ))}
            </div>
            <Skeleton className="h-10 w-32 bg-primary/30 mt-4" />
          </div>
          <Skeleton className="aspect-[4/3] rounded-lg bg-gray-300" />
        </div>
      </div>
    </section>
  )
}

// Team Section Skeleton
export function TeamSectionSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 sm:h-10 w-48 mx-auto bg-gray-300" />
          <Skeleton className="h-1 w-20 mx-auto mt-4 bg-primary/50" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto mt-6 bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-4 sm:p-6 text-center shadow-md">
              <Skeleton className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full mx-auto bg-gray-300" />
              <Skeleton className="h-4 w-24 mx-auto mt-4 bg-primary/30" />
              <Skeleton className="h-3 w-20 mx-auto mt-2 bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section Skeleton
export function TestimonialsSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <Skeleton className="h-8 sm:h-10 w-64 mx-auto bg-gray-200" />
          <Skeleton className="h-1 w-20 mx-auto mt-4 bg-primary/50" />
          <Skeleton className="h-4 w-full max-w-xl mx-auto mt-6 bg-gray-200" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-light-gray p-6 rounded-lg">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4 bg-yellow-200" />
                ))}
              </div>
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200 mt-2" />
              <Skeleton className="h-4 w-3/4 bg-gray-200 mt-2" />
              <div className="flex items-center gap-3 mt-6">
                <Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
                <div>
                  <Skeleton className="h-4 w-24 bg-gray-300" />
                  <Skeleton className="h-3 w-20 bg-gray-200 mt-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


// Page Banner Skeleton
export function PageBannerSkeleton() {
  return (
    <section className="relative bg-secondary py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <Skeleton className="h-10 sm:h-12 w-64 mx-auto bg-white/20" />
        <div className="flex justify-center items-center gap-2 mt-4">
          <Skeleton className="h-4 w-16 bg-white/10" />
          <Skeleton className="h-4 w-4 bg-primary/30" />
          <Skeleton className="h-4 w-24 bg-primary/30" />
        </div>
      </div>
    </section>
  )
}

// Contact Form Skeleton
export function ContactFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-32 w-full bg-gray-100 rounded" />
      </div>
      <Skeleton className="h-12 w-full bg-primary/30 rounded" />
    </div>
  )
}

// Contact Info Skeleton
export function ContactInfoSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full bg-primary/20" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-20 bg-gray-300" />
            <Skeleton className="h-4 w-full bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}

// About Page Content Skeleton
export function AboutContentSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48 bg-gray-300" />
            <Skeleton className="h-1 w-20 bg-primary/50" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-4/5 bg-gray-200" />
            </div>
            <Skeleton className="h-8 w-40 bg-gray-300 mt-6" />
            <Skeleton className="h-1 w-16 bg-primary/50" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-3/4 bg-gray-200" />
            </div>
          </div>
          <Skeleton className="aspect-[4/3] rounded-lg bg-gray-200" />
        </div>
      </div>
    </section>
  )
}

// Service Detail Skeleton
export function ServiceDetailSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="aspect-video rounded-lg bg-gray-200" />
            <Skeleton className="h-8 w-3/4 bg-gray-300" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-4/5 bg-gray-200" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-light-gray p-6 rounded-lg space-y-4">
              <Skeleton className="h-6 w-32 bg-gray-300" />
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Banner Skeleton
export function CtaBannerSkeleton() {
  return (
    <section className="bg-primary/30 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-center md:gap-10 lg:gap-14">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-white/30" />
            <div>
              <Skeleton className="h-3 w-20 bg-white/20" />
              <Skeleton className="h-5 w-32 bg-white/30 mt-1" />
            </div>
          </div>
          <Skeleton className="hidden md:block w-px h-10 bg-white/20" />
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-white/30" />
            <div>
              <Skeleton className="h-3 w-16 bg-white/20" />
              <Skeleton className="h-5 w-40 bg-white/30 mt-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// NDIS Page Skeleton
export function NdisSkeleton() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64 bg-gray-300" />
            <Skeleton className="h-1 w-20 bg-primary/50" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-full bg-gray-200" />
              <Skeleton className="h-4 w-5/6 bg-gray-200" />
            </div>
            <Skeleton className="h-6 w-48 bg-gray-300 mt-4" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-full bg-primary/30" />
                  <Skeleton className="h-4 w-48 bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
          <Skeleton className="aspect-[4/3] rounded-lg bg-gray-200" />
        </div>
      </div>
    </section>
  )
}

// Feedback Form Skeleton
export function FeedbackFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <Skeleton className="h-5 w-24 bg-gray-200 rounded-full" />
        <Skeleton className="h-5 w-24 bg-gray-200 rounded-full" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28 bg-gray-200" />
          <Skeleton className="h-10 w-full bg-gray-100 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20 bg-gray-200" />
        <Skeleton className="h-32 w-full bg-gray-100 rounded" />
      </div>
      <Skeleton className="h-12 w-full bg-primary/30 rounded" />
    </div>
  )
}


// Top Bar Skeleton
export function TopBarSkeleton() {
  return (
    <div className="hidden sm:block bg-secondary text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-white/20 rounded animate-pulse" />
            <div className="h-3 w-28 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-white/20 rounded animate-pulse" />
            <div className="h-3 w-36 bg-white/20 rounded animate-pulse hidden md:block" />
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-4 bg-white/20 rounded animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Header Skeleton
export function HeaderSkeleton() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="hidden lg:flex items-center gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="h-10 w-28 bg-primary/30 rounded animate-pulse" />
        </div>
      </div>
    </header>
  )
}

// Footer Skeleton
export function FooterSkeleton() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="h-10 w-40 bg-white/20 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="flex gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-10 bg-white/10 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-5 w-24 bg-white/20 rounded animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 w-20 bg-white/10 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-5 w-24 bg-white/20 rounded animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-5 w-5 bg-primary/30 rounded animate-pulse" />
                  <div className="space-y-1 flex-1">
                    <div className="h-3 w-16 bg-white/20 rounded animate-pulse" />
                    <div className="h-3 w-full bg-white/10 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 bg-secondary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="h-4 w-64 mx-auto bg-white/10 rounded animate-pulse" />
        </div>
      </div>
    </footer>
  )
}

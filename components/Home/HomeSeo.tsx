"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function HomeSeo() {
  // Use SEO data for home page
  useSEOMeta({
    pageId: 'home',
    fallback: {
      title: 'Elegant Care Service | NDIS Disability Service Provider',
      description: 'Professional NDIS disability support services. We provide supported independent living, respite support, community participation, and personalized care services.',
      keywords: 'NDIS provider, disability support, supported independent living, respite care, community participation'
    }
  })

  // This component doesn't render anything visible, it just handles SEO
  return null
}

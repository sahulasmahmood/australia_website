"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function AboutSeo() {
  useSEOMeta({
    pageId: 'about',
    fallback: {
      title: 'About Us | Elegant Care Service',
      description: 'Learn about our mission, values, and dedication to providing exceptional NDIS disability support services in Australia.',
      keywords: 'about us, NDIS provider, disability support, mission, values'
    }
  })

  return null
}

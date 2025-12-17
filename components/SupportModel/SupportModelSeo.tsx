"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function SupportModelSeo() {
  useSEOMeta({
    pageId: 'support-model',
    fallback: {
      title: 'Our Support Model | Elegant Care Service',
      description: 'Discover our person-centered support models designed to empower individuals with disabilities to achieve their goals.',
      keywords: 'NDIS support model, person-centered care, disability support, empowerment, collaborative support'
    }
  })

  return null
}

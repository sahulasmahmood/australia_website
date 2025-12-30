"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function ServicesSeo() {
  useSEOMeta({
    pageId: 'services',
    fallback: {
      title: 'Our Services | Elegant Care Service',
      description: 'Explore our comprehensive range of NDIS services including supported independent living, community participation, and respite care.',
      keywords: 'NDIS services, supported living, respite care, community participation, disability support'
    }
  })

  return null
}

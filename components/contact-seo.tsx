"use client"

import { useSEOMeta } from "@/hooks/use-seo-meta"

export function ContactSeo() {
  useSEOMeta({
    pageId: 'contact',
    fallback: {
      title: 'Contact Us | Elegant Care Service',
      description: 'Get in touch with Elegant Care Service for NDIS support. We are here to answer your questions and help you find the right care.',
      keywords: 'contact us, NDIS support, disability services inquiry, get in touch'
    }
  })

  return null
}

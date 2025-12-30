import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { Footer } from "@/components/footer"
import { ContactSeo } from "@/components/Contact/ContactSeo"
import { ContactContent } from "@/components/Contact/ContactContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Contact Us | Elegant Care Service',
  description: 'Get in touch with Elegant Care Service for NDIS support. We are here to answer your questions and help you find the right care.',
  keywords: 'contact us, NDIS support, disability services inquiry, get in touch'
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactSeo />
      <TopBar />
      <Header />
      <DynamicPageBanner
        pageKey="contact"
        title="CONTACT US"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <ContactContent />
      <Footer />
    </main>
  )
}

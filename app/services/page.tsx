import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { ServicesSeo } from "@/components/Services/ServicesSeo"
import { ServicesContent } from "@/components/Services/ServicesContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Our Services | Elegant Care Service',
  description: 'Explore our comprehensive range of NDIS services including supported independent living, community participation, and respite care.',
  keywords: 'NDIS services, supported living, respite care, community participation, disability support'
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <ServicesSeo />
      <TopBar />
      <Header />
      <DynamicPageBanner
        pageKey="services"
        title="OUR SERVICES"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
        ]}
      />
      <ServicesContent />
      <CtaBanner />
      <Footer />
    </main>
  )
}

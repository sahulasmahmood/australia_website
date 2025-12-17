import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { SupportModelSeo } from "@/components/SupportModel/SupportModelSeo"
import { SupportModelContent } from "@/components/SupportModel/SupportModelContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Our Support Model | Elegant Care Service',
  description: 'Discover our person-centered support models designed to empower individuals with disabilities to achieve their goals.',
  keywords: 'NDIS support model, person-centered care, disability support, empowerment, collaborative support'
}

export default function SupportModelPage() {
  return (
    <main className="min-h-screen">
      <SupportModelSeo />
      <TopBar />
      <Header />
      <DynamicPageBanner
        pageKey="support-model"
        title="OUR SUPPORT MODEL"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Support Model", href: "/support-model" },
        ]}
      />
      <SupportModelContent />
      <CtaBanner />
      <Footer />
    </main>
  )
}

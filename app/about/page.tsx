import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { AboutSeo } from "@/components/About/AboutSeo"
import { AboutContent } from "@/components/About/AboutContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'About Us | Elegant Care Service',
  description: 'Learn about our mission, values, and dedication to providing exceptional NDIS disability support services in Australia.',
  keywords: 'about us, NDIS provider, disability support, mission, values'
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutSeo />
      <TopBar />
      <Header />
      <DynamicPageBanner
        pageKey="about"
        title="ABOUT US"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />
      <AboutContent />
      <CtaBanner />
      <Footer />
    </main>
  )
}

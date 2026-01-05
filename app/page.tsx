import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { HomeSeo } from "@/components/Home/HomeSeo"
import { HomeContent } from "@/components/Home/HomeContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Elegant Care Service | NDIS Disability Service Provider',
  description: 'Professional NDIS disability support services. We provide supported independent living, respite support, community participation, and personalized care services.',
  keywords: 'NDIS provider, disability support, supported independent living, respite care, community participation'
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <HomeSeo />
      <TopBar />
      <Header />
      <HomeContent />
      <CtaBanner />
      <Footer />
    </main>
  )
}

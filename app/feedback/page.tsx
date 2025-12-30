import { TopBar } from "@/components/top-bar"
import { Header } from "@/components/header"
import { DynamicPageBanner } from "@/components/DynamicPageBanner"
import { Footer } from "@/components/footer"
import { CtaBanner } from "@/components/cta-banner"
import { FeedbackSeo } from "@/components/Feedback/FeedbackSeo"
import { FeedbackContent } from "@/components/Feedback/FeedbackContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Feedback | Elegant Care Service",
  description:
    "We value your feedback! Share your compliments, suggestions, or concerns about our NDIS support services. Your input helps us improve and deliver better care.",
  keywords: "feedback, customer feedback, service feedback, NDIS feedback, compliments, suggestions, concerns",
}

export default function FeedbackPage() {
  return (
    <main className="min-h-screen">
      <FeedbackSeo />
      <TopBar />
      <Header />
      <DynamicPageBanner
        pageKey="feedback"
        title="FEEDBACK"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Feedback", href: "/feedback" },
        ]}
      />
      <FeedbackContent />
      <CtaBanner />
      <Footer />
    </main>
  )
}

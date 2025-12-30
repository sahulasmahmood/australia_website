import type React from "react"
import type { Metadata } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { GoogleAuthProvider } from "@/components/providers/google-auth-provider"
import { SEOProvider } from "@/components/providers/seo-provider"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Elegant Care Service | NDIS Disability Service Provider",
  description:
    "Professional NDIS disability support services. We provide supported independent living, respite support, community participation, and personalized care services.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable} font-sans antialiased`}>
        <GoogleAuthProvider>
          <SEOProvider>
            {children}
          </SEOProvider>
        </GoogleAuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

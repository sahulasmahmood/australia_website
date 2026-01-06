import type React from "react"
import type { Metadata } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { GoogleAuthProvider } from "@/components/providers/google-auth-provider"
import { SEOProvider } from "@/components/providers/seo-provider"
import { Toaster } from "@/components/ui/toaster"
import { DynamicMetadata } from "@/components/DynamicMetadata"
import FloatingContactButtons from "@/components/FloatingContactButtons"

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
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="primary" />
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <GoogleAuthProvider>
          <SEOProvider>
            <DynamicMetadata />
            {children}
          </SEOProvider>
        </GoogleAuthProvider>
        <FloatingContactButtons />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/landingPage/header"
import { LanguageProvider } from "@/contexts/language-contexts"
import { getSettings } from "@/lib/cms/site-settings"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Azizi Egatri M. — Portfolio",
  description: "Portfolio showcasing delightful digital experiences merging thoughtful design with robust engineering",
  icons: {
    icon: [
      {
        url: "/images/logo-Portfolio.png",
        sizes: "32x32",
        type: "image/jpeg",
      },
    ],
    apple: "/images/logo-portfolio.png",
    shortcut: "/images/logo-portfolio.png",
  },
  openGraph: {
    title: "Azizi Egatri M. — Portfolio",
    description: "Portfolio showcasing delightful digital experiences merging thoughtful design with robust engineering",
    url: "https://aziziem.vercel.app",
    siteName: "Azizi Egatri M. Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azizi Egatri M. — Portfolio",
    description: "Portfolio showcasing delightful digital experiences merging thoughtful design with robust engineering",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let settings = {}
  try {
    settings = await getSettings()
  } catch (error) {
    console.error("Failed to load settings in root layout:", error)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <LanguageProvider initialSettings={settings}>
          <Header />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}

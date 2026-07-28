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
  metadataBase: new URL("https://aziziem.xyz"),
  title: {
    default: "Azizi Egatri M. — Portfolio",
    template: "%s | Azizi Egatri Mu'thi",
  },
  description:
    "Azizi Egatri Mu'thi (aziziem) — Software Engineer & Product Builder based in Indonesia. Building scalable web products, innovative digital platforms, and user-centric solutions that solve real-world problems.",
  keywords: [
    "AZIZI EGATRI MU'THI",
    "Azizi Egatri Muthi",
    "azizi egatri muthi",
    "Azizi Egatri",
    "aziziem",
    "aziziem.xyz",
    "Software Engineer Indonesia",
    "Product Builder Indonesia",
    "Fullstack Developer Indonesia",
    "Next.js Developer",
    "React Developer",
    "Web Developer Jawa Tengah",
    "Portfolio Azizi",
  ],
  authors: [{ name: "Azizi Egatri Mu'thi", url: "https://aziziem.xyz" }],
  creator: "Azizi Egatri Mu'thi",
  publisher: "Azizi Egatri Mu'thi",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aziziem.xyz",
  },
  verification: {
    google: "a4239bfafc97e332",
  },
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
    title: "AZIZI EGATRI MU'THI — Software Engineer & Product Builder",
    description:
      "Building scalable web products, innovative digital platforms, and user-centric solutions that solve real-world problems.",
    url: "https://aziziem.xyz",
    siteName: "Azizi Egatri Mu'thi — aziziem.xyz",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AZIZI EGATRI MU'THI — Software Engineer & Product Builder",
    description:
      "Building scalable web products, innovative digital platforms, and user-centric solutions that solve real-world problems.",
    creator: "@aziziem",
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

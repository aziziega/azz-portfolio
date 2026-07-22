import type React from "react"
import type { Metadata } from "next"
import { LanguageProvider } from "@/contexts/language-contexts"

export const metadata: Metadata = {
  title: "Resume — Azizi Egatri Muthi",
  description: "Resume of Azizi Egatri Muthi, Fullstack Web Developer based in Jawa Tengah, Indonesia.",
}

/**
 * Dedicated layout for the /resume route.
 * Intentionally does NOT render the global Header so the resume page
 * can stand alone with its own action bar.
 */
export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { LanguageProvider } from "@/contexts/language-contexts"

export const metadata: Metadata = {
  title: "Resume — AZIZI EGATRI MU'THI | Software Engineer & Product Builder",
  description:
    "Resume of Azizi Egatri Mu'thi (aziziem) — Software Engineer & Product Builder based in Jawa Tengah, Indonesia. Specializing in Next.js, React, TypeScript, Supabase, and full-stack web product development.",
  keywords: [
    "Azizi Egatri Muthi resume",
    "aziziem CV",
    "Software Engineer resume Indonesia",
    "Fullstack Developer CV",
    "Next.js developer resume",
  ],
  alternates: {
    canonical: "https://aziziem.xyz/resume",
  },
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

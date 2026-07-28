import { Metadata } from "next"
import WorkPageClient from "@/components/work/work-page-client"

export const metadata: Metadata = {
  title: "Projects by AZIZI EGATRI MU'THI — Product Engineering Portfolio",
  description:
    "Explore projects built by Azizi Egatri Mu'thi (aziziem) — CRM systems, ERP solutions, finance platforms, content management systems, and scalable web applications engineered with Next.js, React, TypeScript, and Supabase.",
  keywords: [
    "Azizi Egatri Muthi projects",
    "aziziem portfolio",
    "AZIZI EGATRI MUTHI portfolio",
    "Next.js projects",
    "web development portfolio Indonesia",
    "CRM ERP web app",
  ],
  alternates: {
    canonical: "https://aziziem.xyz/work",
  },
  openGraph: {
    title: "Projects by AZIZI EGATRI MU'THI — Product Engineering Portfolio",
    description:
      "CRM systems, ERP solutions, finance platforms, and scalable web applications by Azizi Egatri Mu'thi.",
    url: "https://aziziem.xyz/work",
    type: "website",
  },
}

export default function WorkPage() {
  return <WorkPageClient />
}

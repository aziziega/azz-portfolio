import { Metadata } from "next"
import WorkPageClient from "@/components/work/work-page-client"

export const metadata: Metadata = {
  title: "Work - Portfolio Projects | Azizi E.M.",
  description: "Explore my portfolio of web development projects including CRM systems, ERP solutions, finance trackers, and content management systems built with Next.js, React, and modern technologies.",
  openGraph: {
    title: "Work - Portfolio Projects | Azizi E.M.",
    description: "Explore my portfolio of web development projects including CRM systems, ERP solutions, finance trackers, and content management systems.",
    type: "website",
  },
}

export default function WorkPage() {
  return <WorkPageClient />
}

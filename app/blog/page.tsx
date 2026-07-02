import { Metadata } from "next"
import BlogPageClient from "@/components/blog/blog-page-client"

export const metadata: Metadata = {
  title: "Writing Hub - External Notes & Articles | Azizi E.M.",
  description: "Curated external writing, technical notes, build logs, and implementation references from Azizi E.M.",
  openGraph: {
    title: "Writing Hub - External Notes & Articles | Azizi E.M.",
    description: "Curated external writing, technical notes, build logs, and implementation references from Azizi E.M.",
    type: "website",
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}

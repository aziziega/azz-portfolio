import { Metadata } from "next"
import BlogPageClient from "@/components/blog/blog-page-client"

export const metadata: Metadata = {
  title: "Writing — Notes & Articles by Azizi Egatri Mu'thi | aziziem.xyz",
  description:
    "Technical notes, build logs, implementation references, and articles by Azizi Egatri Mu'thi (aziziem) — Software Engineer & Product Builder from Indonesia.",
  alternates: {
    canonical: "https://aziziem.xyz/blog",
  },
  openGraph: {
    title: "Writing — Notes & Articles by Azizi Egatri Mu'thi | aziziem.xyz",
    description:
      "Technical notes, build logs, and articles by Azizi Egatri Mu'thi (aziziem).",
    url: "https://aziziem.xyz/blog",
    type: "website",
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}

import { Metadata } from "next"
import BlogPageClient from "@/components/blog/blog-page-client"

export const metadata: Metadata = {
  title: "Blog - Thoughts & Tutorials | Azizi E.M.",
  description: "Technical articles, tutorials, and insights about web development, fullstack engineering, and software best practices.",
  openGraph: {
    title: "Blog - Thoughts & Tutorials | Azizi E.M.",
    description: "Technical articles, tutorials, and insights about web development, fullstack engineering, and software best practices.",
    type: "website",
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}

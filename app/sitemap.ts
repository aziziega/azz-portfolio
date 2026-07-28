import { MetadataRoute } from "next"
import { createAdminClient } from "@/lib/supabase/admin"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aziziem.xyz"

  // Base static routes with granular priorities
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  try {
    const supabase = createAdminClient()

    // Dynamic project pages
    const { data: projects } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("status", "published")

    if (projects && projects.length > 0) {
      const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${siteUrl}/work/${p.slug}`,
        lastModified: new Date(p.updated_at || new Date()),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
      routes.push(...projectRoutes)
    }

    // Dynamic writing/blog pages
    const { data: writings } = await supabase
      .from("writings")
      .select("slug, updated_at")
      .eq("status", "published")

    if (writings && writings.length > 0) {
      const writingRoutes: MetadataRoute.Sitemap = writings.map((w) => ({
        url: `${siteUrl}/blog/${w.slug}`,
        lastModified: new Date(w.updated_at || new Date()),
        changeFrequency: "monthly",
        priority: 0.7,
      }))
      routes.push(...writingRoutes)
    }
  } catch (err) {
    console.error("Dynamic sitemap generation error:", err)
  }

  return routes
}

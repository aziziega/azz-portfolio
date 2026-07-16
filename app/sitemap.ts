import { MetadataRoute } from "next"
import { createAdminClient } from "@/lib/supabase/admin"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aziziem.vercel.app"

  // Base static routes
  const routes = [
    "",
    "/work",
    "/blog",
    "/resume"
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }))

  try {
    const supabase = createAdminClient()
    const { data: projects } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("status", "published")

    if (projects && projects.length > 0) {
      const projectRoutes = projects.map((p) => ({
        url: `${siteUrl}/work/${p.slug}`,
        lastModified: new Date(p.updated_at || new Date()),
        changeFrequency: "monthly" as const,
        priority: 0.6
      }))
      return [...routes, ...projectRoutes]
    }
  } catch (err) {
    console.error("Dynamic sitemap generation error:", err)
  }

  return routes
}

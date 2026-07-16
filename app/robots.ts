import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aziziem.vercel.app"

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/work", "/blog", "/resume"],
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}

import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aziziem.xyz"

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/work", "/work/", "/blog", "/resume"],
        disallow: ["/admin/", "/api/", "/_next/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/work/", "/blog/", "/resume"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

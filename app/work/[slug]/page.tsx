export const dynamic = "force-dynamic"

import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getRawProjectBySlug, getAllPublicSlugs } from "@/lib/cms/projects"
import ProjectDetailClient from "@/components/work/project-detail-client"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getRawProjectBySlug(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  const titleText = project.seo_title?.en || project.title?.en || ""
  const taglineText = project.tagline?.en || ""
  const descriptionText = project.seo_description?.en || project.description?.en || ""
  const thumbnailUrl = project.thumbnail_url || ""

  return {
    title: `${titleText} — Built by Azizi Egatri Mu'thi | aziziem.xyz`,
    description: descriptionText,
    alternates: {
      canonical: `https://aziziem.xyz/work/${slug}`,
    },
    openGraph: {
      title: `${titleText} — Built by Azizi Egatri Mu'thi`,
      description: taglineText,
      type: "website",
      url: `https://aziziem.xyz/work/${slug}`,
      images: [{ url: thumbnailUrl }],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getRawProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const allSlugs = await getAllPublicSlugs()
  const currentIndex = allSlugs.indexOf(slug)
  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null

  const titleText = project.seo_title?.en || project.title?.en || ""
  const descriptionText = project.seo_description?.en || project.description?.en || ""
  const thumbnailUrl = project.thumbnail_url || ""

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": titleText,
    "description": descriptionText,
    "url": `https://aziziem.xyz/work/${slug}`,
    "image": thumbnailUrl,
    "author": {
      "@type": "Person",
      "@id": "https://aziziem.xyz/#person",
      "name": "Azizi Egatri Mu'thi",
      "url": "https://aziziem.xyz",
    },
    "creator": {
      "@type": "Person",
      "@id": "https://aziziem.xyz/#person",
      "name": "Azizi Egatri Mu'thi",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <ProjectDetailClient 
        project={project} 
        previousSlug={previousSlug} 
        nextSlug={nextSlug} 
      />
    </>
  )
}

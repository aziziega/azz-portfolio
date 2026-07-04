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

  const titleText = project.title?.en || ""
  const taglineText = project.tagline?.en || ""
  const descriptionText = project.description?.en || ""
  const thumbnailUrl = project.thumbnail_url || ""

  return {
    title: `${titleText} - Portfolio Project | Azizi E.M.`,
    description: descriptionText,
    openGraph: {
      title: titleText,
      description: taglineText,
      type: "website",
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

  return (
    <ProjectDetailClient 
      project={project} 
      previousSlug={previousSlug} 
      nextSlug={nextSlug} 
    />
  )
}

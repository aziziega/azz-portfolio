import { Metadata } from "next"
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects"
import { notFound } from "next/navigation"
import ProjectDetailClient from "@/components/work/project-detail-client"

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug, "en")

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} - Portfolio Project | Azizi E.M.`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "website",
      images: [{ url: project.thumbnail }],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug, "en")

  if (!project) {
    notFound()
  }

  const allSlugs = getAllProjectSlugs()
  const currentIndex = allSlugs.indexOf(slug)
  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null

  return (
    <ProjectDetailClient 
      slug={slug} 
      previousSlug={previousSlug} 
      nextSlug={nextSlug} 
    />
  )
}

import { Metadata } from "next"
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects"
import { notFound } from "next/navigation"
import HeroSection from "@/components/work/project-detail/hero-section"
import TechStack from "@/components/work/project-detail/tech-stack"
import FeaturesSection from "@/components/work/project-detail/features-section"
import ChallengesSection from "@/components/work/project-detail/challenges-section"
import OutcomesSection from "@/components/work/project-detail/outcomes-section"
import ImageGallery from "@/components/work/project-detail/image-gallery"
import ProjectNavigation from "@/components/work/project-detail/navigation"

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug, "en")

  if (!project) {
    return {
      title: "Project Not Found",
    }
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

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // Get project data (default to English for now)
  const project = getProjectBySlug(params.slug, "en")
  const allSlugs = getAllProjectSlugs()

  if (!project) {
    notFound()
  }

  return (
    <>
      <main>
        {/* Hero Section */}
        <HeroSection project={project} />

        {/* Problem Statement */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{project.problem}</p>
            </div>
          </div>
        </section>

        {/* Solution Overview */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">The Solution</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <FeaturesSection features={project.features} />

        {/* Tech Stack */}
        <TechStack techStack={project.techStack} />

        {/* Image Gallery */}
        <ImageGallery images={project.images} title={project.title} />

        {/* Challenges & Solutions */}
        <ChallengesSection challenges={project.challenges} />

        {/* Results & Outcomes */}
        <OutcomesSection outcomes={project.outcomes} />

        {/* Design Process (if available) */}
        {project.designProcess && project.designProcess.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container">
              <h2 className="text-3xl font-bold mb-12">Design Process</h2>
              <div className="max-w-4xl mx-auto space-y-8">
                {project.designProcess.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-gray-700 text-lg leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Lessons Learned (if available) */}
        {project.lessonsLearned && project.lessonsLearned.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="container">
              <h2 className="text-3xl font-bold mb-12">Lessons Learned</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {project.lessonsLearned.map((lesson, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-lg shadow-sm border border-blue-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <p className="flex-1 text-gray-700 leading-relaxed">{lesson}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Project Navigation */}
        <ProjectNavigation currentSlug={params.slug} allSlugs={allSlugs} />
      </main>
    </>
  )
}

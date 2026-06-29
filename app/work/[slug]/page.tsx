import { Metadata } from "next"
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects"
import { notFound } from "next/navigation"
import Link from "next/link"
import ImageGallery from "@/components/work/project-detail/image-gallery"

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
  const allSlugs = getAllProjectSlugs()

  if (!project) {
    notFound()
  }

  const currentIndex = allSlugs.indexOf(slug)
  const previousSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null

  return (
    <main className="detail-page">
      {/* Hero */}
      <section className="detail-hero">
        <Link href="/work" className="detail-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
          </svg>
          Back to All Projects
        </Link>

        <div className="detail-meta-row">
          <span className="detail-category">{project.category}</span>
          <span className="detail-meta-sep">/</span>
          <span className="detail-year">{project.year}</span>
          {project.featured && (
            <>
              <span className="detail-meta-sep">/</span>
              <span className="detail-featured-badge">Featured</span>
            </>
          )}
        </div>

        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-tagline">{project.tagline}</p>

        <div className="detail-actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="detail-btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="detail-btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              View Code
            </a>
          )}
        </div>

        <div className="detail-info-grid">
          <div className="detail-info-item">
            <span className="detail-info-label">Client</span>
            <span className="detail-info-value">{project.client}</span>
          </div>
          <div className="detail-info-item">
            <span className="detail-info-label">Role</span>
            <span className="detail-info-value">{project.role}</span>
          </div>
          <div className="detail-info-item">
            <span className="detail-info-label">Duration</span>
            <span className="detail-info-value">{project.duration}</span>
          </div>
          <div className="detail-info-item">
            <span className="detail-info-label">Team</span>
            <span className="detail-info-value">{project.teamSize}</span>
          </div>
        </div>
      </section>

      <hr className="detail-divider" />

      {/* Challenge & Solution */}
      <section className="detail-content">
        <div className="detail-text-block">
          <span className="detail-section-title">The Challenge</span>
          <p>{project.problem}</p>
        </div>
        <div className="detail-text-block">
          <span className="detail-section-title">The Solution</span>
          <p>{project.solution}</p>
        </div>
      </section>

      <hr className="detail-divider" />

      {/* Gallery */}
      <section className="detail-gallery">
        <span className="detail-section-title">Project Gallery</span>
        <ImageGallery images={project.images} title={project.title} />
      </section>

      <hr className="detail-divider" />

      {/* Features + Tech Stack side-by-side */}
      <section className="detail-content">
        <div className="detail-two-col">
          <div>
            <span className="detail-section-title">Key Features</span>
            <ul className="detail-feature-list">
              {project.features.map((feature, index) => (
                <li key={index} className="detail-feature-item">
                  <span className="detail-feature-number">{index + 1}</span>
                  <span className="detail-feature-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="detail-section-title">Tech Stack</span>
            <div className="detail-tech-list">
              {project.techStack.map((tech) => (
                <span key={tech} className="detail-tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="detail-divider" />

      {/* Challenges */}
      <section className="detail-content">
        <span className="detail-section-title">Challenges &amp; Solutions</span>
        <div className="detail-challenge-list">
          {project.challenges.map((challenge, index) => (
            <div key={index} className="detail-challenge-card">
              <p>{challenge}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="detail-divider" />

      {/* Outcomes */}
      <section className="detail-content">
        <span className="detail-section-title">Results &amp; Impact</span>
        <div className="detail-outcome-list">
          {project.outcomes.map((outcome, index) => (
            <div key={index} className="detail-outcome-item">
              <svg className="detail-outcome-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="detail-outcome-text">{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Design Process + Lessons Learned (if available) */}
      {((project.designProcess && project.designProcess.length > 0) ||
        (project.lessonsLearned && project.lessonsLearned.length > 0)) && (
        <>
          <hr className="detail-divider" />
          <section className="detail-content">
            <div className="detail-two-col">
              {project.designProcess && project.designProcess.length > 0 && (
                <div>
                  <span className="detail-section-title">Design Process</span>
                  <div className="detail-process-list">
                    {project.designProcess.map((step, index) => (
                      <div key={index} className="detail-process-item">
                        <span className="detail-process-step">{String(index + 1).padStart(2, "0")}</span>
                        <span className="detail-process-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {project.lessonsLearned && project.lessonsLearned.length > 0 && (
                <div>
                  <span className="detail-section-title">Lessons Learned</span>
                  <div className="detail-lesson-list">
                    {project.lessonsLearned.map((lesson, index) => (
                      <div key={index} className="detail-lesson-item">
                        <span className="detail-lesson-dot" />
                        <span className="detail-lesson-text">{lesson}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      <hr className="detail-divider" />

      {/* Project Navigation */}
      <nav className="detail-nav">
        {previousSlug ? (
          <Link href={`/work/${previousSlug}`} className="detail-nav-link detail-nav-prev">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Previous
          </Link>
        ) : (
          <span className="detail-nav-spacer" />
        )}
        {nextSlug ? (
          <Link href={`/work/${nextSlug}`} className="detail-nav-link detail-nav-next">
            Next
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        ) : (
          <span className="detail-nav-spacer" />
        )}
      </nav>
    </main>
  )
}

import { Metadata } from "next"
import { getAllProjects, getFeaturedProjects } from "@/data/projects"
import BentoGrid from "@/components/work/showcase/bento-grid"
import ProjectCard from "@/components/work/project-card"

export const metadata: Metadata = {
  title: "Work - Portfolio Projects | Azizi E.M.",
  description: "Explore my portfolio of web development projects including CRM systems, ERP solutions, finance trackers, and content management systems built with Next.js, React, and modern technologies.",
  openGraph: {
    title: "Work - Portfolio Projects | Azizi E.M.",
    description: "Explore my portfolio of web development projects including CRM systems, ERP solutions, finance trackers, and content management systems.",
    type: "website",
  },
}

export default function WorkPage() {
  // Get featured and all projects
  const featuredProjects = getFeaturedProjects("en")
  const allProjects = getAllProjects("en")
  
  // Get non-featured projects for regular grid
  const regularProjects = allProjects.filter(p => !p.featured)

  return (
    <>
      <main className="work-hybrid-main">
        {/* Hero Section */}
        <section className="work-hero">
          <div className="container">
            <div className="work-hero-content">
              <h1 className="work-hero-title">
                Selected Works
              </h1>
              <p className="work-hero-subtitle">
                A curated collection of projects that showcase my expertise in fullstack web development.
                From enterprise systems to consumer applications, each project represents a unique 
                challenge solved with modern technologies and best practices.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid - Featured Projects */}
        {featuredProjects.length > 0 && (
          <BentoGrid projects={featuredProjects} />
        )}

        {/* Regular Grid - Remaining Projects */}
        {regularProjects.length > 0 && (
          <section className="work-regular-section">
            <div className="container">
              <div className="work-regular-header">
                <h2 className="work-regular-title">More Projects</h2>
                <p className="work-regular-subtitle">
                  Additional work and side projects
                </p>
              </div>
              
              <div className="work-regular-grid">
                {regularProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="work-cta-section">
          <div className="container">
            <div className="work-cta-content">
              <h2 className="work-cta-title">
                Let's Build Something Amazing Together
              </h2>
              <p className="work-cta-text">
                Have a project in mind? I'm always open to discussing new opportunities 
                and interesting challenges.
              </p>
              <a href="/#contact" className="work-cta-button">
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

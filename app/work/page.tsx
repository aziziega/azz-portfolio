import { Metadata } from "next"
import { getAllProjects } from "@/data/projects"
import ProjectListItem from "@/components/work/project-list-item"

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
  const allProjects = getAllProjects("en").sort((a, b) => a.order - b.order)

  return (
    <main className="work-list-main">
      {/* Hero with Geometric Background */}
      <section className="work-list-hero">
        <div className="geometric-bg">
          <div className="geo-circle geo-circle-1" />
          <div className="geo-circle geo-circle-2" />
          <div className="geo-circle geo-circle-3" />
          <div className="geo-circle geo-circle-4" />
          <div className="geo-line geo-line-1" />
          <div className="geo-line geo-line-2" />
          <div className="geo-line geo-line-3" />
        </div>
        <div className="work-list-hero-content">
          <h1 className="work-list-hero-title">Selected Works</h1>
          <p className="work-list-hero-subtitle">
            A curated collection of projects that showcase my expertise in
            fullstack web development, from enterprise systems to consumer
            applications.
          </p>
        </div>
      </section>

      {/* Stacked List */}
      <section className="work-list-section">
        {allProjects.map((project, index) => (
          <ProjectListItem
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </section>

      {/* CTA Footer Section */}
      <section className="work-footer">
        <div className="work-footer-geo">
          <div className="work-footer-circle work-footer-circle-1" />
          <div className="work-footer-circle work-footer-circle-2" />
          <div className="work-footer-line work-footer-line-1" />
          <div className="work-footer-line work-footer-line-2" />
        </div>

        <div className="work-footer-inner">
          <span className="work-footer-label">Got a project?</span>
          <h2 className="work-footer-title">
            Let's Build Something<br />
            <span className="work-footer-title-accent">Amazing Together</span>
          </h2>
          <p className="work-footer-text">
            I'm always open to discussing new opportunities, interesting
            challenges, and creative collaborations.
          </p>
          <div className="work-footer-actions">
            <a href="/#contact" className="work-footer-btn-primary">
              Get In Touch
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a href="/" className="work-footer-btn-secondary">
              Back to Home
            </a>
          </div>

          <div className="work-footer-stats">
            <div className="work-footer-stat">
              <span className="work-footer-stat-number">{allProjects.length}</span>
              <span className="work-footer-stat-label">Projects</span>
            </div>
            <div className="work-footer-stat-divider" />
            <div className="work-footer-stat">
              <span className="work-footer-stat-number">{allProjects.filter(p => p.featured).length}</span>
              <span className="work-footer-stat-label">Featured</span>
            </div>
            <div className="work-footer-stat-divider" />
            <div className="work-footer-stat">
              <span className="work-footer-stat-number">{new Set(allProjects.flatMap(p => p.techStack)).size}+</span>
              <span className="work-footer-stat-label">Technologies</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

"use client"

import Link from "next/link"
import { Project } from "@/data/projects"
import { ExternalLink, FileText } from "lucide-react"

interface ProjectShowcaseCardProps {
  project: Project
  index: number
}

export default function ProjectShowcaseCard({ 
  project, 
  index 
}: ProjectShowcaseCardProps) {
  return (
    <section className="showcase-section">
      <div className="container">
        <div className="showcase-content">
          {/* Project Number Indicator */}
          <div className="showcase-number">
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Large Centered Project Image */}
          <div className="showcase-image-wrapper">
            <div className="showcase-image-container">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="showcase-image"
                loading="lazy"
              />
            </div>
          </div>

          {/* Project Info - Centered Below Image */}
          <div className="showcase-info">
            {/* Project Title */}
            <h2 className="showcase-title">
              {project.title}
            </h2>

            {/* Project Description/Tagline */}
            <p className="showcase-description">
              {project.tagline}
            </p>

            {/* Tech Stack Pills */}
            <div className="showcase-tech-stack">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="tech-pill">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="tech-pill">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="showcase-actions">
              {/* Read Case Study - Internal Link to Detail Page */}
              <Link 
                href={`/work/${project.slug}`}
                className="btn-showcase-primary"
              >
                <FileText size={18} />
                <span>Read Case Study</span>
              </Link>

              {/* View Project - External Link to Live Site */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-showcase-secondary"
                >
                  <ExternalLink size={18} />
                  <span>View Project</span>
                </a>
              )}
            </div>

            {/* Additional Metadata */}
            <div className="showcase-meta">
              <span className="meta-item">{project.client}</span>
              <span className="meta-separator">•</span>
              <span className="meta-item">{project.year}</span>
              <span className="meta-separator">•</span>
              <span className="meta-item">{project.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

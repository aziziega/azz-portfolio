"use client"

import Link from "next/link"
import { Project } from "@/data/projects"
import { ExternalLink, FileText } from "lucide-react"

interface BentoCardProps {
  project: Project
  size: "large" | "medium" | "small"
}

export default function BentoCard({ project, size }: BentoCardProps) {
  const sizeClasses = {
    large: "bento-card-large",
    medium: "bento-card-medium",
    small: "bento-card-small"
  }

  return (
    <article className={`bento-card ${sizeClasses[size]}`}>
      {/* Project Image */}
      <div className="bento-card-image-wrapper">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="bento-card-image"
          loading="lazy"
        />
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="bento-badge">
            <span>Featured</span>
          </div>
        )}

        {/* Hover Overlay with Actions */}
        <div className="bento-overlay">
          <div className="bento-overlay-content">
            <Link 
              href={`/work/${project.slug}`}
              className="bento-btn-primary"
            >
              <FileText size={18} />
              <span>Read Case Study</span>
            </Link>
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-btn-secondary"
              >
                <ExternalLink size={18} />
                <span>View Project</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bento-card-content">
        {/* Category/Year Badge */}
        <div className="bento-meta">
          <span className="bento-category">{project.category}</span>
          <span className="bento-separator">•</span>
          <span className="bento-year">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="bento-title">
          <Link href={`/work/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        {/* Tagline */}
        <p className="bento-tagline">
          {project.tagline}
        </p>

        {/* Tech Stack Pills (show 3 for large, 2 for medium/small) */}
        <div className="bento-tech-stack">
          {project.techStack
            .slice(0, size === "large" ? 3 : 2)
            .map((tech) => (
              <span key={tech} className="bento-tech-pill">
                {tech}
              </span>
            ))}
          {project.techStack.length > (size === "large" ? 3 : 2) && (
            <span className="bento-tech-pill bento-tech-more">
              +{project.techStack.length - (size === "large" ? 3 : 2)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

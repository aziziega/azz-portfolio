"use client"

import Link from "next/link"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import { Project } from "@/data/projects"

interface ProjectListItemProps {
  project: Project
  index: number
}

export default function ProjectListItem({ project, index }: ProjectListItemProps) {
  const number = String(index + 1).padStart(2, "0")

  return (
    <Link href={`/work/${project.slug}`} className="project-list-item">
      <span className="project-list-number">{number}</span>

      <div className="project-list-info">
        <h3 className="project-list-title">{project.title}</h3>

        <div className="project-list-meta">
          <span className="project-list-category">{project.category}</span>
          <span className="project-list-meta-separator">/</span>
          <span className="project-list-year">{project.year}</span>
          {project.featured && (
            <>
              <span className="project-list-meta-separator">/</span>
              <span className="project-list-featured">Featured</span>
            </>
          )}
        </div>

        <div className="project-list-tags">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="project-list-tag">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="project-list-tag">+{project.techStack.length - 4}</span>
          )}
        </div>

        <div className="project-list-links">
          {project.liveUrl && (
            <span
              className="project-list-link"
              onClick={(e) => {
                e.preventDefault()
                window.open(project.liveUrl, "_blank")
              }}
            >
              <ExternalLink /> Live
            </span>
          )}
          {project.githubUrl && (
            <span
              className="project-list-link"
              onClick={(e) => {
                e.preventDefault()
                window.open(project.githubUrl, "_blank")
              }}
            >
              <Github /> Code
            </span>
          )}
        </div>
      </div>

      <div className="project-list-right">
        <div className="project-list-preview">
          <img src={project.thumbnail} alt={project.title} />
        </div>
        <div className="project-list-arrow">
          <ArrowRight size={24} />
        </div>
      </div>
    </Link>
  )
}

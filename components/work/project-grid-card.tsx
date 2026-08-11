"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { ExternalLink, Github, ArrowUpRight, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-contexts"
import { formatProjectDate } from "@/lib/work-utils"

interface ProjectGridCardProps {
  project: {
    id?: string
    slug: string
    title: string
    tagline?: string
    description?: string
    category?: string
    year?: number | string
    publishedAt?: string
    createdAt?: string
    created_at?: string
    published_at?: string
    date?: string
    techStack?: string[]
    featured?: boolean
    thumbnail?: string
    liveUrl?: string
    githubUrl?: string
  }
  index?: number
}

export default function ProjectGridCard({ project, index = 0 }: ProjectGridCardProps) {
  const { language, t } = useLanguage()

  const handleActionClick = (e: React.MouseEvent, url?: string) => {
    if (!url) return
    e.preventDefault()
    e.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const displayedTech = project.techStack?.slice(0, 4) || []
  const remainingTechCount = (project.techStack?.length || 0) - displayedTech.length
  const formattedDate = formatProjectDate(project, language)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true }}
      className="project-grid-card-wrapper group"
    >
      <Link href={`/work/${project.slug}`} className="project-grid-card-inner">
        {/* Thumbnail Image Container */}
        <div className="project-card-image-container">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="project-card-image"
            />
          ) : (
            <div className="project-card-image-placeholder">
              <span>{project.title.slice(0, 2).toUpperCase()}</span>
            </div>
          )}

          {/* Top Badges Overlay */}
          <div className="project-card-badges-top">
            {project.featured && (
              <Badge className="project-card-badge-featured">
                {t("work.featured") || "Featured"}
              </Badge>
            )}
          </div>

          {/* Hover Arrow Overlay */}
          <div className="project-card-hover-arrow">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="project-card-body">
          {/* Title & Tagline */}
          <div className="project-card-header-info">
            <h3 className="project-card-title">{project.title}</h3>
            {project.tagline && (
              <p className="project-card-tagline">{project.tagline}</p>
            )}
          </div>

          {/* Tech Stack Chips (WAJIB) */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="project-card-tech-stack">
              {displayedTech.map((tech) => (
                <span key={tech} className="project-card-tech-chip">
                  {tech}
                </span>
              ))}
              {remainingTechCount > 0 && (
                <span className="project-card-tech-chip more">
                  +{remainingTechCount}
                </span>
              )}
            </div>
          )}

          {/* Meta & Action Links Footer */}
          <div className="project-card-footer">
            <div className="project-card-meta">
              <Calendar className="w-3.5 h-3.5 text-blue-600 inline-block" />
              <span>{formattedDate}</span>
            </div>

            {/* Action Links (WAJIB Live & Code) */}
            <div className="project-card-actions">
              {project.liveUrl && (
                <button
                  type="button"
                  onClick={(e) => handleActionClick(e, project.liveUrl)}
                  className="project-card-action-btn live"
                  title="Live Demo"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live</span>
                </button>
              )}
              {project.githubUrl && (
                <button
                  type="button"
                  onClick={(e) => handleActionClick(e, project.githubUrl)}
                  className="project-card-action-btn code"
                  title="Source Code"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

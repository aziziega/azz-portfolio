"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import Link from "next/link"
import { ExternalLink, Github, ArrowUpRight, Calendar } from "lucide-react"
import { groupProjectsByYear, formatProjectDate } from "@/lib/work-utils"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-contexts"

interface WorkTimelineViewProps {
  projects: any[]
}

interface TimelineItemProps {
  project: any
  index: number
  isLeft: boolean
}

function TimelineItem({ project, index, isLeft }: TimelineItemProps) {
  const { language, t } = useLanguage()
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const formattedDate = formatProjectDate(project, language)

  const handleActionClick = (e: React.MouseEvent, url?: string) => {
    if (!url) return
    e.preventDefault()
    e.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const displayedTech = project.techStack?.slice(0, 5) || []

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, scale }}
      className="work-timeline-item-wrapper"
    >
      {/* Timeline Center Dot (Desktop) */}
      <div className="work-timeline-dot" />

      <div className={`work-timeline-item-grid ${isLeft ? "is-left" : "is-right"}`}>
        {/* Thumbnail Image */}
        <div className={`work-timeline-media ${isLeft ? "md:order-2" : "md:order-1"}`}>
          <Link href={`/work/${project.slug}`} className="work-timeline-media-link group">
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="work-timeline-img"
              />
            ) : (
              <div className="work-timeline-img-placeholder">
                <span>{project.title.slice(0, 2).toUpperCase()}</span>
              </div>
            )}
            <div className="work-timeline-media-overlay" />
            {project.featured && (
              <Badge className="work-timeline-badge-featured">
                {t("work.featured") || "Featured"}
              </Badge>
            )}
            <div className="work-timeline-hover-arrow">
              <ArrowUpRight className="w-5 h-5 text-white" />
            </div>
          </Link>
        </div>

        {/* Content Info */}
        <div className={`work-timeline-content ${isLeft ? "md:order-1 md:text-right" : "md:order-2"}`}>
          <div className="work-timeline-content-inner">
            <div className={`work-timeline-meta ${isLeft ? "md:justify-end" : ""}`}>
              <Calendar className="w-3.5 h-3.5 text-blue-600 inline" />
              <span className="work-timeline-year-text">{formattedDate}</span>
            </div>

            <Link href={`/work/${project.slug}`} className="group inline-block">
              <h3 className="work-timeline-title group-hover:text-blue-600">
                {project.title}
              </h3>
            </Link>

            {project.tagline && (
              <p className="work-timeline-tagline">{project.tagline}</p>
            )}

            {/* Tech Stack Chips (WAJIB) */}
            {displayedTech.length > 0 && (
              <div className={`work-timeline-tech-stack ${isLeft ? "md:justify-end" : ""}`}>
                {displayedTech.map((tech: string) => (
                  <span key={tech} className="work-timeline-tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Live & Code Action Buttons (WAJIB) */}
            <div className={`work-timeline-actions ${isLeft ? "md:justify-end" : ""}`}>
              {project.liveUrl && (
                <button
                  type="button"
                  onClick={(e) => handleActionClick(e, project.liveUrl)}
                  className="project-card-action-btn live"
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
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function WorkTimelineView({ projects }: WorkTimelineViewProps) {
  const { t } = useLanguage()

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="work-empty-state"
      >
        <div className="work-empty-icon">🔍</div>
        <h3 className="work-empty-title">
          {t("work.filter.noResults") || "No projects found"}
        </h3>
        <p className="work-empty-desc">
          {t("work.filter.noResultsDesc") || "Try adjusting your search query or filters."}
        </p>
      </motion.div>
    )
  }

  const grouped = groupProjectsByYear(projects)
  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="work-timeline-container">
      {/* Central Line */}
      <div className="work-timeline-central-line" />

      {years.map((year) => {
        const yearProjects = grouped[year]
        return (
          <div key={year} className="work-timeline-year-section">
            {/* Year Badge Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="work-timeline-year-pill-wrapper"
            >
              <span className="work-timeline-year-pill">{year}</span>
            </motion.div>

            {/* Projects for this year */}
            {yearProjects.map((project, index) => (
              <TimelineItem
                key={project.id || project.slug || index}
                project={project}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

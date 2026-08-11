"use client"

import { motion } from "motion/react"
import ProjectGridCard from "@/components/work/project-grid-card"
import { useLanguage } from "@/contexts/language-contexts"

interface WorkGridViewProps {
  projects: any[]
}

export default function WorkGridView({ projects }: WorkGridViewProps) {
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

  return (
    <div className="work-grid-container">
      {projects.map((project, index) => (
        <ProjectGridCard
          key={project.id || project.slug || index}
          project={project}
          index={index}
        />
      ))}
    </div>
  )
}

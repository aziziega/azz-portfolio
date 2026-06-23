"use client"

import { Project } from "@/data/projects"
import BentoCard from "./bento-card"

interface BentoGridProps {
  projects: Project[]
}

export default function BentoGrid({ projects }: BentoGridProps) {
  // Ensure we have at least 2 projects for bento layout
  if (projects.length < 2) {
    return (
      <section className="bento-section">
        <div className="container">
          <div className="bento-grid bento-grid-single">
            {projects.map((project) => (
              <BentoCard
                key={project.id}
                project={project}
                size="large"
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // For 2 projects: 1 large, 1 medium
  if (projects.length === 2) {
    return (
      <section className="bento-section">
        <div className="container">
          <div className="bento-grid bento-grid-two">
            <BentoCard
              project={projects[0]}
              size="large"
            />
            <BentoCard
              project={projects[1]}
              size="medium"
            />
          </div>
        </div>
      </section>
    )
  }

  // For 3+ projects: 1 large, 1 medium, rest small
  return (
    <section className="bento-section">
      <div className="container">
        <div className="bento-grid bento-grid-multi">
          {/* First project - Large (hero position) */}
          <BentoCard
            project={projects[0]}
            size="large"
          />
          
          {/* Second project - Medium */}
          <BentoCard
            project={projects[1]}
            size="medium"
          />
          
          {/* Additional projects - Small */}
          {projects.slice(2).map((project) => (
            <BentoCard
              key={project.id}
              project={project}
              size="small"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

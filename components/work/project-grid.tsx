"use client"

import { Project } from "@/data/projects"
import ProjectCard from "./project-card"

interface ProjectGridProps {
  projects: Project[]
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

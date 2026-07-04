"use client"

import Link from "next/link"
import { Project } from "@/data/projects"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/work/${project.slug}`}>
      <article className="card group">
        <div className="relative overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="card-image"
          />
          {project.featured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 bg-black text-white text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
        <div className="card-content">
          <span className="card-tag">{project.category}</span>
          <h3 className="card-title">{project.title}</h3>
          <p className="card-desc">{project.tagline}</p>
          
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Client & Year */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
            <span>{project.client}</span>
            <span>{project.year}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

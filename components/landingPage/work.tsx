"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-contexts"
import { getAllProjects } from "@/data/projects"

export default function Work() {
    const { t, language } = useLanguage()
    
    // Get first 3 projects for homepage
    const projects = getAllProjects(language).slice(0, 3)

    return (
        <>
            <section id="work" className="section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">{t("work.title")}</h2>
                        <Link href="/work" className="view-all">
                            {t("work.viewAll")}
                        </Link>
                    </div>
                    <div className="grid">
                        {projects.map((project) => (
                            <Link key={project.id} href={`/work/${project.slug}`}>
                                <article className="card animate-on-scroll">
                                    <img 
                                        src={project.thumbnail} 
                                        alt={project.title} 
                                        className="card-image" 
                                    />
                                    <div className="card-content">
                                        <span className="card-tag">{project.category}</span>
                                        <h3 className="card-title">{project.title}</h3>
                                        <p className="card-desc">
                                            {project.tagline}
                                        </p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-contexts"
import { useEffect, useState } from "react"

export default function Work() {
    const { t, language } = useLanguage()
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch(`/api/projects?lang=${language}`)
                if (res.ok) {
                    const data = await res.json()
                    // Get first 3 projects for homepage
                    setProjects((data.projects || []).slice(0, 3))
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProjects()
    }, [language])

    // Handle scroll-in animation for dynamically loaded projects
    useEffect(() => {
        if (loading || projects.length === 0) return

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in")
                }
            })
        }, observerOptions)

        const section = document.getElementById("work")
        const animatedElements = section?.querySelectorAll(".animate-on-scroll")
        animatedElements?.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [loading, projects])

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
                    {loading ? (
                        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-secondary)" }}>
                            Loading projects...
                        </div>
                    ) : (
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
                    )}
                </div>
            </section>
        </>
    )
}
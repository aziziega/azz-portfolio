"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-contexts"

interface Article {
  id: string
  title: string
  excerpt: string
  url: string
  date: string
  readTime: string
  platform: string
  category: string
}

export default function Blog() {
    const { t } = useLanguage()
    
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchArticles() {
            try {
                const res = await fetch('/api/writings')
                if (res.ok) {
                    const data = await res.json()
                    const resolved = (data.writings || []).map((w: any) => ({
                        id: w.id,
                        title: w.title,
                        excerpt: w.excerpt || "",
                        url: w.url,
                        date: w.published_date || "",
                        readTime: w.read_time || "",
                        platform: w.platform,
                        category: w.category || "Article"
                    }))
                    // Ambil maksimal 3 artikel terbaru untuk landing page
                    setArticles(resolved.slice(0, 3))
                }
            } catch (err) {
                console.error('Failed to fetch articles:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchArticles()
    }, [])

    // Handle scroll-in animation for dynamically loaded articles
    useEffect(() => {
        if (loading || articles.length === 0) return

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

        const section = document.getElementById("blog")
        const animatedElements = section?.querySelectorAll(".animate-on-scroll")
        animatedElements?.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [loading, articles])

    return (
        <>
            <section id="blog" className="section blog-section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">{t("blog.title")}</h2>
                        <a href="/blog" className="view-all">
                            {t("blog.viewAll")}
                        </a>
                    </div>
                    {loading ? (
                        <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-secondary)" }}>
                            Loading articles...
                        </div>
                    ) : (
                        <div className="grid">
                            {articles.map((writing) => (
                                <article key={writing.id} className="card animate-on-scroll animate-in" style={{ display: "flex", flexDirection: "column" }}>
                                    <div className="card-content" style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                                            <span className="card-tag" style={{ margin: 0 }}>{writing.platform}</span>
                                            <span className="blog-date" style={{ margin: 0 }}>{writing.date}</span>
                                        </div>
                                        <h3 className="card-title">{writing.title}</h3>
                                        <p className="card-desc" style={{ marginBottom: "24px" }}>{writing.excerpt}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "20px" }}>
                                            <span className="card-tag" style={{ margin: 0, padding: "4px 8px", background: "var(--gray-light)", borderRadius: "4px", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                {writing.category}
                                            </span>
                                            <a href={writing.url} target="_blank" rel="noopener noreferrer" className="read-more" style={{ margin: 0 }}>
                                                {t("blog.readMore")}
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

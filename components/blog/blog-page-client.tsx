"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, PenLine } from "lucide-react"
import { useLanguage } from "@/contexts/language-contexts"

const pageCopy = {
  en: {
    eyebrow: "Latest Articles",
    title: "Notes, articles, and build logs.",
    description:
      "A curated index of technical writing, implementation notes, and short-form updates I publish outside this portfolio.",
    collectionLabel: "Latest from Medium",
    visit: "Read externally",
    backHome: "Back to home",
    contactTitle: "Want a deeper write-up on a project?",
    contactText:
      "I can turn selected portfolio work into practical engineering case studies, architecture breakdowns, or implementation notes.",
    contactCta: "Start a conversation",
    sources: "articles",
    loading: "Loading articles...",
    error: "Failed to load articles."
  },
  id: {
    eyebrow: "Artikel Terbaru",
    title: "Catatan, artikel, dan build log.",
    description:
      "Indeks kurasi untuk technical writing, catatan implementasi, dan update singkat yang saya publikasikan di luar portfolio ini.",
    collectionLabel: "Terbaru dari Medium",
    visit: "Baca eksternal",
    backHome: "Kembali ke home",
    contactTitle: "Butuh write-up yang lebih mendalam?",
    contactText:
      "Saya bisa mengubah project portfolio terpilih menjadi case study engineering, breakdown arsitektur, atau catatan implementasi praktis.",
    contactCta: "Mulai diskusi",
    sources: "artikel",
    loading: "Memuat artikel...",
    error: "Gagal memuat artikel."
  },
}

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

export default function BlogPageClient() {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/medium')
        if (!res.ok) throw new Error('Network error')
        const data = await res.json()
        setArticles(data.articles || [])
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero Section */}
      <section className="section" style={{ paddingBottom: "40px", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="animate-on-scroll animate-in">
            <span className="card-tag" style={{ marginBottom: "20px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <PenLine size={14} />
              {copy.eyebrow}
            </span>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, maxWidth: "800px", marginBottom: "24px", color: "var(--text-primary)" }}>
              {copy.title}
            </h1>
            <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "600px", marginBottom: "32px", lineHeight: 1.6 }}>
              {copy.description}
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/"
                style={{ padding: "12px 24px", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "14px", fontWeight: 600, transition: "0.3s", color: "var(--text-primary)", background: "var(--bg)" }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--text-primary)"}
                onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                {copy.backHome}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Latest Articles (Grid) */}
      <section className="section blog-section">
        <div className="container">
          <div className="section-header animate-on-scroll animate-in">
            <h2 className="section-title">{copy.collectionLabel}</h2>
            {!loading && !error && (
              <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>
                {articles.length} {copy.sources}
              </span>
            )}
          </div>
          
          {loading ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-secondary)" }}>
              {copy.loading}
            </div>
          ) : error ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-secondary)" }}>
              {copy.error}
            </div>
          ) : (
            <div className="grid">
              {articles.map((item) => (
                <article key={item.id} className="card animate-on-scroll animate-in" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="card-content" style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                      <span className="card-tag" style={{ margin: 0 }}>{item.platform}</span>
                      <span className="blog-date" style={{ margin: 0 }}>{item.date}</span>
                    </div>
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-desc" style={{ marginBottom: "24px" }}>{item.excerpt}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "20px" }}>
                      <span className="card-tag" style={{ margin: 0, padding: "4px 8px", background: "var(--gray-light)", borderRadius: "4px", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.category}
                      </span>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="read-more" style={{ margin: 0, display: "flex", alignItems: "center", gap: "4px" }}>
                        {copy.visit}
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" style={{ paddingBottom: "120px" }}>
        <div className="container">
          <div className="newsletter animate-on-scroll animate-in" style={{ margin: 0, background: "var(--gray-light)", border: "1px solid var(--border)", padding: "80px 40px" }}>
            <div className="newsletter-inner">
              <h2 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, letterSpacing: "-1px", marginBottom: "16px", color: "var(--text-primary)" }}>
                {copy.contactTitle}
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "32px", lineHeight: 1.6 }}>
                {copy.contactText}
              </p>
              <Link
                href="/#contact"
                className="btn-submit"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", width: "auto", borderRadius: "4px", padding: "14px 28px", background: "var(--accent)", color: "white" }}
              >
                {copy.contactCta}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

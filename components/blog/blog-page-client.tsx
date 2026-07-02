"use client"

import Link from "next/link"
import { ArrowUpRight, BookOpen, Github, Linkedin, MessagesSquare, PenLine } from "lucide-react"
import { getExternalWritingItems, getWritingChannels } from "@/data/blogs"
import { useLanguage } from "@/contexts/language-contexts"

const pageCopy = {
  en: {
    eyebrow: "External Writing Hub",
    title: "Notes, articles, and build logs.",
    description:
      "A curated index of technical writing, implementation notes, and short-form updates I publish outside this portfolio.",
    featuredLabel: "Featured Channel",
    collectionLabel: "Curated Reads",
    channelsLabel: "Writing Channels",
    visit: "Read externally",
    backHome: "Back to home",
    contactTitle: "Want a deeper write-up on a project?",
    contactText:
      "I can turn selected portfolio work into practical engineering case studies, architecture breakdowns, or implementation notes.",
    contactCta: "Start a conversation",
    sources: "sources",
  },
  id: {
    eyebrow: "Hub Tulisan Eksternal",
    title: "Catatan, artikel, dan build log.",
    description:
      "Indeks kurasi untuk technical writing, catatan implementasi, dan update singkat yang saya publikasikan di luar portfolio ini.",
    featuredLabel: "Kanal Utama",
    collectionLabel: "Bacaan Terkurasi",
    channelsLabel: "Kanal Tulisan",
    visit: "Baca eksternal",
    backHome: "Kembali ke home",
    contactTitle: "Butuh write-up yang lebih mendalam?",
    contactText:
      "Saya bisa mengubah project portfolio terpilih menjadi case study engineering, breakdown arsitektur, atau catatan implementasi praktis.",
    contactCta: "Mulai diskusi",
    sources: "sumber",
  },
}

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "LinkedIn") return <Linkedin size={19} strokeWidth={1.8} />
  if (platform === "GitHub") return <Github size={19} strokeWidth={1.8} />
  return <MessagesSquare size={19} strokeWidth={1.8} />
}

export default function BlogPageClient() {
  const { language } = useLanguage()
  const copy = pageCopy[language]
  const writings = getExternalWritingItems(language)
  const channels = getWritingChannels(language)
  const featured = writings.find((item) => item.featured) ?? writings[0]
  const remaining = writings.filter((item) => item.id !== featured.id)

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
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "12px 24px", background: "var(--accent)", color: "white", borderRadius: "4px", fontSize: "14px", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", transition: "0.3s" }}
                onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
              >
                {copy.visit}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Channels Section */}
      <section className="section blog-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "30px" }} className="featured-grid">
            {/* Featured Article */}
            <article className="card animate-on-scroll animate-in" style={{ height: "100%" }}>
              <div className="card-content" style={{ padding: "40px", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "30px" }}>
                  <span className="card-tag" style={{ margin: 0, padding: "6px 12px", background: "var(--border)", borderRadius: "4px", color: "var(--text-primary)" }}>
                    {copy.featuredLabel}
                  </span>
                  <div style={{ padding: "12px", background: "var(--gray-light)", borderRadius: "12px", color: "var(--text-primary)" }}>
                    <PlatformIcon platform={featured.platform} />
                  </div>
                </div>
                <div className="blog-date">{featured.platform} · {featured.category} · {featured.readTime}</div>
                <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, marginBottom: "20px", letterSpacing: "-1px", lineHeight: 1.2, color: "var(--text-primary)" }}>
                  {featured.title}
                </h2>
                <p className="card-desc" style={{ fontSize: "16px", marginBottom: "40px" }}>
                  {featured.excerpt}
                </p>
                <a href={featured.url} target="_blank" rel="noopener noreferrer" className="read-more" style={{ marginTop: "auto", fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  {copy.visit}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </article>

            {/* Channels */}
            <div className="card animate-on-scroll animate-in" style={{ background: "var(--text-primary)", color: "white", borderColor: "var(--text-primary)", height: "100%" }}>
              <div className="card-content" style={{ padding: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "30px" }}>
                  <BookOpen size={20} />
                  <h3 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700 }}>
                    {copy.channelsLabel}
                  </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {channels.map((channel) => (
                    <a
                      key={channel.id}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ padding: "24px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", transition: "0.3s", display: "block" }}
                      onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)" }}
                      onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontWeight: 600, fontSize: "16px", color: "white" }}>
                        <span>{channel.name}</span>
                        <ArrowUpRight size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
                      </div>
                      <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "16px", lineHeight: 1.5 }}>
                        {channel.description}
                      </p>
                      <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
                        {channel.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Reads (Grid) */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll animate-in">
            <h2 className="section-title">{copy.collectionLabel}</h2>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 500 }}>
              {writings.length} {copy.sources}
            </span>
          </div>
          <div className="grid">
            {remaining.map((item) => (
              <article key={item.id} className="card animate-on-scroll animate-in" style={{ display: "flex", flexDirection: "column" }}>
                <div className="card-content" style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span className="card-tag" style={{ margin: 0 }}>{item.platform}</span>
                    <span className="blog-date" style={{ margin: 0 }}>{item.date}</span>
                  </div>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc" style={{ marginBottom: "24px" }}>{item.excerpt}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "20px" }}>
                    <span className="card-tag" style={{ margin: 0, padding: "4px 8px", background: "var(--gray-light)", borderRadius: "4px" }}>
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
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
    </main>
  )
}

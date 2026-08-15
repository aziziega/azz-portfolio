"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ExternalLink, X, Award, ZoomIn, ArrowRight, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { useLanguage } from "@/contexts/language-contexts"
import { type PublicCertificate } from "@/lib/cms/certificates"

const FALLBACK_CERTIFICATES: PublicCertificate[] = [
  {
    id: "fallback-1",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    issueDate: "2024-01-01",
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
    pdfUrl: null,
    credentialId: "AWS-SAA-2024-0192",
    credentialUrl: "https://www.credly.com/badges/aws-certified-solutions-architect-associate",
    description: "Validated expertise in designing distributed systems, cloud security, and scalable infrastructure on AWS.",
    featured: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta",
    issueDate: "2023-06-15",
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    pdfUrl: null,
    credentialId: "META-FED-884102",
    credentialUrl: "https://www.coursera.org/account/accomplishments/professional-cert/meta-frontend",
    description: "Comprehensive program covering modern React, JavaScript ES6+, UI/UX principles, and web performance optimization.",
    featured: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    title: "Google Cloud Associate Cloud Engineer",
    issuer: "Google Cloud",
    issueDate: "2023-11-20",
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    pdfUrl: null,
    credentialId: "GCP-ACE-559281",
    credentialUrl: "https://www.credential.net/google-cloud-associate-engineer",
    description: "Demonstrated proficiency in deploying applications, monitoring operations, and managing GCP cloud solutions.",
    featured: false,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-4",
    title: "Pelatihan Data Scientist - Nasional",
    issuer: "Pengembangan Talenta Digital (KOMDIGI)",
    issueDate: "2026-02-10",
    year: 2026,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    pdfUrl: null,
    credentialId: "DTS-DS-2026-901",
    credentialUrl: "https://digitalent.kominfo.go.id",
    description: "Pelatihan Data Science tingkat nasional yang mencakup algoritma machine learning, analisis data, dan pemodelan prediktif.",
    featured: true,
    sortOrder: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-5",
    title: "Cybersecurity Fundamentals Professional",
    issuer: "Cisco Networking Academy",
    issueDate: "2025-08-01",
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    pdfUrl: null,
    credentialId: "CSCO-NET-2025-783",
    credentialUrl: "https://www.credly.com",
    description: "Pemahaman mendalam tentang konsep keamanan jaringan, analisis ancaman, dan protokol pertahanan cyber.",
    featured: true,
    sortOrder: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-6",
    title: "Full-Stack Modern Web Engineering",
    issuer: "Dicoding Academy",
    issueDate: "2025-04-18",
    year: 2025,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    pdfUrl: null,
    credentialId: "DCD-FS-2025-338",
    credentialUrl: "https://www.dicoding.com",
    description: "Pengembangan web full-stack tingkat lanjut spesialisasi Next.js, microservice REST API Node.js, dan arsitektur database.",
    featured: true,
    sortOrder: 6,
    createdAt: new Date().toISOString(),
  },
]

export default function Certificates() {
  const { language, t } = useLanguage()
  const [certificates, setCertificates] = useState<PublicCertificate[]>(FALLBACK_CERTIFICATES)
  const [selectedCert, setSelectedCert] = useState<PublicCertificate | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
  }

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await fetch(`/api/certificates?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          if (data.certificates && data.certificates.length > 0) {
            setCertificates(data.certificates)
          }
        }
      } catch (err) {
        console.error("Certificates fetch error:", err)
      }
    }
    fetchCertificates()
  }, [language])

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) {
      el.addEventListener("scroll", checkScroll)
      window.addEventListener("resize", checkScroll)
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [certificates])

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    const scrollAmount = clientWidth * 0.75

    if (direction === "right") {
      // If near or at the end, loop back to start
      if (scrollLeft + clientWidth >= scrollWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    } else {
      // If near or at the start, loop to the end
      if (scrollLeft <= 20) {
        scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: "smooth" })
      } else {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      }
    }
  }

  // Scroll observer to trigger animate-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    )

    const section = document.getElementById("certificates")
    const els = section?.querySelectorAll(".animate-on-scroll")
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [certificates])

  // ESC / body lock for lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedCert(null) }
    if (selectedCert) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", onKey)
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey) }
  }, [selectedCert])

  return (
    <section id="certificates" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">{t("certificates.title")}</h2>
          <p className="section-subtitle">{t("certificates.subtitle")}</p>
        </div>

        {/* Slider Wrapper with Floating Left & Right Arrows */}
        <div className="cert-slider-wrapper animate-on-scroll">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            className="cert-nav-btn cert-nav-btn-left"
            aria-label="Scroll left"
            type="button"
            suppressHydrationWarning
          >
            <ChevronLeft size={22} />
          </button>

          {/* Horizontal Slider Track */}
          <div className="cert-cards-slider" ref={scrollRef}>
            {certificates.map((cert, i) => (
              <article
                key={cert.id}
                className="cert-card"
                onClick={() => setSelectedCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedCert(cert) } }}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                {/* Image Container / Placeholder */}
                <div className="cert-card-img-wrap">
                  {cert.imageUrl ? (
                    <img src={cert.imageUrl} alt={cert.title} className="cert-card-img" loading="lazy" />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "24px",
                        textAlign: "center",
                        color: "#ffffff"
                      }}
                    >
                      <Award size={36} style={{ color: "#38bdf8", marginBottom: "10px" }} />
                      <span style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1.3 }}>{cert.title}</span>
                      <span style={{ fontSize: "12px", color: "#94a3b8", marginTop: "6px" }}>{cert.issuer}</span>
                    </div>
                  )}

                  {/* Professional Hover Overlay */}
                  <div className="cert-card-img-overlay">
                    <div className="cert-card-overlay-inner">
                      <h3 className="cert-card-name">{cert.title}</h3>
                      <p className="cert-card-sub">
                        {cert.issuer}{cert.year ? ` • ${cert.year}` : ""}
                      </p>

                      <div className="cert-card-action-btn">
                        <ZoomIn size={15} />
                        <span>{t("certificates.verify")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            className="cert-nav-btn cert-nav-btn-right"
            aria-label="Scroll right"
            type="button"
            suppressHydrationWarning
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* View All Certificates CTA (Monochrome Rounded Center) */}
        <div className="cert-cta-wrap">
          <Link href="/resume" className="cert-view-all-btn">
            <span>{t("certificates.viewAll")}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {selectedCert && (
        <div className="cert-lb-backdrop" onClick={() => setSelectedCert(null)} role="dialog" aria-modal="true">
          <div className="cert-lb-panel" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lb-close" onClick={() => setSelectedCert(null)} aria-label="Close" type="button" suppressHydrationWarning>
              <X size={18} />
            </button>
            
            {/* Lightbox Image / Placeholder */}
            <div className="cert-lb-img-wrap">
              {selectedCert.imageUrl ? (
                <img src={selectedCert.imageUrl} alt={selectedCert.title} className="cert-lb-img" />
              ) : (
                <div
                  style={{
                    width: "100%",
                    minHeight: "220px",
                    background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px",
                    textAlign: "center",
                    color: "#ffffff"
                  }}
                >
                  <Award size={48} style={{ color: "#38bdf8", marginBottom: "12px" }} />
                  <h4 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>{selectedCert.title}</h4>
                  <p style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px" }}>{selectedCert.issuer}</p>
                </div>
              )}
            </div>

            {/* Lightbox Details */}
            <div className="cert-lb-body">
              <span className="cert-lb-issuer">
                {selectedCert.issuer}
                {selectedCert.year ? ` · ${selectedCert.year}` : ""}
              </span>

              <h3 className="cert-lb-title">{selectedCert.title}</h3>

              {/* Credential ID Pill if available */}
              {selectedCert.credentialId && (
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  background: "#f1f5f9",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  color: "#334155",
                  marginBottom: "12px",
                  width: "fit-content"
                }}>
                  <span style={{ color: "#64748b", fontWeight: 600 }}>{t("certificates.credentialId")}:</span>
                  <span style={{ fontWeight: 700 }}>{selectedCert.credentialId}</span>
                </div>
              )}

              {selectedCert.description && <p className="cert-lb-desc">{selectedCert.description}</p>}

              {/* Action Buttons: Verify & PDF */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "16px" }}>
                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-lb-link"
                  >
                    {t("certificates.verify")} <ExternalLink size={14} />
                  </a>
                )}

                {selectedCert.pdfUrl && (
                  <a
                    href={selectedCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-lb-link"
                    style={{
                      background: "rgba(220, 38, 38, 0.08)",
                      borderColor: "rgba(220, 38, 38, 0.2)",
                      color: "#dc2626"
                    }}
                  >
                    <FileText size={14} />
                    {t("certificates.viewPdf")}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

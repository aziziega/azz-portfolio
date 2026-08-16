"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ExternalLink, X, Award, ZoomIn, ArrowRight, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { useLanguage } from "@/contexts/language-contexts"
import { type PublicCertificate } from "@/lib/cms/certificates"

export default function Certificates() {
  const { language, t } = useLanguage()
  const [certificates, setCertificates] = useState<PublicCertificate[]>([])
  const [loading, setLoading] = useState(true)
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
        setLoading(true)
        const res = await fetch(`/api/certificates?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          setCertificates(Array.isArray(data.certificates) ? data.certificates : [])
        } else {
          setCertificates([])
        }
      } catch (err) {
        console.error("Certificates fetch error:", err)
        setCertificates([])
      } finally {
        setLoading(false)
      }
    }
    fetchCertificates()
  }, [language])

  useEffect(() => {
    if (certificates.length === 0) return
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
    if (loading || certificates.length === 0) return

    const observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const section = document.getElementById("certificates")?.closest("section") || document.getElementById("certificates")
    const els = section?.querySelectorAll(".animate-on-scroll")
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading, certificates])

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
    <section className="section">
      <div className="container">
        {/* Section Header */}
        <div id="certificates" className="section-header animate-on-scroll">
          <h2 className="section-title">{t("certificates.title")}</h2>
          <p className="section-subtitle">{t("certificates.subtitle")}</p>
        </div>

        {loading ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: "var(--text-secondary)" }}>
            <Award size={36} className="animate-pulse mx-auto mb-3 text-slate-400" />
            <p style={{ fontSize: "14px" }}>Loading certifications from database...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-secondary)" }}>
            <Award size={36} className="mx-auto mb-3 text-slate-300" />
            <p style={{ fontSize: "14px" }}>No certifications available at this moment.</p>
          </div>
        ) : (
          <>
            {/* Slider Wrapper with Floating Left & Right Arrows */}
            <div className="cert-slider-wrapper animate-on-scroll">
              {/* Left Arrow Button */}
              {certificates.length > 2 && (
                <button
                  onClick={() => handleScroll("left")}
                  className="cert-nav-btn cert-nav-btn-left"
                  aria-label="Scroll left"
                  type="button"
                  suppressHydrationWarning
                >
                  <ChevronLeft size={22} />
                </button>
              )}

              {/* Horizontal Slider Track */}
              <div className="cert-cards-slider" ref={scrollRef}>
                {certificates.map((cert, i) => (
                  <article
                    key={cert.id || `cert-${i}`}
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
              {certificates.length > 2 && (
                <button
                  onClick={() => handleScroll("right")}
                  className="cert-nav-btn cert-nav-btn-right"
                  aria-label="Scroll right"
                  type="button"
                  suppressHydrationWarning
                >
                  <ChevronRight size={22} />
                </button>
              )}
            </div>

            {/* View All Certificates CTA (Monochrome Rounded Center) */}
            <div className="cert-cta-wrap animate-on-scroll">
              <Link href="/resume" className="cert-view-all-btn">
                <span>{t("certificates.viewAll")}</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
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

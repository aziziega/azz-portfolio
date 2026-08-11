"use client"

import { useState, useEffect } from "react"
import { ExternalLink, X, Award, ZoomIn } from "lucide-react"
import { useLanguage } from "@/contexts/language-contexts"
import { type PublicCertificate } from "@/lib/cms/certificates"

const FALLBACK_CERTIFICATES: PublicCertificate[] = [
  {
    id: "fallback-1",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    year: 2024,
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
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
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
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
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
    credentialUrl: "https://www.credential.net/google-cloud-associate-engineer",
    description: "Demonstrated proficiency in deploying applications, monitoring operations, and managing GCP cloud solutions.",
    featured: false,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
  },
]

export default function Certificates() {
  const { language, t } = useLanguage()
  const [certificates, setCertificates] = useState<PublicCertificate[]>(FALLBACK_CERTIFICATES)
  const [selectedCert, setSelectedCert] = useState<PublicCertificate | null>(null)

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
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">{t("certificates.title")}</h2>
        </div>

        <div className="cert-cards-grid animate-on-scroll">
          {certificates.map((cert, i) => (
            <article
              key={cert.id}
              className="cert-card"
              onClick={() => setSelectedCert(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedCert(cert) } }}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="cert-card-img-wrap">
                <img src={cert.imageUrl} alt={cert.title} className="cert-card-img" loading="lazy" />
                <div className="cert-card-img-overlay">
                  <ZoomIn size={20} />
                </div>
              </div>

              {/* Body */}
              <div className="cert-card-body">
                <div className="cert-card-meta">
                  <span className="cert-card-issuer-tag">{cert.issuer}</span>
                  {cert.year && <span className="cert-card-year-tag">{cert.year}</span>}
                </div>
                <h3 className="cert-card-name">{cert.title}</h3>
                {cert.description && (
                  <p className="cert-card-excerpt">{cert.description}</p>
                )}
              </div>

              {/* Footer */}
              <div className="cert-card-footer">
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-card-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t("certificates.verify")} <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="cert-card-link-muted">No credential link</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedCert && (
        <div className="cert-lb-backdrop" onClick={() => setSelectedCert(null)} role="dialog" aria-modal="true">
          <div className="cert-lb-panel" onClick={(e) => e.stopPropagation()}>
            <button className="cert-lb-close" onClick={() => setSelectedCert(null)} aria-label="Close" type="button">
              <X size={18} />
            </button>
            <div className="cert-lb-img-wrap">
              <img src={selectedCert.imageUrl} alt={selectedCert.title} className="cert-lb-img" />
            </div>
            <div className="cert-lb-body">
              <span className="cert-lb-issuer">{selectedCert.issuer}{selectedCert.year ? ` · ${selectedCert.year}` : ""}</span>
              <h3 className="cert-lb-title">{selectedCert.title}</h3>
              {selectedCert.description && <p className="cert-lb-desc">{selectedCert.description}</p>}
              {selectedCert.credentialUrl && (
                <a href={selectedCert.credentialUrl} target="_blank" rel="noreferrer" className="cert-lb-link">
                  {t("certificates.verify")} <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import ResumeDocument from "@/components/resume/resume-document"
import "../resume.css"
import "./fullscreen.css"

export default function ResumeFullscreenPage() {
  const [viewMode, setViewMode] = useState<"document" | "pdf">("document")

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/cv.pdf"
    link.download = "Resume_Azizi_Egatri_Muthi.pdf"
    link.click()
  }

  return (
    <div className="fullscreen-root">
      {/* ── Minimal top bar ── */}
      <div className="fullscreen-bar no-print">
        <Link href="/resume" className="resume-btn resume-btn-ghost" aria-label="Exit fullscreen">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3" />
            <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
            <path d="M3 16h3a2 2 0 0 1 2 2v3" />
            <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
          </svg>
          <span className="resume-btn-label">Exit Fullscreen</span>
        </Link>
        <span className="fullscreen-title">Azizi Egatri Muthi — Resume</span>

        <div className="fullscreen-controls">
          <div className="fullscreen-view-toggle">
            <button
              onClick={() => setViewMode("document")}
              className={`fullscreen-toggle-btn ${viewMode === "document" ? "active" : ""}`}
            >
              Web View
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`fullscreen-toggle-btn ${viewMode === "pdf" ? "active" : ""}`}
            >
              PDF View
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="resume-btn resume-btn-ghost"
            title="Print"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span className="resume-btn-label">Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="resume-btn resume-btn-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ── Scrollable resume viewer ── */}
      <div className="fullscreen-viewer">
        {viewMode === "document" ? (
          <div className="fullscreen-doc-container">
            <ResumeDocument />
          </div>
        ) : (
          <object
            data="/cv.pdf"
            type="application/pdf"
            className="fullscreen-iframe"
          >
            <div className="fullscreen-pdf-fallback">
              <p>Preview PDF langsung terbatas pada browser ini.</p>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className="resume-btn resume-btn-primary">
                Buka / Download PDF
              </a>
            </div>
          </object>
        )}
      </div>
    </div>
  )
}

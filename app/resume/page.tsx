"use client"

import Link from "next/link"
import ResumeDocument from "@/components/resume/resume-document"
import "./resume.css"

export default function ResumePage() {
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
    <div className="resume-root">
      {/* ── Action Bar ── */}
      <div className="resume-action-bar no-print">
        <Link href="/" className="resume-back-btn" aria-label="Back to portfolio">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Back</span>
        </Link>

        <div className="resume-action-label">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span>Resume — Azizi E.M.</span>
        </div>

        <div className="resume-action-buttons">
          <Link
            href="/resume/fullscreen"
            className="resume-btn resume-btn-ghost"
            aria-label="Fullscreen view"
            title="Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <span className="resume-btn-label">Fullscreen</span>
          </Link>
          <button
            onClick={handlePrint}
            className="resume-btn resume-btn-ghost"
            aria-label="Print resume"
            title="Print"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span className="resume-btn-label">Print</span>
          </button>
          <button
            onClick={handleDownload}
            className="resume-btn resume-btn-primary"
            aria-label="Download PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ── Resume Paper ── */}
      <div className="resume-stage">
        <ResumeDocument />
      </div>
    </div>
  )
}

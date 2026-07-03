"use client"

import Link from "next/link"
import "../resume.css"
import "./fullscreen.css"

export default function ResumeFullscreenPage() {
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
        <span className="fullscreen-title">Azizi Egatri Murthi — Resume</span>
        <button
          onClick={() => window.print()}
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

      {/* ── Scrollable resume viewer ── */}
      <div className="fullscreen-viewer">
        <iframe
          src="/cv.pdf"
          className="fullscreen-iframe"
          title="Resume PDF Fullscreen"
        />
      </div>
    </div>
  )
}

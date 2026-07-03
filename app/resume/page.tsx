"use client"

import Link from "next/link"
import "./resume.css"

export default function ResumePage() {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/cv.pdf"
    link.download = "Resume_Azizi_Egatri_Murthi.pdf"
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

/* ────────────────────────────────────────────
   Resume document content (A4 paper)
──────────────────────────────────────────── */
function ResumeDocument() {
  return (
    <article className="resume-paper" id="resume-document">
      {/* ── Left Column ── */}
      <aside className="resume-sidebar">
        {/* Profile photo placeholder */}
        <div className="resume-avatar">
          <span className="resume-avatar-initials">AEM</span>
        </div>

        {/* Name & role */}
        <div className="resume-sidebar-name">
          <h1>Azizi Egatri<br />Murthi</h1>
          <p className="resume-sidebar-role">Frontend Web Developer</p>
        </div>

        <div className="resume-sidebar-divider" />

        {/* Contact */}
        <section className="resume-sidebar-section">
          <h2 className="resume-sidebar-heading">CONTACT</h2>
          <ul className="resume-contact-list">
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" /></svg>
              <span>+62 821 5360 8914</span>
            </li>
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              <span>aziziegatrim@gmail.com</span>
            </li>
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <span>Prambanan, Klaten<br />Jawa Tengah, Indonesia</span>
            </li>
          </ul>
        </section>

        <div className="resume-sidebar-divider" />

        {/* Education */}
        <section className="resume-sidebar-section">
          <h2 className="resume-sidebar-heading">EDUCATION</h2>
          <div className="resume-edu-item">
            <p className="resume-edu-school">Univ. Amikom Yogyakarta</p>
            <p className="resume-edu-degree">S1 Informatika</p>
            <p className="resume-edu-date">Sept 2022 — Present</p>
          </div>
        </section>

        <div className="resume-sidebar-divider" />

        {/* Hard Skills */}
        <section className="resume-sidebar-section">
          <h2 className="resume-sidebar-heading">HARD SKILL</h2>
          <div className="resume-skills-group">
            <p className="resume-skills-category">Languages</p>
            <div className="resume-skill-tags">
              {["HTML5", "CSS3", "JavaScript", "TypeScript"].map(s => (
                <span key={s} className="resume-skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="resume-skills-group">
            <p className="resume-skills-category">Frameworks</p>
            <div className="resume-skill-tags">
              {["React.js", "Next.js", "Tailwind CSS"].map(s => (
                <span key={s} className="resume-skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="resume-skills-group">
            <p className="resume-skills-category">Dev Tools</p>
            <div className="resume-skill-tags">
              {["VS Code", "Git", "GitHub"].map(s => (
                <span key={s} className="resume-skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="resume-skills-group">
            <p className="resume-skills-category">Database & Backend</p>
            <div className="resume-skill-tags">
              {["PostgreSQL", "Supabase"].map(s => (
                <span key={s} className="resume-skill-tag">{s}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="resume-sidebar-divider" />

        {/* Soft Skills */}
        <section className="resume-sidebar-section">
          <h2 className="resume-sidebar-heading">SOFT SKILL</h2>
          <ul className="resume-soft-skills">
            <li>Komunikasi — Menyampaikan kemajuan, tantangan, dan solusi dengan jelas</li>
            <li>Kolaborasi Tim — Bekerja efektif dengan desainer dan developer</li>
            <li>Problem Solving — Analitis dan adaptif</li>
            <li>Time Management — Eksekusi andal sesuai timeline</li>
          </ul>
        </section>

        <div className="resume-sidebar-divider" />

        {/* Languages */}
        <section className="resume-sidebar-section">
          <h2 className="resume-sidebar-heading">LANGUAGES</h2>
          <ul className="resume-lang-list">
            <li><span>Bahasa Indonesia</span><span className="resume-lang-level">Native</span></li>
            <li><span>English</span><span className="resume-lang-level">Professional</span></li>
          </ul>
        </section>
      </aside>

      {/* ── Right Column ── */}
      <main className="resume-main">
        {/* Profile summary */}
        <section className="resume-main-section">
          <h2 className="resume-main-heading">PROFILE</h2>
          <p className="resume-profile-text">
            Mahasiswa Semester 7 Universitas AMIKOM Yogyakarta yang tertarik dan fokus sebagai Front-End Web Developer.
            Berpengalaman membangun UI responsif menggunakan React, Next.js, dan Tailwind CSS untuk landing page,
            company profile, dan web app. Terbiasa mengimplementasikan desain ke kode yang rapi, terstruktur, dan siap
            digunakan. Memiliki kemampuan komunikasi yang baik dalam lingkungan tim, eksekusi kerja yang andal, serta
            komitmen tinggi terhadap pencapaian target project.
          </p>
        </section>

        <div className="resume-main-divider" />

        {/* Projects */}
        <section className="resume-main-section">
          <h2 className="resume-main-heading">PROJECT</h2>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">Finance Tracker Website — LiatDuit</h3>
                <p className="resume-project-role">Fullstack Developer</p>
              </div>
              <span className="resume-project-year">2025</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Membangun aplikasi pelacakan keuangan pribadi menggunakan Next.js, TypeScript, Supabase, PostgreSQL.</li>
              <li>Fitur: multi-dompet, kategori, dashboard, otentikasi Google.</li>
              <li>Mengimplementasikan CRUD, dengan proteksi route dashboard, dan UI responsif.</li>
            </ul>
          </div>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">Portofolio Website</h3>
                <p className="resume-project-role">Landing Page / Company Profile</p>
              </div>
              <span className="resume-project-year">2025</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Mengembangkan situs web portofolio responsif menggunakan Next.js + Tailwind CSS.</li>
              <li>Diterapkan di Vercel dan dioptimalkan untuk kinerja dan UI yang bersih.</li>
            </ul>
          </div>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">Hackathon Participants</h3>
                <p className="resume-project-role">Front-End Developer</p>
              </div>
              <span className="resume-project-year">2025</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Membangun UI dan landing page untuk dApps menggunakan Next.js + Tailwind CSS.</li>
              <li>Mengintegrasikan koneksi dompet dan mengimplementasikan data fetching.</li>
            </ul>
          </div>
        </section>

        <div className="resume-main-divider" />

        {/* Organization */}
        <section className="resume-main-section">
          <h2 className="resume-main-heading">ORGANIZATION</h2>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">Ikatan Pelajar Mahasiswa Kutai Kartanegara</h3>
                <p className="resume-project-role">Wakil Ketua / Ketua Panitia Eroh Bebaya #7</p>
              </div>
              <span className="resume-project-year">2024</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Mengkoordinasikan pengurus lintas divisi dan mendukung keputusan strategis organisasi.</li>
              <li>Memimpin ±40 panitia dalam event daerah skala besar di Titik Nol Yogyakarta.</li>
              <li>Memastikan pelaksanaan sesuai timeline, anggaran, dan koordinasi dengan pejabat daerah setempat.</li>
            </ul>
          </div>
        </section>

        <div className="resume-main-divider" />

        {/* Certificates & Awards */}
        <section className="resume-main-section">
          <h2 className="resume-main-heading">CERTIFICATES &amp; AWARDS</h2>
          <div className="resume-cert-grid">
            <div className="resume-cert-item">
              <div className="resume-cert-header">
                <span className="resume-cert-issuer">Dicoding Indonesia</span>
                <span className="resume-cert-date">Aug 2022</span>
              </div>
              <p className="resume-cert-title">Belajar Dasar Pemrograman Web</p>
            </div>
            <div className="resume-cert-item">
              <div className="resume-cert-header">
                <span className="resume-cert-issuer">Dicoding Indonesia</span>
                <span className="resume-cert-date">Feb 2023</span>
              </div>
              <p className="resume-cert-title">Belajar Membuat Front-end Pemula</p>
            </div>
            <div className="resume-cert-item">
              <div className="resume-cert-header">
                <span className="resume-cert-issuer">Dicoding Indonesia</span>
                <span className="resume-cert-date">Jan 2024</span>
              </div>
              <p className="resume-cert-title">Belajar Dasar Managemen Proyek</p>
            </div>
            <div className="resume-cert-item resume-cert-award">
              <div className="resume-cert-header">
                <span className="resume-cert-issuer">KMI Expo 2025</span>
                <span className="resume-cert-date">Nov 2025</span>
              </div>
              <p className="resume-cert-title">Top 4 — University F&B Business &amp; Website Developer (Menoreh Sугару)</p>
            </div>
          </div>
        </section>
      </main>
    </article>
  )
}

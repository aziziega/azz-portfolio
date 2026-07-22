import React from "react"

export default function ResumeDocument() {
  return (
    <article className="resume-paper" id="resume-document">
      {/* ── Left Column ── */}
      <aside className="resume-sidebar">
        {/* Profile photo */}
        <div className="resume-avatar">
          <img src="/images/logo-portfolio.png" alt="Azizi Egatri Mu'thi" className="resume-avatar-img" />
        </div>

        {/* Name & role */}
        <div className="resume-sidebar-name">
          <h1>Azizi Egatri<br />Mu&apos;thi</h1>
          <p className="resume-sidebar-role">Fullstack Web Developer</p>
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
              <a href="mailto:aziziegatrim@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>aziziegatrim@gmail.com</a>
            </li>
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              <span>Jawa Tengah, Indonesia</span>
            </li>
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              <a href="https://www.aziziem.xyz" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>aziziem.xyz</a>
            </li>
            <li>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              <a href="https://www.linkedin.com/in/aziziem/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>linkedin.com/in/aziziem</a>
            </li>
          </ul>
        </section>

        <div className="resume-sidebar-divider" />

        {/* Education */}
        <section className="resume-sidebar-section">
          <h2 className="resume-sidebar-heading">EDUCATION</h2>
          <div className="resume-edu-item">
            <p className="resume-edu-school">Univ. AMIKOM Yogyakarta</p>
            <p className="resume-edu-degree">S1 Informatika — Gelar Sarjana</p>
            <p className="resume-edu-date">Sept 2022 — Jun 2026</p>
          </div>
        </section>

        <div className="resume-sidebar-divider" />

        {/* Programming Skills */}
        <section className="resume-sidebar-section">
          <h2 className="resume-sidebar-heading">SKILLS</h2>
          <div className="resume-skills-group">
            <p className="resume-skills-category">Backend</p>
            <div className="resume-skill-tags">
              {["TypeScript", "Node.js", "REST API", "JSON"].map(s => (
                <span key={s} className="resume-skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="resume-skills-group">
            <p className="resume-skills-category">Frontend</p>
            <div className="resume-skill-tags">
              {["HTML", "CSS", "JavaScript", "Tailwind", "TypeScript", "React", "Next.js"].map(s => (
                <span key={s} className="resume-skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="resume-skills-group">
            <p className="resume-skills-category">Database</p>
            <div className="resume-skill-tags">
              {["MySQL", "SQLite", "PostgreSQL"].map(s => (
                <span key={s} className="resume-skill-tag">{s}</span>
              ))}
            </div>
          </div>
          <div className="resume-skills-group">
            <p className="resume-skills-category">DevTools</p>
            <div className="resume-skill-tags">
              {["GitHub", "Vercel", "Hostinger", "Supabase"].map(s => (
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
            Halo, Perkenalkan saya <strong>Azizi Egatri Mu&apos;thi</strong>, fresh graduate Builders sekaligus Fullstack Web Developer dengan 1+ tahun pengalaman membangun sistem production untuk klien nyata menggunakan Next.js, Node.js, dan PostgreSQL. Mulai dari CRM sistem manajemen gym, EMR/RME sistem Rekam Medis Elektronik, hingga CMS Custom untuk organisasi. Memahami masalah bisnis client, Terbiasa bekerja end-to-end: merancang database schema, membangun REST API, hingga UI yang siap pakai untuk end-user non-teknis. Familiar dengan React Native untuk mobile dan terbuka mempelajari Golang serta Vue.js. Terbiasa bekerja mandiri sebagai developer for-hire, problem solver yang cepat memahami kebutuhan client dan mengeksekusi solusi tanpa supervisi ketat.
          </p>
        </section>

        <div className="resume-main-divider" />

        {/* Project Experience */}
        <section className="resume-main-section">
          <h2 className="resume-main-heading">PROJECT EXPERIENCE</h2>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">
                  CRM SISTEM • LINEUPGYM
                  <a href="https://lineupgym.com" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                    ↗ lineupgym.com
                  </a>
                </h3>
                <p className="resume-project-role">Fullstack Web Developer (Next.js &amp; Supabase)</p>
              </div>
              <span className="resume-project-year">Juli 2026</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Membangun sistem CRM manajemen gym end-to-end (Next.js &amp; Supabase) mencakup 500+ member, keuangan, kwitansi, landing page, reminder member, absensi member, dan penjadwalan PT dengan RLS security &amp; deploy di Vercel.</li>
            </ul>
          </div>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">
                  EMR/RME SISTEM • PRAKTEK DOKTER SUDIMAN
                  <a href="https://sudiman.vercel.app" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                    ↗ sudiman.vercel.app
                  </a>
                </h3>
                <p className="resume-project-role">Fullstack Web Developer (Next.js, TypeScript, Supabase/PostgreSQL)</p>
              </div>
              <span className="resume-project-year">Jan 2026</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Membangun berbasis web untuk klinik (Next.js, TypeScript, Supabase/PostgreSQL) dengan multi-role (Admin, Dokter, Staf), manajemen antrian pasien, rekam medis, manajemen stok obat, monitoring logs, karyawan, laporan keuangan, serta audit trail lengkap dengan RLS security dan ekspor CSV/PDF.</li>
            </ul>
          </div>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">
                  CMS SISTEM • IPMKUKAR YOGYAKARTA
                  <a href="https://ipmkukar.vercel.app" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                    ↗ ipmkukar.vercel.app
                  </a>
                </h3>
                <p className="resume-project-role">Fullstack Web Developer (Next.js &amp; Supabase)</p>
              </div>
              <span className="resume-project-year">Mei 2026</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Membangun CMS website organisasi (Next.js &amp; Supabase) dengan admin dashboard, JWT auth, role-based access control, manajemen setiap section konten dinamis, activity logs, dan REST API terintegrasi.</li>
            </ul>
          </div>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">
                  FRONT-END WEB • HACKATHON PARTICIPANTS
                  <a href="https://momentumfi.vercel.app" target="_blank" rel="noopener noreferrer" className="resume-project-link">
                    ↗ momentumfi.vercel.app
                  </a>
                </h3>
                <p className="resume-project-role">Front-End Developer (Next.js &amp; Tailwind)</p>
              </div>
              <span className="resume-project-year">2025</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Merancang front-end dApps (Next.js &amp; Tailwind) dengan integrasi dompet Web3 dan data fetching untuk merilis MVP secara cepat, beserta persiapan presentasi pitching. Proyek ini dipresentasikan dan berhasil menembus Top 500 pada ajang World Computer Hacker League (WCHL) 2025 National Round.</li>
            </ul>
          </div>
        </section>

        <div className="resume-main-divider" />

        {/* Leadership */}
        <section className="resume-main-section">
          <h2 className="resume-main-heading">LEADERSHIP</h2>

          <div className="resume-project-item">
            <div className="resume-project-header">
              <div>
                <h3 className="resume-project-title">IKATAN PELAJAR MAHASISWA KUTAI KARTANEGARA</h3>
                <p className="resume-project-role">Wakil Ketua Organisasi | Ketua Panitia Eroh Bebaya #7</p>
              </div>
              <span className="resume-project-year">2024 — 2025</span>
            </div>
            <ul className="resume-project-bullets">
              <li>Mengoordinasikan pengurus lintas divisi dan memimpin ±40 panitia dalam mengeksekusi event berskala daerah (500+ pengunjung) di Titik Nol Yogyakarta.</li>
              <li>Memastikan kelancaran acara sesuai timeline, anggaran, dan regulasi serta koordinasi bersama pejabat daerah.</li>
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
                <span className="resume-cert-date">2023 — 2025</span>
              </div>
              <p className="resume-cert-title">4+ Certificate Dicoding Indonesia</p>
            </div>
            <div className="resume-cert-item resume-cert-award">
              <div className="resume-cert-header">
                <span className="resume-cert-issuer">KMI EXPO 2025</span>
                <span className="resume-cert-date">2025</span>
              </div>
              <p className="resume-cert-title">Top 4 F&amp;B Business, Landing page Website Developer.</p>
            </div>
          </div>
        </section>
      </main>
    </article>
  )
}

<div align="center">

# 🌟 Azizi Egatri Mu'thi — Personal Portfolio & CMS

An interactive, high-performance developer portfolio and headless CMS built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Three.js / React Three Fiber**, and **Supabase**.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Physics-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Resend](https://img.shields.io/badge/Resend-Email_API-black?style=for-the-badge&logo=resend)](https://resend.com/)

[**Live Demo (aziziem.xyz)**](https://aziziem.xyz) • [**Report Bug**](https://github.com/aziziega/azz-portfolio/issues) • [**Request Feature**](https://github.com/aziziega/azz-portfolio/issues)

</div>

---

## 📌 Daftar Isi / Table of Contents

- [Tentang Proyek / About The Project](#-tentang-proyek--about-the-project)
- [Fitur Utama / Key Features](#-fitur-utama--key-features)
- [Teknologi & Stack / Tech Stack](#-teknologi--stack--tech-stack)
- [Struktur Direktori / Project Structure](#-struktur-direktori--project-structure)
- [Panduan Memulai / Getting Started](#-panduan-memulai--getting-started)
  - [Prasyarat / Prerequisites](#prasyarat--prerequisites)
  - [Instalasi / Installation](#instalasi--installation)
  - [Konfigurasi Environment Variables](#konfigurasi-environment-variables)
  - [Setup Database & Supabase](#setup-database--supabase)
  - [Menjalankan Aplikasi / Running Locally](#menjalankan-aplikasi--running-locally)
- [Panel Admin & Headless CMS](#-panel-admin--headless-cms)
- [SEO & Optimasi / SEO & Performance](#-seo--optimasi--seo--performance)
- [Kontributor & Lisensi / Author & License](#-kontributor--lisensi--author--license)

---

## 📖 Tentang Proyek / About The Project

**azz-portfolio** adalah website portofolio profesional dan interaktif milik **Azizi Egatri Mu'thi** (*Software Engineer & Product Builder*). Portofolio ini dirancang tidak hanya sebagai etalase karya digital, tetapi juga sebagai platform full-stack dinamis yang terintegrasi dengan **Headless CMS berbasis Supabase**, sistem animasi fisika 3D, dukungan bilingual (*English & Indonesian*), dan otomasi pengiriman pesan & newsletter via **Resend API**.

### 📸 Preview Tampilan

| Hero & 3D Interactive Lanyard | Blog & Article Showcase |
| :---: | :---: |
| ![Preview](screenshoot/image.png) | ![Blog Preview](screenshoot/blogSs.png) |

---

## ✨ Fitur Utama / Key Features

### 1. 🪢 3D Interactive Physics Lanyard
- ID Card 3D interaktif yang dapat ditarik, diayunkan, dan berinteraksi secara fisik dengan kursor pengguna menggunakan `@react-three/fiber`, `@react-three/drei`, dan `@react-three/rapier`.
- Mendukung dynamic texture generator untuk tampilan kartu identitas (light/dark mode).

### 2. 🛡️ Custom Headless CMS & Admin Dashboard (`/admin`)
- Panel kontrol lengkap terlindungi oleh **Supabase SSR Auth** dan **Email Whitelist Middleware**.
- Manajemen konten penuh (**CRUD**) untuk:
  - 📁 **Projects & Case Studies**: Status (*draft/published/archived*), fitur, tantangan, solusi, galeri gambar, tech stack.
  - 🛠️ **Tech Stack**: Kategori, icon URL, status profisiensi.
  - 📜 **Certificates**: Kredensial, penerbit, nomor sertifikat, tanggal, URL verifikasi.
  - ✍️ **Blog & Writings**: Artikel lokal dan integrasi sinkronisasi RSS Medium.
  - ⭐ **Testimonials**: Testimoni klien dengan rating, avatar, dan approval status.
  - ✉️ **Contact Messages & Newsletter**: Notifikasi pesan masuk dan manajemen subscriber.
  - ⚙️ **Site Settings**: Pengaturan informasi situs, bio, kontak, dan SEO.

### 3. 🌐 Dukungan Multi-Bahasa (Bilingual i18n)
- Switcher bahasa instan antara **Bahasa Indonesia (`id`)** dan **English (`en`)** tanpa reload halaman.
- Semua data proyek, deskripsi, dan UI mendukung lokalisasi.

### 4. 💼 In-Depth Project Case Studies (`/work/[slug]`)
- Halaman detail studi kasus terstruktur: Problem Statement, Solution, Architecture & Technical Decisions, Challenges & Overcoming, Key Outcomes, dan Image Showcase.

### 5. 📄 Resume Interaktif & PDF Viewer (`/resume`)
- Halaman riwayat hidup digital yang terstruktur rapi, lengkap dengan mode *Fullscreen* dan tombol unduh langsung PDF CV.

### 6. 📬 Formulir Kontak & Newsletter (Resend API)
- Pengiriman formulir kontak dengan validasi Zod dan notifikasi langsung ke email pemilik melalui Resend.
- Sistem langganan newsletter otomatis tersimpan ke database Supabase.

### 7. 🎨 Desain Modern Bento Grid & Dark/Light Mode
- Desain antarmuka modern dengan gaya Bento Grid, efek glassmorphism, fluid typography, dan transisi tema halus via `next-themes`.

---

## 🛠️ Teknologi & Stack / Tech Stack

### Core Framework & Language
- **[Next.js 16](https://nextjs.org/)** (App Router, Server Components, Route Handlers)
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** & PostCSS
- **[Radix UI](https://www.radix-ui.com/)** (Dialog, Dropdown, Accordion, Tooltip, Avatar, Popover, dll.)
- **[Lucide React](https://lucide.dev/)** (Icon library)
- **[Motion (Framer Motion v12)](https://motion.dev/)** (Smooth page animations & scroll effects)
- **[Sonner](https://sonner.emilkowal.ski/)** (Modern toast notifications)
- **[Embla Carousel](https://www.embla-carousel.com/)** (Touch & drag carousel)

### 3D & Physics
- **[Three.js](https://threejs.org/)**
- **[@react-three/fiber](https://r3f.docs.pmnd.rs/)** & **[@react-three/drei](https://github.com/pmndrs/drei)**
- **[@react-three/rapier](https://github.com/pmndrs/react-three-rapier)** (Physics engine)
- **[MeshLine](https://github.com/spite/THREE.MeshLine)** (3D lanyard rope simulation)

### Database, Auth & Backend
- **[Supabase](https://supabase.com/)** (PostgreSQL Database, Storage, Row Level Security, Auth SSR)
- **[Resend](https://resend.com/)** (Transactional Email Delivery)
- **[Zod](https://zod.dev/)** & **[React Hook Form](https://react-hook-form.com/)** (Form validation)

---

## 📁 Struktur Direktori / Project Structure

```bash
azz-portfolio/
├── app/                      # Next.js App Router
│   ├── admin/                # Panel CMS Admin (Projects, Tech, Testimonials, dll.)
│   ├── api/                  # API Route Handlers (Admin, Contact, Newsletter, Medium)
│   ├── blog/                 # Halaman daftar blog & artikel
│   ├── resume/               # Halaman Resume digital & fullscreen view
│   ├── work/                 # Halaman Portfolio & Case Studies ([slug])
│   ├── globals.css           # Global CSS & Tailwind design tokens
│   ├── layout.tsx            # Root layout, ThemeProvider, LanguageProvider
│   ├── opengraph-image.tsx   # Dynamic OpenGraph image generator
│   ├── sitemap.ts            # Dynamic XML Sitemap generator
│   └── page.tsx              # Landing page utama
├── components/               # Komponen React Reusable
│   ├── admin/                # Komponen dashboard & CRUD editor
│   ├── blog/                 # Komponen listing & kartu artikel
│   ├── landingPage/          # Komponen landing page (Hero, Work, Tech, Contact, dll.)
│   ├── resume/               # Komponen resume & timeline
│   ├── ui/                   # UI Primitives (Radix UI, GlassButton, dll.)
│   ├── lanyard-with-control.tsx # 3D Physics Lanyard Component
│   └── theme-toggle.tsx      # Dark / Light theme switcher
├── contexts/                 # React Contexts (Language context i18n)
├── data/                     # Fallback data (Projects & Blogs default data)
├── lib/                      # Utilitas & Integrasi
│   ├── cms/                  # Helper queries untuk database Supabase CMS
│   ├── email/                # Integrasi pengiriman email Resend
│   ├── supabase/             # Client, Server, Admin & Middleware Supabase
│   └── validations/          # Schema validasi Zod
├── public/                   # Asset statis (Gambar, 3D glb model, CV PDF, Icons)
├── schema/                   # SQL Scripts (setup.sql & seed.sql untuk Supabase)
├── screenshoot/              # Preview tangkapan layar untuk dokumentasi
└── types/                    # Definisi tipe TypeScript
```

---

## 🚀 Panduan Memulai / Getting Started

### Prasyarat / Prerequisites

Pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) versi 18.18.0 atau lebih baru (Disarankan Node.js 20+)
- Package Manager: `npm`, `pnpm` (disarankan), atau `yarn`

### Instalasi / Installation

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/aziziega/azz-portfolio.git
   cd azz-portfolio
   ```

2. **Install dependensi:**
   ```bash
   pnpm install
   # atau
   npm install
   ```

### Konfigurasi Environment Variables

Buat file `.env.local` di direktori root proyek dan isi variabel berikut:

```env
# ==============================================================================
# SUPABASE CONFIGURATION
# ==============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# ==============================================================================
# SITE & ADMIN CONFIGURATION
# ==============================================================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_ALLOWED_EMAIL=your-admin-email@example.com
ADMIN_LOGIN_USERNAME=admin

# ==============================================================================
# RESEND EMAIL CONFIGURATION
# ==============================================================================
RESEND_API=re_your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### Setup Database & Supabase

1. Buat project baru di [Supabase Console](https://supabase.com/).
2. Buka menu **SQL Editor** pada dashboard Supabase Anda.
3. Jalankan script setup tabel & RLS dari [`schema/setup.sql`](schema/setup.sql).
4. *(Opsional)* Jalankan script seed data awal dari [`schema/seed.sql`](schema/seed.sql) untuk mengunggah sampel proyek, testimoni, dan sertifikat.

### Menjalankan Aplikasi / Running Locally

Jalankan server pengembangan lokal:

```bash
pnpm dev
# atau
npm run dev
```

Buka browser Anda di [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

---

## 🔐 Panel Admin & Headless CMS

Untuk mengelola konten website portofolio:

1. Akses rute `/admin` atau `/admin/login`.
2. Masuk menggunakan email yang telah didaftarkan pada `ADMIN_ALLOWED_EMAIL`.
3. Setelah login, Anda memiliki akses penuh untuk memperbarui:
   - Portofolio Proyek & Case Study
   - Sertifikasi & Lisensi
   - Tech Stack & Kategori Keahlian
   - Artikel Blog / Sinkronisasi Medium
   - Moderasi Testimoni
   - Inbox Pesan Masuk & Daftar Subscriber Newsletter

---

## ⚡ SEO & Optimasi / SEO & Performance

Portofolio ini dioptimalkan secara mendalam untuk mesin pencari:
- **Schema.org Structured Data (JSON-LD)**: Menyediakan metadata tipe `Person` lengkap untuk Google Knowledge Graph.
- **Dynamic OG Images**: Auto-generate kartu pratinjau sosial media via `@vercel/og` (`/opengraph-image`, `/twitter-image`).
- **Dynamic Sitemap & Robots**: Otomatis mengindeks halaman dinamis proyek dan artikel melalui `sitemap.ts` dan `robots.ts`.
- **Accessibility & Semantic HTML**: Struktur heading yang ketat (`h1` - `h6`), ARIA labels, dan screen-reader optimization.

---

## 👨‍💻 Kontributor & Lisensi / Author & License

Dibuat dengan ❤️ oleh **Azizi Egatri Mu'thi**

- 🌐 Website: [aziziem.xyz](https://aziziem.xyz)
- 💼 LinkedIn: [linkedin.com/in/aziziem](https://www.linkedin.com/in/aziziem/)
- 🐙 GitHub: [@aziziega](https://github.com/aziziega)
- ✉️ Email: [aziziegatrim@gmail.com](mailto:aziziegatrim@gmail.com)

---

<div align="center">
  <sub>© 2026 Azizi Egatri Mu'thi. All rights reserved.</sub>
</div>

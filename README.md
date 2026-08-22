<div align="center">

# 🌟 Azizi Egatri Mu'thi — Personal Portfolio & Headless CMS

An interactive, high-performance developer portfolio and headless CMS built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Three.js / React Three Fiber**, **Supabase**, and **Resend**.

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

**azz-portfolio** adalah platform portofolio digital dan Headless CMS modern milik **Azizi Egatri Mu'thi** (*Fullstack Web Developer & Software Engineer*). Proyek ini dirancang tidak hanya sebagai etalase karya digital yang estetik dan interaktif, tetapi juga sebagai platform full-stack dinamis yang terintegrasi dengan **Supabase**, sistem animasi fisika 3D, portal ulasan klien (*Client Feedback Form*), dukungan bilingual (*Indonesian & English*), otomasi notifikasi email, dan sistem newsletter berbasis **Resend API**.

---

## ✨ Fitur Utama / Key Features

### 1. 🪢 3D Interactive Physics Lanyard
- ID Card 3D interaktif yang dapat ditarik, diayunkan, dan berinteraksi secara fisik dengan kursor pengguna menggunakan `@react-three/fiber`, `@react-three/drei`, dan `@react-three/rapier`.
- Mendukung dynamic texture generator untuk tampilan kartu identitas (*light/dark mode*).

### 2. 🛡️ Custom Headless CMS & Admin Dashboard (`/admin`)
- Panel kontrol lengkap terlindungi oleh **Supabase SSR Auth** dan **Email Whitelist Middleware**.
- Manajemen konten penuh (**CRUD**) untuk:
  - 📁 **Projects & Case Studies**: Status (*draft/published/archived*), fitur, tantangan, solusi, galeri gambar, dan tech stack.
  - 🛠️ **Tech Stack**: Kategori, icon URL, dan status profisiensi.
  - 📜 **Certificates**: Kredensial, penerbit, nomor sertifikat, tanggal, file PDF/gambar, dan URL verifikasi.
  - ✍️ **Blog & Writings**: Artikel lokal dan integrasi sinkronisasi RSS Medium.
  - ⭐ **Testimonials Management**: Tinjau ulasan klien, quick approve/reject, baca pesan kritik & saran privat, dan filter sumber (*Admin vs Client*).
  - ✉️ **Contact Messages & Reply**: Notifikasi pesan masuk, preview pesan, dan fitur balasan langsung (*two-way email reply*) ke pengirim.
  - 📬 **Newsletter Subscribers**: Manajemen subscriber, status konfirmasi (*Double Opt-in*), dan fitur broadcast update.
  - ⚙️ **Site Settings**: Pengaturan informasi situs, bio, kontak, dan SEO.

### 3. ⭐ Client Feedback Portal & Interactive Cropper (`/feedback`)
- Halaman formulir khusus klien yang dilindungi oleh access token unik (`/feedback?token=...`).
- **Interactive Avatar Cropping**: Modal crop foto profil interaktif (1:1 circular viewport) dengan kontrol drag/pan dan slider zoom sebelum upload.
- **Inisial Fallback Otomatis**: Generate avatar berinisial nama secara otomatis jika klien tidak mengunggah foto.
- **Kritik & Saran Privat**: Kolom masukan rahasia yang hanya dapat diakses oleh Admin di dashboard.

### 4. 🌐 Dukungan Multi-Bahasa (Bilingual i18n)
- Default **Bahasa Indonesia (`id`)** untuk pengunjung baru, dengan switcher instan ke **English (`en`)** yang tersimpan di `localStorage`.
- Semua data proyek, deskripsi, sertifikat, dan UI mendukung lokalisasi penuh.

### 5. 💼 In-Depth Project Case Studies (`/work/[slug]`)
- Halaman detail studi kasus terstruktur: Problem Statement, Solution, Architecture & Technical Decisions, Challenges, Key Outcomes, dan Image Showcase.

### 6. 📬 Formulir Kontak & Newsletter Terintegrasi (Resend API)
- **Form Kontak**: Notifikasi instan ke email pemilik dan balasan langsung dari CMS ke inbox pengirim.
- **Newsletter**: Alur *Double Opt-in* terautentikasi (link konfirmasi bertoken unik) dan pengiriman *Welcome Email* otomatis menggunakan domain terverifikasi.

### 7. 📄 Resume Interaktif & PDF Viewer (`/resume`)
- Halaman riwayat hidup digital yang terstruktur rapi, lengkap dengan mode *Fullscreen* dan tombol unduh langsung PDF CV.

### 8. 🎨 Desain Modern Bento Grid & Dark/Light Mode
- Desain antarmuka modern dengan gaya Bento Grid, efek glassmorphism, fluid typography, dan transisi tema halus via `next-themes`.

---

## 🛠️ Teknologi & Stack / Tech Stack

### Core Framework & Language
- **[Next.js 16](https://nextjs.org/)** (App Router, Server Components, Route Handlers, Turbopack)
- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**

### UI & Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** & PostCSS
- **[Radix UI](https://www.radix-ui.com/)** (Dialog, Dropdown, Accordion, Tooltip, Avatar, Popover, dll.)
- **[Lucide React](https://lucide.dev/)** (Modern Icon library)
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
- **[Resend](https://resend.com/)** (Transactional & Marketing Email Delivery)
- **[Zod](https://zod.dev/)** & **[React Hook Form](https://react-hook-form.com/)** (Type-safe schema validation)

---

## 📁 Struktur Direktori / Project Structure

```bash
azz-portfolio/
├── app/                      # Next.js App Router
│   ├── admin/                # Panel CMS Admin (Projects, Tech, Testimonials, Messages, dll.)
│   ├── api/                  # API Route Handlers (Admin, Contact, Feedback, Newsletter, Medium)
│   ├── blog/                 # Halaman daftar blog & artikel
│   ├── feedback/             # Halaman portal formulir ulasan klien (Token Protected)
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
│   ├── feedback/             # Komponen formulir ulasan & ImageCropModal
│   ├── landingPage/          # Komponen landing page (Hero, Work, Tech, Contact, dll.)
│   ├── resume/               # Komponen resume & timeline
│   ├── ui/                   # UI Primitives (Radix UI, Marquee, GlassButton, dll.)
│   ├── lanyard-with-control.tsx # 3D Physics Lanyard Component
│   └── theme-toggle.tsx      # Dark / Light theme switcher
├── contexts/                 # React Contexts (Language context i18n)
├── data/                     # Fallback data (Projects & Blogs default data)
├── lib/                      # Utilitas & Integrasi
│   ├── cms/                  # Helper queries untuk database Supabase CMS
│   ├── email/                # Integrasi template & pengiriman email Resend
│   ├── supabase/             # Client, Server, Admin & Middleware Supabase
│   └── validations/          # Schema validasi Zod
├── public/                   # Asset statis (Gambar, 3D glb model, CV PDF, Icons)
├── schema/                   # SQL Scripts (setup.sql untuk schema Supabase)
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
   npm install
   # atau
   pnpm install
   ```

### Konfigurasi Environment Variables

Buat file `.env.local` di direktori root proyek dan isi variabel berikut menggunakan data kredensial Anda:

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
ADMIN_LOGIN_USERNAME=admin
ADMIN_ALLOWED_EMAIL=your-admin-email@example.com

# ==============================================================================
# RESEND EMAIL CONFIGURATION
# ==============================================================================
RESEND_API=re_your_resend_api_key
RESEND_FROM_EMAIL="Your Name <newsletter@yourdomain.com>"

# ==============================================================================
# CLIENT FEEDBACK PORTAL
# ==============================================================================
FEEDBACK_TOKEN=your-secret-feedback-token
NEXT_PUBLIC_FEEDBACK_TOKEN=your-secret-feedback-token
```

### Setup Database & Supabase

1. Buat project baru di [Supabase Console](https://supabase.com/).
2. Buka menu **SQL Editor** pada dashboard Supabase Anda.
3. Jalankan script setup tabel & RLS dari [`schema/setup.sql`](schema/setup.sql).

### Menjalankan Aplikasi / Running Locally

Jalankan server pengembangan lokal:

```bash
npm run dev
# atau
pnpm dev
```

Buka browser Anda di [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

---

## 🔐 Panel Admin & Headless CMS

Untuk mengelola konten website portofolio:

1. Akses rute `/admin` atau `/admin/login`.
2. Masuk menggunakan email yang telah didaftarkan pada `ADMIN_ALLOWED_EMAIL`.
3. Setelah login, Anda memiliki akses penuh untuk memperbarui:
   - Portofolio Proyek & Studi Kasus
   - Sertifikasi & Lisensi
   - Tech Stack & Kategori Keahlian
   - Artikel Blog / Sinkronisasi Medium
   - Moderasi Testimoni & Kritik/Saran Privat Klien
   - Inbox Pesan Masuk & Balas Email Klien
   - Daftar Subscriber Newsletter & Kirim Broadcast Update

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
- 💼 LinkedIn: [linkedin.com/in/aziziegatri](https://linkedin.com/in/aziziegatri)
- 🐙 GitHub: [@aziziega](https://github.com/aziziega)
- ✉️ Email: [aziziegatrim@gmail.com](mailto:aziziegatrim@gmail.com)

---

<div align="center">
  <sub>© 2026 Azizi Egatri Mu'thi. All rights reserved.</sub>
</div>

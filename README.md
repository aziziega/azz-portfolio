<div align="center">

# 🌟 azz-portfolio — Developer Portfolio & Headless CMS

An interactive, high-performance developer portfolio and full-stack headless CMS built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Three.js / React Three Fiber**, **Supabase**, and **Resend**.

**100% Free & Open-Source Template** — Siap di-clone, di-setup, dan dikustomisasi untuk portofolio pribadi Anda!

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_%26_Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Physics-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Resend](https://img.shields.io/badge/Resend-Email_Engine-black?style=for-the-badge&logo=resend)](https://resend.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[**🌐 Live Demo (aziziem.xyz)**](https://aziziem.xyz) • [**🚀 Deploy to Vercel**](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Faziziega%2Fazz-portfolio) • [**🐛 Laporkan Masalah**](https://github.com/aziziega/azz-portfolio/issues)

</div>

---

## 📌 Daftar Isi / Table of Contents

- [📖 Tentang Proyek / About The Project](#-tentang-proyek--about-the-project)
- [✨ Fitur Utama / Key Features](#-fitur-utama--key-features)
  - [1. 🪢 3D Interactive Physics Lanyard](#1--3d-interactive-physics-lanyard)
  - [2. 🛡️ Custom Headless CMS & Admin Dashboard (`/admin`)](#2-️-custom-headless-cms--admin-dashboard-admin)
  - [3. ⭐ Client Feedback Portal & Interactive Avatar Cropper (`/feedback`)](#3--client-feedback-portal--interactive-avatar-cropper-feedback)
  - [4. 🌐 Sistem Bilingual Multi-Bahasa (i18n & JSONB)](#4--sistem-bilingual-multi-bahasa-i18n--jsonb)
  - [5. 💼 In-Depth Project Case Studies (`/work/[slug]`)](#5--in-depth-project-case-studies-workslug)
  - [6. 📬 Email Automation, Newsletter & Direct Reply (Resend API)](#6--email-automation-newsletter--direct-reply-resend-api)
  - [7. 📄 Resume Interaktif & PDF Viewer (`/resume`)](#7--resume-interaktif--pdf-viewer-resume)
  - [8. 🎨 Bento Grid UI, Glassmorphism & Smooth Theme Switcher](#8--bento-grid-ui-glassmorphism--smooth-theme-switcher)
- [🛠️ Teknologi & Stack / Tech Stack](#-teknologi--stack--tech-stack)
- [📁 Struktur Direktori / Project Structure](#-struktur-direktori--project-structure)
- [🚀 Panduan Memulai & Setup Mandiri / Quick Setup Guide](#-panduan-memulai--setup-mandiri--quick-setup-guide)
  - [Langkah 1: Clone & Install Dependensi](#langkah-1-clone--install-dependensi)
  - [Langkah 2: Konfigurasi Database Supabase (SQL Schema)](#langkah-2-konfigurasi-database-supabase-sql-schema)
  - [Langkah 3: Konfigurasi Environment Variables (`.env.local`)](#langkah-3-konfigurasi-environment-variables-envlocal)
  - [Langkah 4: Konfigurasi Akun Admin Pertama](#langkah-4-konfigurasi-akun-admin-pertama)
  - [Langkah 5: Menjalankan Server Lokal](#langkah-5-menjalankan-server-lokal)
- [🎨 Panduan Kustomisasi Konten & Aset](#-panduan-kustomisasi-konten--aset)
- [☁️ Panduan Deploy ke Vercel](#️-panduan-deploy-ke-vercel)
- [⚡ Keamanan & Optimasi SEO](#-keamanan--optimasi-seo)
- [📄 Lisensi & Kontributor / License & Author](#-lisensi--kontributor--license--author)

---

## 📖 Tentang Proyek / About The Project

**azz-portfolio** adalah platform portofolio digital modern dan **Headless Content Management System (CMS)** yang dapat digunakan secara **gratis dan terbuka (open-source)** oleh pengembang, desainer, atau software engineer mana pun yang ingin memiliki portofolio profesional berkinerja tinggi.

Platform ini mengintegrasikan seluruh kebutuhan portofolio level industri:
- **Simulasi Fisika 3D Real-time**: ID Card lanyard 3D interaktif dengan Three.js & Rapier physics.
- **Headless CMS Dashboard Penuh**: Panel admin mandiri untuk mengelola Proyek, Tech Stack, Sertifikat, Artikel Blog (sinkronisasi Medium RSS), Testimoni Klien, Pesan Kontak, dan Newsletter.
- **Portal Ulasan Klien Khusus**: URL formulir aman bertoken unik, pemotong avatar interaktif (1:1 circular cropper), dan masukan kritik rahasia.
- **Sistem Email Transaksional**: Integrasi Resend API untuk formulir kontak, notifikasi, double opt-in newsletter, dan fitur balas email langsung dari dashboard admin.
- **Dukungan Bilingual (ID & EN)**: Arsitektur multi-bahasa terpadu pada antarmuka dan basis data PostgreSQL (`JSONB`).

---

## ✨ Fitur Utama / Key Features

### 1. 🪢 3D Interactive Physics Lanyard
- **Simulasi Kartu Identitas 3D**: Lanyard ID Card yang dapat ditarik, diayunkan, dan berinteraksi secara fisik terhadap gravitasi dan drag kursor pengguna secara real-time.
- **Tech Stack 3D**: Menggunakan `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier` (physics engine), dan `meshline` untuk tali lanyard yang lentur.
- **Dynamic Texture Generator**: Tekstur kartu identitas dihasilkan secara dinamis mengikuti preferensi tema (*light / dark mode*).

### 2. 🛡️ Custom Headless CMS & Admin Dashboard (`/admin`)
- **Proteksi Akses Berlapis**: Terlindungi oleh **Supabase SSR Auth** dan **Email Whitelist Middleware** (`ADMIN_ALLOWED_EMAIL`).
- **Modul Manajemen Konten Lengkap (CRUD)**:
  - 📁 **Projects & Case Studies**: Kelola proyek dengan status (*draft/published/archived*), fitur unggulan (*featured*), deskripsi bilingual, tantangan, solusi, hasil, galeri multi-gambar, tech stack, dan pemicu broadcast subscriber otomatis.
  - 🛠️ **Tech Stack Manager**: Kelola daftar teknologi, kategori, ikon, warna aksen, tingkat kemahiran, dan urutan sorting.
  - 📜 **Certifications & Licences**: Kelola sertifikat, penerbit, tahun penerbitan, URL verifikasi kredensial, preview file PDF/gambar, dan fitur reorder cepat.
  - ✍️ **Blog & External Writings**: Kelola artikel lokal serta integrasi **sinkronisasi otomatis RSS feed Medium**.
  - ⭐ **Testimonials Moderation**: Tinjau ulasan klien, status persetujuan (*pending / published / draft*), preview foto avatar, dan baca kritik/saran privat.
  - ✉️ **Contact Messages & Two-Way Reply**: Kotak masuk pesan kontak, pelacakan status (*new, read, replied, archived*), serta **fitur kirim balasan email langsung ke klien dari dashboard**.
  - 📬 **Newsletter Hub**: Daftar subscriber, status verifikasi (*Double Opt-in*), pembersihan kontak, dan pengiriman pesan broadcast.
  - ⚙️ **Site Settings**: Pengaturan dinamis untuk bio hero, kontak publik, tautan sosial media, dan default metadata SEO.

### 3. ⭐ Client Feedback Portal & Interactive Avatar Cropper (`/feedback`)
- **Akses Aman Bertoken**: Portal ulasan klien dilindungi oleh token rahasia (`/feedback?token=...`).
- **Interactive Avatar Cropper**: Modal pemotong foto interaktif (viewport bundar 1:1) dengan dukungan kontrol drag/pan dan slider pembesar (zoom) sebelum foto diunggah ke Supabase Storage.
- **Smart Avatar Fallback**: Otomatis menghasilkan avatar inisial nama yang elegan apabila klien tidak menyertakan foto profil.
- **Kritik & Saran Privat**: Kolom masukan rahasia yang tidak ditampilkan ke publik, hanya dapat dibaca oleh Admin di dashboard CMS.

### 4. 🌐 Sistem Bilingual Multi-Bahasa (i18n & JSONB)
- **Dukungan Bahasa Indonesia (`id`) & Bahasa Inggris (`en`)**: Pengunjung dapat mengganti bahasa kapan saja melalui switcher di navbar, dengan preferensi tersimpan di `localStorage`.
- **Database Multilingual**: Struktur tabel di Supabase menggunakan tipe data `jsonb` (contoh: `title: {"en": "...", "id": "..."}`), memastikan data dinamis dari CMS dapat disajikan secara dwibahasa secara akurat.

### 5. 💼 In-Depth Project Case Studies (`/work/[slug]`)
- Halaman detail studi kasus proyek komprehensif: Problem Statement, Solution, Technical & Architecture Decisions, Challenges, Key Outcomes, Tech Stack Badges, Image Showcase, serta navigasi proyek sebelumnya & berikutnya.
- Dynamic Metadata & OpenGraph generator otomatis per halaman proyek untuk preview sosial media yang kaya.

### 6. 📬 Email Automation, Newsletter & Direct Reply (Resend API)
- **Form Kontak Terintegrasi**: Notifikasi instan masuk ke email pemilik saat ada pesan baru dari form kontak.
- **Two-Way Reply dari CMS**: Admin dapat langsung membalas email pengunjung/klien dari dashboard admin melalui integrasi Resend API.
- **Newsletter Double Opt-in**: Pengunjung yang mendaftar newsletter menerima email verifikasi bertoken unik, diikuti email selamat datang (*Welcome Email*) otomatis setelah konfirmasi.

### 7. 📄 Resume Interaktif & PDF Viewer (`/resume`)
- Halaman resume digital terstruktur rapi yang mencakup Ringkasan Profesional, Pengalaman Kerja, Pendidikan, Keahlian Teknis, dan Proyek Utama.
- Dilengkapi dengan fitur **Fullscreen Mode** (`/resume/fullscreen`), tombol print khusus (print-friendly CSS), dan tombol unduh langsung file PDF CV asli.

### 8. 🎨 Bento Grid UI, Glassmorphism & Smooth Theme Switcher
- Tampilan modern dengan arsitektur Bento Grid, efek glassmorphism, tipografi halus, dan transisi tema (*Dark / Light mode*) tanpa efek flicker via `next-themes`.

---

## 🛠️ Teknologi & Stack / Tech Stack

| Kategori | Teknologi & Library |
| :--- | :--- |
| **Framework & Core** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, SSR, Server Actions), [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/), PostCSS, [Radix UI](https://www.radix-ui.com/) Primitives, [Lucide Icons](https://lucide.dev/) |
| **Animasi & Interaktivitas** | [Motion (Framer Motion v12)](https://motion.dev/), [Embla Carousel](https://www.embla-carousel.com/), [Sonner Toast](https://sonner.emilkowal.ski/), [Vaul Drawer](https://vaul.emilkowal.ski/) |
| **3D & Physics Engine** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/rapier](https://github.com/pmndrs/react-three-rapier), MeshLine |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth SSR, Storage Buckets) |
| **Email Engine** | [Resend API](https://resend.com/) (Transactional emails, Double opt-in verification, Newsletter broadcast) |
| **Validasi & Forms** | [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/), `@hookform/resolvers` |
| **Analytics & SEO** | [@vercel/analytics](https://vercel.com/analytics), Dynamic JSON-LD (Schema.org Person & CreativeWork), Dynamic Sitemap & OG Image |

---

## 📁 Struktur Direktori / Project Structure

```bash
azz-portfolio/
├── app/                        # Next.js App Router
│   ├── admin/                  # Panel Headless CMS Admin (Projects, Tech, Testimonials, Messages, dll.)
│   │   ├── auth/               # OAuth & Magic link auth callback
│   │   ├── certificates/       # Manajemen sertifikasi (List, New, Edit)
│   │   ├── login/              # Halaman login admin
│   │   ├── messages/           # Manajemen pesan kontak & fitur reply email
│   │   ├── newsletter/         # Manajemen subscriber & pengiriman broadcast
│   │   ├── projects/           # Manajemen portofolio & studi kasus
│   │   ├── site/               # Pengaturan bio, kontak, dan SEO situs
│   │   ├── tech-stack/         # Manajemen master teknologi & keahlian
│   │   ├── testimonials/       # Moderasi ulasan klien & kritik privat
│   │   └── writing/            # Manajemen artikel & sinkronisasi Medium RSS
│   ├── api/                    # API Route Handlers
│   │   ├── admin/              # Endpoint terlindungi untuk seluruh modul CMS
│   │   ├── certificates/       # Public API data sertifikat
│   │   ├── contact/            # Endpoint pengiriman formulir kontak
│   │   ├── feedback/           # Endpoint submit ulasan klien & upload avatar
│   │   ├── medium/             # Endpoint fetch artikel Medium
│   │   ├── newsletter/         # Endpoint langganan & verifikasi token newsletter
│   │   ├── projects/           # Public API data proyek
│   │   ├── tech-stacks/        # Public API data tech stack
│   │   ├── testimonials/       # Public API data testimoni
│   │   └── writings/           # Public API data artikel
│   ├── blog/                   # Halaman daftar blog & artikel
│   ├── feedback/               # Portal formulir ulasan klien (Token Protected)
│   ├── resume/                 # Halaman resume digital, print view & fullscreen mode
│   ├── work/                   # Halaman portfolio & studi kasus mendalam ([slug])
│   ├── globals.css             # Desain token Tailwind CSS v4 & custom animations
│   ├── layout.tsx              # Root Layout, ThemeProvider, LanguageProvider
│   ├── opengraph-image.tsx     # Dynamic OpenGraph generator
│   ├── sitemap.ts              # Dynamic XML Sitemap generator
│   ├── robots.ts               # Dynamic Robots.txt generator
│   └── page.tsx                # Landing page utama
├── components/                 # Komponen React Reusable
│   ├── admin/                  # Komponen antarmuka dashboard CMS & editor
│   ├── blog/                   # Komponen kartu artikel & feed
│   ├── feedback/               # Form ulasan klien & ImageCropModal (Cropper 1:1)
│   ├── landingPage/            # Komponen landing page (Hero, Work, Tech, Certs, Testimonials, dll.)
│   ├── resume/                 # Komponen dokumen resume terstruktur
│   ├── ui/                     # UI Primitives (Radix, Dialog, Dropdown, Button, dll.)
│   ├── lanyard-with-control.tsx # Komponen 3D Physics Lanyard Card
│   ├── theme-provider.tsx      # Provider next-themes
│   └── theme-toggle.tsx        # Tombol pengalih Dark/Light mode
├── contexts/                   # Contexts (Language context i18n & translations)
├── data/                       # Fallback data default saat database belum terisi
├── lib/                        # Modul utilitas & integrasi
│   ├── cms/                    # Kueri database Supabase untuk seluruh entitas CMS
│   ├── email/                  # Template email HTML & integrasi Resend API
│   ├── supabase/               # Client, Server, Admin, dan Middleware Supabase
│   └── validations/            # Skema validasi Zod untuk form & API
├── public/                     # Asset statis (Gambar, 3D glb model, CV PDF, Icons)
├── schema/                     # SQL Scripts (setup.sql & seed.sql untuk Supabase)
├── .env.example                # Template konfigurasi environment variables
└── types/                      # Definisi tipe TypeScript
```

---

## 🚀 Panduan Memulai & Setup Mandiri / Quick Setup Guide

Ikuti langkah-langkah berikut untuk menjalankan dan meng-host portofolio ini dengan mudah:

### Langkah 1: Clone & Install Dependensi

```bash
git clone https://github.com/aziziega/azz-portfolio.git
cd azz-portfolio

# Install dependensi via pnpm (disarankan) atau npm
pnpm install
# atau
npm install
```

### Langkah 2: Konfigurasi Database Supabase (SQL Schema)

1. Buat project baru di [Supabase Dashboard](https://supabase.com/dashboard).
2. Masuk ke menu **SQL Editor** pada project Supabase Anda.
3. Buka file [`schema/setup.sql`](schema/setup.sql), salin seluruh isinya, dan tempelkan pada SQL Editor lalu jalankan (**Run**):
   - *Skrip ini akan membuat seluruh tabel, trigger `updated_at`, fungsi `is_admin()`, kebijakan RLS, dan Storage Buckets (`project-images`, `site-assets`).*
4. *(Opsional)* Jalankan file [`schema/seed.sql`](schema/seed.sql) untuk mengisi data awal proyek, sertifikat, tech stack, dan testimoni dummy sebagai referensi.

### Langkah 3: Konfigurasi Environment Variables (`.env.local`)

Salin file `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Buka `.env.local` dan lengkapi nilainya:

```env
# 1. Supabase (Project Settings -> API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# 2. Site & Admin CMS
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_LOGIN_USERNAME=admin
ADMIN_ALLOWED_EMAIL=your-admin-email@example.com

# 3. Resend Email Engine (https://resend.com/api-keys)
RESEND_API=re_your_resend_api_key
RESEND_FROM_EMAIL="Your Name <newsletter@yourdomain.com>"

# 4. Client Feedback Portal Token
FEEDBACK_TOKEN=your-random-feedback-secret-token
NEXT_PUBLIC_FEEDBACK_TOKEN=your-random-feedback-secret-token
```

### Langkah 4: Konfigurasi Akun Admin Pertama

1. Di Supabase Dashboard, buka menu **Authentication** -> **Users**.
2. Klik **Add User** -> **Create User** dan masukkan email yang sama persis dengan `ADMIN_ALLOWED_EMAIL` di `.env.local` beserta password pilihan Anda.
3. Buka **SQL Editor** dan pastikan email tersebut terdaftar di tabel `admin_users`:
   ```sql
   INSERT INTO public.admin_users (email, role)
   VALUES ('your-admin-email@example.com', 'owner')
   ON CONFLICT (email) DO NOTHING;
   ```

### Langkah 5: Menjalankan Server Lokal

```bash
pnpm dev
# atau
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat portofolio Anda, dan buka [http://localhost:3000/admin](http://localhost:3000/admin) untuk masuk ke panel CMS!

---

## 🎨 Panduan Kustomisasi Konten & Aset

Untuk mengubah identitas portofolio menjadi identitas Anda sendiri:

| Yang Ingin Diubah | Lokasi File / Pengaturan |
| :--- | :--- |
| **Foto Profil & Avatar** | Ganti file foto di [`public/me-02.jpg`](public/me-02.jpg) atau upload via CMS. |
| **File Resume / CV PDF** | Ganti file PDF di [`public/cv.pdf`](public/cv.pdf) agar tombol unduh resume mengunduh CV Anda. |
| **Bio, Kontak, & Social Links** | Masuk ke dashboard CMS di `/admin/site` atau sesuaikan fallback di [`contexts/language-contexts.tsx`](contexts/language-contexts.tsx). |
| **Teks ID Card 3D Lanyard** | Sesuaikan teks nama dan role pada [`components/lanyard-with-control.tsx`](components/lanyard-with-control.tsx) dan [`components/card-template.tsx`](components/card-template.tsx). |
| **Favicon & App Icons** | Ganti [`app/icon.png`](app/icon.png) dan [`app/apple-icon.png`](app/apple-icon.png). |
| **Metadata SEO (JSON-LD)** | Sesuaikan nama, deskripsi, dan social links pada tag `<script type="application/ld+json">` di [`app/page.tsx`](app/page.tsx). |

---

## ☁️ Panduan Deploy ke Vercel

1. Push repository Anda ke akun GitHub pribadi.
2. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan klik **Add New** -> **Project**.
3. Import repository `azz-portfolio` Anda.
4. Pada bagian **Environment Variables**, tambahkan seluruh variabel dari file `.env.local` Anda.
5. Ubah `NEXT_PUBLIC_SITE_URL` menjadi domain produksi Vercel Anda (misal: `https://portofolio-anda.vercel.app`).
6. Klik **Deploy**. Website dan Headless CMS Anda akan langsung live dalam hitungan menit!

---

## ⚡ Keamanan & Optimasi SEO

- **Row Level Security (RLS)**: Setiap tabel database Supabase dilindungi oleh RLS ketat; pengunjung publik hanya dapat membaca data yang berstatus `published`.
- **Security Headers**: Dilengkapi konfigurasi header keamanan standar industri di `next.config.mjs` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
- **Structured Data (JSON-LD)**: Mengimplementasikan schema [Schema.org](https://schema.org) tipe `Person` pada halaman utama dan tipe `CreativeWork` pada halaman studi kasus proyek untuk mendukung Google Rich Results.
- **Dynamic OG & Twitter Cards**: Auto-generate banner preview sosial media berbasis Next.js Image Response (`/opengraph-image`, `/twitter-image`).
- **Sitemap & Robots**: Generator XML Sitemap dinamis (`/sitemap.xml`) yang mengikutsertakan seluruh slug proyek dan artikel blog.

---

## 📄 Lisensi & Kontributor / License & Author

Proyek ini dilisensikan di bawah lisensi **MIT License** — Anda bebas menggunakan, memodifikasi, dan mendistribusikannya untuk keperluan pribadi maupun komersial.

Dikonsep, didesain, dan dikembangkan dengan ❤️ oleh **Azizi Egatri Mu'thi**

- 🌐 Website: [aziziem.xyz](https://aziziem.xyz)
- 💼 LinkedIn: [linkedin.com/in/aziziem](https://linkedin.com/in/aziziem)
- 🐙 GitHub: [@aziziega](https://github.com/aziziega)

---

<div align="center">
  <sub>⭐️ Jika template ini bermanfaat untuk Anda, jangan lupa berikan bintang di GitHub!</sub>
</div>


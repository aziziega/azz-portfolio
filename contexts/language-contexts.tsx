"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "id"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.work": "Work",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Hero Section
    "hero.role": "Fullstack Web Developer",
    "hero.location": "Prambanan, Klaten, Central Java Indonesia.",
    "hero.bio": "Fullstack Web Developer delivering scalable, end-to-end web solutions with Next.js, React, Supabase, and Node.js. I transform complex requirements into clean, intuitive digital experiences. Reliable, continuously learning, and committed to modern best practices.",
    // Line Available
    "lineAvailable.available": "Available for New Projects",
    "lineAvailable.services": "Design & Development",
    "lineAvailable.cta": "Let's Build Something Amazing",
    // Work Section
    "work.title": "Featured Work",
    "work.viewAll": "View All",
    "work.project1.tag": "Design System",
    "work.project1.title": "Unified Component Library",
    "work.project1.desc": "Built a scalable design system serving 50+ product teams with consistent patterns and reusable components.",
    "work.project2.tag": "Mobile App",
    "work.project2.title": "Wellness Tracking Platform",
    "work.project2.desc": "Designed and developed a cross-platform mobile experience that helps users maintain healthy habits.",
    "work.project3.tag": "E-Commerce",
    "work.project3.title": "Sustainable Fashion Marketplace",
    "work.project3.desc": "Created a seamless shopping experience for eco-conscious consumers with integrated sustainability metrics.",

    // Tech Stack Section
    "techStack.title": "TECH STACK",
    "techStack.subtitle": "All projects here are based on this tech stack",

    // Blog Section
    "blog.title": "Latest Articles",
    "blog.viewAll": "View All",
    "blog.readMore": "Read More →",
    "blog.article1.tag": "Design Systems",
    "blog.article1.date": "January 15, 2026",
    "blog.article1.title": "Building Scalable Component Libraries",
    "blog.article1.desc": "Learn how to create maintainable design systems that grow with your product and team. A comprehensive guide to tokens, components, and documentation.",
    "blog.article2.tag": "Development",
    "blog.article2.date": "January 8, 2026",
    "blog.article2.title": "Modern React Patterns for 2026",
    "blog.article2.desc": "Exploring the latest patterns and best practices in React development, from server components to advanced state management techniques.",
    "blog.article3.tag": "Product Design",
    "blog.article3.date": "December 28, 2025",
    "blog.article3.title": "The Art of Micro-Interactions",
    "blog.article3.desc": "Discover how subtle animations and feedback mechanisms can dramatically improve user experience and product delight.",

    // Newsletter Section
    "newsletter.title": "Stay Updated",
    "newsletter.subtitle": "Get insights on design, development, and product thinking delivered to your inbox.",
    "newsletter.placeholder": "Enter your email",
    "newsletter.button": "Subscribe",

    // Contact Section
    "contact.title": "Let's Work Together",
    "contact.subtitle": "I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out.",
    "contact.email": "aziziegatrim@gmail.com",
    "contact.location": "Prambanan, Klaten, Jawa Tengah Indonesia.",
    "contact.form.name": "Name",
    "contact.form.namePlaceholder": "Your name",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "your@email.com",
    "contact.form.subject": "Subject",
    "contact.form.subjectPlaceholder": "What's this about?",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Tell me more...",
    "contact.form.submit": "Send Message",

    // Work Page
    "work.page.title": "Featured Work",
    "work.page.subtitle": "A collection of projects showcasing my expertise in fullstack web development. From CRM systems to healthcare solutions, each project demonstrates scalable architecture, clean code, and modern best practices.",
    
    // Project Detail
    "project.challenge": "The Challenge",
    "project.solution": "The Solution",
    "project.features": "Key Features",
    "project.techStack": "Technologies Used",
    "project.gallery": "Project Gallery",
    "project.challenges": "Challenges & Solutions",
    "project.outcomes": "Results & Impact",
    "project.designProcess": "Design Process",
    "project.lessonsLearned": "Lessons Learned",
    
    // Project Navigation
    "project.nav.back": "Back to All Projects",
    "project.nav.previous": "Previous",
    "project.nav.next": "Next",
    "project.viewLive": "View Live Demo",
    "project.viewCode": "View Code",

    // Footer
    "footer.copyright": "© 2026 Azizi Egatri M. All rights reserved.",

    // footer bar
    "foot.about": "About",
    "foot.work": "Work",
    "foot.blog": "Blog",
    "foot.contact": "Contact",
  },
  id: {
    // Navbar
    "nav.about": "Tentang",
    "nav.work": "Karya",
    "nav.blog": "Blog",
    "nav.contact": "Kontak",

    // Hero Section
    "hero.role": "Fullstack Web Developer",
    "hero.location": "Prambanan, Klaten, Jawa Tengah Indonesia.",
    "hero.bio": "Fullstack Web Developer yang menghadirkan solusi web scalable dan end-to-end dengan Next.js, React, Supabase, dan Node.js. Saya mengubah requirement kompleks menjadi pengalaman digital yang clean dan intuitif. Dapat diandalkan, terus belajar, dan berkomitmen pada best practices modern.",

    // Line Available
    "lineAvailable.available": "Tersedia untuk Proyek Baru",
    "lineAvailable.services": "Desain & Pengembangan",
    "lineAvailable.cta": "Mari Membangun Sesuatu yang Luar Biasa",

    // Work Section
    "work.title": "Karya Unggulan",
    "work.viewAll": "Lihat Semua",
    "work.project1.tag": "Sistem Desain",
    "work.project1.title": "Pustaka Komponen Terpadu",
    "work.project1.desc": "Membangun sistem desain yang dapat diskalakan melayani 50+ tim produk dengan pola konsisten dan komponen yang dapat digunakan kembali.",
    "work.project2.tag": "Aplikasi Mobile",
    "work.project2.title": "Platform Pelacakan Kesehatan",
    "work.project2.desc": "Merancang dan mengembangkan pengalaman mobile lintas platform yang membantu pengguna mempertahankan kebiasaan sehat.",
    "work.project3.tag": "E-Commerce",
    "work.project3.title": "Pasar Fashion Berkelanjutan",
    "work.project3.desc": "Menciptakan pengalaman belanja yang mulus untuk konsumen yang sadar lingkungan dengan metrik keberlanjutan terintegrasi.",

    // Tech Stack Section
    "techStack.title": "TEKNOLOGI",
    "techStack.subtitle": "Semua proyek di sini dibuat dengan teknologi ini",

    // Blog Section
    "blog.title": "Artikel Terbaru",
    "blog.viewAll": "Lihat Semua",
    "blog.readMore": "Baca Selengkapnya →",
    "blog.article1.tag": "Sistem Desain",
    "blog.article1.date": "15 Januari 2026",
    "blog.article1.title": "Membangun Pustaka Komponen yang Dapat Diskalakan",
    "blog.article1.desc": "Pelajari cara membuat sistem desain yang dapat dipelihara dan tumbuh bersama produk dan tim Anda. Panduan komprehensif tentang token, komponen, dan dokumentasi.",
    "blog.article2.tag": "Pengembangan",
    "blog.article2.date": "8 Januari 2026",
    "blog.article2.title": "Pola React Modern untuk 2026",
    "blog.article2.desc": "Menjelajahi pola terbaru dan praktik terbaik dalam pengembangan React, dari komponen server hingga teknik manajemen state lanjutan.",
    "blog.article3.tag": "Desain Produk",
    "blog.article3.date": "28 Desember 2025",
    "blog.article3.title": "Seni Mikro-Interaksi",
    "blog.article3.desc": "Temukan bagaimana animasi halus dan mekanisme umpan balik dapat secara dramatis meningkatkan pengalaman pengguna dan kepuasan produk.",

    // Newsletter Section
    "newsletter.title": "Tetap Update",
    "newsletter.subtitle": "Dapatkan wawasan tentang desain, pengembangan, dan pemikiran produk yang dikirim ke inbox Anda.",
    "newsletter.placeholder": "Masukkan email Anda",
    "newsletter.button": "Berlangganan",

    // Contact Section
    "contact.title": "Mari Bekerja Sama",
    "contact.subtitle": "Saya selalu tertarik mendengar tentang proyek dan peluang baru. Baik Anda memiliki pertanyaan atau hanya ingin menyapa, jangan ragu untuk menghubungi.",
    "contact.email": "aziziegatrim@gmail.com",
    "contact.location": "Prambanan, Klaten, Jawa Tengah Indonesia.",
    "contact.form.name": "Nama",
    "contact.form.namePlaceholder": "Nama Anda",
    "contact.form.email": "Email",
    "contact.form.emailPlaceholder": "email@anda.com",
    "contact.form.subject": "Subjek",
    "contact.form.subjectPlaceholder": "Tentang apa ini?",
    "contact.form.message": "Pesan",
    "contact.form.messagePlaceholder": "Ceritakan lebih lanjut...",
    "contact.form.submit": "Kirim Pesan",

    // Work Page
    "work.page.title": "Karya Unggulan",
    "work.page.subtitle": "Koleksi proyek yang menunjukkan keahlian saya dalam pengembangan web fullstack. Dari sistem CRM hingga solusi healthcare, setiap proyek mendemonstrasikan arsitektur yang scalable, clean code, dan best practices modern.",
    
    // Project Detail
    "project.challenge": "Tantangan",
    "project.solution": "Solusi",
    "project.features": "Fitur Utama",
    "project.techStack": "Teknologi yang Digunakan",
    "project.gallery": "Galeri Proyek",
    "project.challenges": "Tantangan & Solusi",
    "project.outcomes": "Hasil & Dampak",
    "project.designProcess": "Proses Desain",
    "project.lessonsLearned": "Pelajaran yang Dipetik",
    
    // Project Navigation
    "project.nav.back": "Kembali ke Semua Proyek",
    "project.nav.previous": "Sebelumnya",
    "project.nav.next": "Berikutnya",
    "project.viewLive": "Lihat Demo Live",
    "project.viewCode": "Lihat Kode",

    // Footer
    "footer.copyright": "© 2026 Azizi Egatri M. Hak cipta dilindungi.",
    // footer bar
    "foot.about": "Tentang",
    "foot.work": "Karya",
    "foot.blog": "Blog",
    "foot.contact": "Kontak",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
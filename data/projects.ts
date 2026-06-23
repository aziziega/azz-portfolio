// Project data structure and dummy projects for portfolio

export interface Project {
  // Identification
  slug: string
  id: string
  
  // Basic Info
  title: string
  tagline: string
  description: string
  category: string
  tags: string[]
  
  // Visual Assets
  thumbnail: string
  images: string[]
  
  // Project Details
  year: number
  duration: string
  role: string
  client: string
  teamSize: string
  
  // Links
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  
  // Content Sections
  problem: string
  solution: string
  features: string[]
  challenges: string[]
  outcomes: string[]
  techStack: string[]
  
  // Design Process
  designProcess?: string[]
  
  // Lessons Learned
  lessonsLearned?: string[]
  
  // Metadata
  featured: boolean
  published: boolean
  order: number
}

// Bilingual content structure
interface BilingualContent {
  en: string
  id: string
}

interface BilingualProject {
  slug: string
  id: string
  title: BilingualContent
  tagline: BilingualContent
  description: BilingualContent
  category: BilingualContent
  tags: string[]
  thumbnail: string
  images: string[]
  year: number
  duration: BilingualContent
  role: BilingualContent
  client: BilingualContent
  teamSize: BilingualContent
  liveUrl?: string
  githubUrl?: string
  caseStudyUrl?: string
  problem: BilingualContent
  solution: BilingualContent
  features: BilingualContent[]
  challenges: BilingualContent[]
  outcomes: BilingualContent[]
  techStack: string[]
  designProcess?: BilingualContent[]
  lessonsLearned?: BilingualContent[]
  featured: boolean
  published: boolean
  order: number
}

export const projectsData: BilingualProject[] = [
  // Project 1: GymFlow CRM
  {
    slug: "gymflow-crm-system",
    id: "proj-001",
    title: {
      en: "GymFlow - Gym Management CRM",
      id: "GymFlow - Sistem CRM Manajemen Gym"
    },
    tagline: {
      en: "Complete gym management solution with member tracking and billing automation",
      id: "Solusi manajemen gym lengkap dengan pelacakan member dan otomasi billing"
    },
    description: {
      en: "GymFlow is a comprehensive CRM system designed specifically for gym and fitness center management. It streamlines member management, class scheduling, payment processing, and performance analytics in one unified platform. Built with scalability in mind to handle gyms of all sizes.",
      id: "GymFlow adalah sistem CRM komprehensif yang dirancang khusus untuk manajemen gym dan fitness center. Sistem ini menyederhanakan manajemen member, penjadwalan kelas, pemrosesan pembayaran, dan analitik performa dalam satu platform terpadu. Dibangun dengan skalabilitas untuk menangani gym dari berbagai ukuran."
    },
    category: {
      en: "Web App",
      id: "Aplikasi Web"
    },
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "TailwindCSS"],
    thumbnail: "/modern-design-system-interface.png",
    images: [
      "/modern-design-system-interface.png",
      "/mobile-app-interface.png",
      "/modern-ecommerce-website.png"
    ],
    year: 2025,
    duration: {
      en: "4 months (Jan 2025 - Apr 2025)",
      id: "4 bulan (Jan 2025 - Apr 2025)"
    },
    role: {
      en: "Fullstack Developer",
      id: "Fullstack Developer"
    },
    client: {
      en: "FitnessPro Indonesia",
      id: "FitnessPro Indonesia"
    },
    teamSize: {
      en: "Solo Project",
      id: "Proyek Solo"
    },
    liveUrl: "https://gymflow-demo.vercel.app",
    githubUrl: "https://github.com/aziziega/gymflow-crm",
    problem: {
      en: "Gym owners struggled with fragmented systems for member management, billing, and class scheduling. Manual processes led to errors, missed payments, and poor member experience. No unified view of gym performance metrics.",
      id: "Pemilik gym kesulitan dengan sistem yang terfragmentasi untuk manajemen member, billing, dan penjadwalan kelas. Proses manual menyebabkan kesalahan, pembayaran yang terlewat, dan pengalaman member yang buruk. Tidak ada tampilan terpadu untuk metrik performa gym."
    },
    solution: {
      en: "Developed an all-in-one CRM platform that integrates member management, automated billing with Stripe, class scheduling with calendar sync, and real-time analytics dashboard. Mobile-responsive design ensures access from anywhere.",
      id: "Mengembangkan platform CRM all-in-one yang mengintegrasikan manajemen member, billing otomatis dengan Stripe, penjadwalan kelas dengan sinkronisasi kalender, dan dashboard analitik real-time. Desain responsif mobile memastikan akses dari mana saja."
    },
    features: [
      {
        en: "Member Management - Complete member profiles with photos, medical history, and attendance tracking",
        id: "Manajemen Member - Profil member lengkap dengan foto, riwayat medis, dan pelacakan kehadiran"
      },
      {
        en: "Automated Billing - Recurring payment processing with Stripe integration and invoice generation",
        id: "Billing Otomatis - Pemrosesan pembayaran berulang dengan integrasi Stripe dan pembuatan invoice"
      },
      {
        en: "Class Scheduling - Interactive calendar with capacity management and waitlist functionality",
        id: "Penjadwalan Kelas - Kalender interaktif dengan manajemen kapasitas dan fungsi waitlist"
      },
      {
        en: "Analytics Dashboard - Real-time metrics on revenue, attendance, and member retention",
        id: "Dashboard Analitik - Metrik real-time tentang revenue, kehadiran, dan retensi member"
      },
      {
        en: "Mobile App - Progressive Web App for members to book classes and track progress",
        id: "Aplikasi Mobile - Progressive Web App untuk member booking kelas dan melacak progress"
      }
    ],
    challenges: [
      {
        en: "Stripe Integration Complexity - Had to handle various payment scenarios including failed payments, refunds, and subscription changes. Implemented webhook system for reliable payment status updates.",
        id: "Kompleksitas Integrasi Stripe - Harus menangani berbagai skenario pembayaran termasuk pembayaran gagal, refund, dan perubahan subscription. Mengimplementasikan sistem webhook untuk update status pembayaran yang reliable."
      },
      {
        en: "Real-time Data Sync - Needed instant updates across multiple user sessions. Solved using Supabase real-time subscriptions for live data synchronization.",
        id: "Sinkronisasi Data Real-time - Membutuhkan update instan di berbagai sesi user. Diselesaikan menggunakan Supabase real-time subscriptions untuk sinkronisasi data live."
      }
    ],
    outcomes: [
      {
        en: '40% reduction in administrative time through automation',
        id: '40% pengurangan waktu administratif melalui otomasi'
      },
      {
        en: '95% payment collection rate with automated reminders',
        id: '95% tingkat pengumpulan pembayaran dengan reminder otomatis'
      },
      {
        en: '25% increase in member retention through better engagement',
        id: '25% peningkatan retensi member melalui engagement yang lebih baik'
      },
      {
        en: 'Successfully deployed to 12 gym locations across Indonesia',
        id: 'Berhasil di-deploy ke 12 lokasi gym di seluruh Indonesia'
      }
    ],
    techStack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe', 'TailwindCSS', 'Chart.js'],
    designProcess: [
      {
        en: 'User Research - Interviewed 15 gym owners to understand pain points',
        id: 'Riset User - Wawancara 15 pemilik gym untuk memahami pain points'
      },
      {
        en: 'Wireframing - Created low-fidelity mockups for key workflows',
        id: 'Wireframing - Membuat mockup low-fidelity untuk workflow kunci'
      },
      {
        en: 'Prototype Testing - Tested with 3 pilot gyms before full launch',
        id: 'Tes Prototype - Testing dengan 3 gym pilot sebelum launch penuh'
      }
    ],
    lessonsLearned: [
      {
        en: 'Payment integration requires extensive error handling and edge case management',
        id: 'Integrasi pembayaran membutuhkan error handling ekstensif dan manajemen edge case'
      },
      {
        en: 'Real-time features significantly improve user experience but add complexity',
        id: 'Fitur real-time secara signifikan meningkatkan user experience namun menambah kompleksitas'
      }
    ],
    featured: true,
    published: true,
    order: 1
  },

  // Project 2: MediCore ERP
  {
    slug: 'medicore-erp-system',
    id: 'proj-002',
    title: {
      en: 'MediCore - Healthcare ERP System',
      id: 'MediCore - Sistem ERP Rekam Medis'
    },
    tagline: {
      en: 'Comprehensive electronic medical records system for clinics and hospitals',
      id: 'Sistem rekam medis elektronik komprehensif untuk klinik dan rumah sakit'
    },
    description: {
      en: 'MediCore is an enterprise resource planning system specifically designed for healthcare providers. It manages patient records, appointment scheduling, prescription management, and billing in compliance with healthcare regulations. Built with security and data privacy as top priorities.',
      id: 'MediCore adalah sistem enterprise resource planning yang dirancang khusus untuk penyedia layanan kesehatan. Sistem ini mengelola rekam medis pasien, penjadwalan appointment, manajemen resep, dan billing yang sesuai dengan regulasi kesehatan. Dibangun dengan keamanan dan privasi data sebagai prioritas utama.'
    },
    category: {
      en: 'Web App',
      id: 'Aplikasi Web'
    },
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'TailwindCSS'],
    thumbnail: '/mobile-app-interface.png',
    images: [
      '/mobile-app-interface.png',
      '/modern-design-system-interface.png',
      '/modern-ecommerce-website.png'
    ],
    year: 2024,
    duration: {
      en: '6 months (Jul 2024 - Dec 2024)',
      id: '6 bulan (Jul 2024 - Des 2024)'
    },
    role: {
      en: 'Lead Fullstack Developer',
      id: 'Lead Fullstack Developer'
    },
    client: {
      en: 'HealthCare Solutions',
      id: 'HealthCare Solutions'
    },
    teamSize: {
      en: 'Team of 3 (2 Developers + 1 Designer)',
      id: 'Tim 3 orang (2 Developer + 1 Designer)'
    },
    liveUrl: 'https://medicore-demo.vercel.app',
    githubUrl: 'https://github.com/aziziega/medicore-erp',
    problem: {
      en: 'Healthcare providers were using paper-based records and fragmented digital systems, leading to data loss, duplicate records, and compliance issues. No centralized system for patient history, making diagnosis and treatment difficult.',
      id: 'Penyedia layanan kesehatan menggunakan rekam medis berbasis kertas dan sistem digital yang terfragmentasi, menyebabkan kehilangan data, duplikasi rekam, dan masalah kepatuhan. Tidak ada sistem terpusat untuk riwayat pasien, membuat diagnosis dan perawatan sulit.'
    },
    solution: {
      en: 'Developed a secure, HIPAA-compliant ERP system with encrypted patient records, role-based access control, and comprehensive audit logging. Integrated appointment system with automated reminders and prescription management with drug interaction checks.',
      id: 'Mengembangkan sistem ERP yang aman dan HIPAA-compliant dengan rekam medis pasien terenkripsi, role-based access control, dan comprehensive audit logging. Mengintegrasikan sistem appointment dengan reminder otomatis dan manajemen resep dengan pengecekan interaksi obat.'
    },
    features: [
      {
        en: 'Electronic Medical Records - Secure, searchable patient records with medical history',
        id: 'Rekam Medis Elektronik - Rekam medis pasien yang aman, searchable dengan riwayat medis'
      },
      {
        en: 'Appointment Management - Online booking with doctor availability and automated SMS reminders',
        id: 'Manajemen Appointment - Booking online dengan ketersediaan dokter dan SMS reminder otomatis'
      },
      {
        en: 'Prescription System - Digital prescriptions with drug database and interaction warnings',
        id: 'Sistem Resep - Resep digital dengan database obat dan warning interaksi'
      },
      {
        en: 'Billing Integration - Insurance claims processing and patient billing management',
        id: 'Integrasi Billing - Pemrosesan klaim asuransi dan manajemen billing pasien'
      },
      {
        en: 'Analytics Dashboard - Patient statistics, revenue tracking, and operational metrics',
        id: 'Dashboard Analitik - Statistik pasien, pelacakan revenue, dan metrik operasional'
      }
    ],
    challenges: [
      {
        en: 'Data Security - Implemented end-to-end encryption for all patient data, role-based access control with audit trails, and secure API authentication using JWT with refresh tokens.',
        id: 'Keamanan Data - Mengimplementasikan enkripsi end-to-end untuk semua data pasien, role-based access control dengan audit trail, dan autentikasi API yang aman menggunakan JWT dengan refresh token.'
      },
      {
        en: 'Regulatory Compliance - Ensured HIPAA compliance through data encryption, access logging, and implementing data retention policies. Worked closely with healthcare legal team.',
        id: 'Kepatuhan Regulasi - Memastikan kepatuhan HIPAA melalui enkripsi data, logging akses, dan implementasi kebijakan retensi data. Bekerja sama erat dengan tim legal healthcare.'
      },
      {
        en: 'Performance Optimization - Large medical records required optimization. Implemented Redis caching, database indexing, and lazy loading for improved performance.',
        id: 'Optimasi Performa - Rekam medis yang besar membutuhkan optimasi. Mengimplementasikan Redis caching, database indexing, dan lazy loading untuk performa yang lebih baik.'
      }
    ],
    outcomes: [
      {
        en: 'Reduced patient record retrieval time from 15 minutes to 30 seconds',
        id: 'Mengurangi waktu pengambilan rekam medis pasien dari 15 menit menjadi 30 detik'
      },
      {
        en: 'Zero data breaches and full compliance with healthcare regulations',
        id: 'Nol pelanggaran data dan kepatuhan penuh terhadap regulasi kesehatan'
      },
      {
        en: '50% reduction in appointment no-shows through automated reminders',
        id: '50% pengurangan no-show appointment melalui reminder otomatis'
      },
      {
        en: 'Successfully deployed to 8 clinics serving 50,000+ patients',
        id: 'Berhasil di-deploy ke 8 klinik yang melayani 50.000+ pasien'
      }
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'TailwindCSS', 'Socket.io'],
    designProcess: [
      {
        en: 'Regulatory Research - Studied HIPAA requirements and healthcare data standards',
        id: 'Riset Regulasi - Mempelajari persyaratan HIPAA dan standar data kesehatan'
      },
      {
        en: 'Security Architecture - Designed multi-layer security with encryption and access control',
        id: 'Arsitektur Keamanan - Merancang keamanan multi-layer dengan enkripsi dan access control'
      },
      {
        en: 'User Testing - Conducted testing with doctors and nurses for workflow optimization',
        id: 'Tes User - Melakukan testing dengan dokter dan perawat untuk optimasi workflow'
      }
    ],
    lessonsLearned: [
      {
        en: 'Healthcare systems require extensive security measures and compliance documentation',
        id: 'Sistem healthcare membutuhkan langkah keamanan ekstensif dan dokumentasi kepatuhan'
      },
      {
        en: 'Working with medical professionals provides valuable insights for better UX design',
        id: 'Bekerja dengan profesional medis memberikan insight berharga untuk desain UX yang lebih baik'
      }
    ],
    featured: true,
    published: true,
    order: 2
  },

  // Project 3: FinanceTrack
  {
    slug: 'financetrack-personal-finance',
    id: 'proj-003',
    title: {
      en: 'FinanceTrack - Personal Finance Manager',
      id: 'FinanceTrack - Manajer Keuangan Personal'
    },
    tagline: {
      en: 'Smart personal finance tracking with AI-powered insights and budgeting',
      id: 'Pelacakan keuangan personal cerdas dengan insight bertenaga AI dan budgeting'
    },
    description: {
      en: 'FinanceTrack is a modern personal finance management app that helps users track expenses, set budgets, and achieve financial goals. Features AI-powered categorization, spending insights, and visualization tools to make financial management simple and intuitive.',
      id: 'FinanceTrack adalah aplikasi manajemen keuangan personal modern yang membantu user melacak pengeluaran, menetapkan budget, dan mencapai tujuan finansial. Fitur kategorisasi bertenaga AI, insight pengeluaran, dan tools visualisasi untuk membuat manajemen keuangan sederhana dan intuitif.'
    },
    category: {
      en: 'Web App',
      id: 'Aplikasi Web'
    },
    tags: ['Next.js', 'React', 'Supabase', 'Chart.js', 'TailwindCSS', 'OpenAI'],
    thumbnail: '/modern-ecommerce-website.png',
    images: [
      '/modern-ecommerce-website.png',
      '/modern-design-system-interface.png',
      '/mobile-app-interface.png'
    ],
    year: 2024,
    duration: {
      en: '3 months (Apr 2024 - Jun 2024)',
      id: '3 bulan (Apr 2024 - Jun 2024)'
    },
    role: {
      en: 'Fullstack Developer',
      id: 'Fullstack Developer'
    },
    client: {
      en: 'Personal Project',
      id: 'Proyek Personal'
    },
    teamSize: {
      en: 'Solo Project',
      id: 'Proyek Solo'
    },
    liveUrl: 'https://financetrack-demo.vercel.app',
    githubUrl: 'https://github.com/aziziega/financetrack',
    problem: {
      en: 'People struggle to track their spending and stick to budgets. Manual expense categorization is time-consuming and error-prone. Lack of actionable insights makes it difficult to improve financial habits.',
      id: 'Orang-orang kesulitan melacak pengeluaran dan menjalankan budget. Kategorisasi pengeluaran manual memakan waktu dan rawan kesalahan. Kurangnya insight yang actionable membuat sulit untuk meningkatkan kebiasaan finansial.'
    },
    solution: {
      en: 'Built an intelligent finance tracker with automatic expense categorization using AI, visual budget tracking with progress indicators, and personalized insights based on spending patterns. Mobile-first design ensures easy expense logging on-the-go.',
      id: 'Membangun finance tracker cerdas dengan kategorisasi pengeluaran otomatis menggunakan AI, pelacakan budget visual dengan indikator progress, dan insight personal berdasarkan pola pengeluaran. Desain mobile-first memastikan logging pengeluaran mudah saat bepergian.'
    },
    features: [
      {
        en: 'AI Categorization - Automatic expense categorization with 95% accuracy',
        id: 'Kategorisasi AI - Kategorisasi pengeluaran otomatis dengan akurasi 95%'
      },
      {
        en: 'Budget Management - Set category budgets with visual progress tracking',
        id: 'Manajemen Budget - Set budget kategori dengan pelacakan progress visual'
      },
      {
        en: 'Spending Insights - AI-generated insights and recommendations for saving',
        id: 'Insight Pengeluaran - Insight dan rekomendasi hemat bertenaga AI'
      },
      {
        en: 'Goal Tracking - Set financial goals with milestone tracking and projections',
        id: 'Pelacakan Goal - Set tujuan finansial dengan pelacakan milestone dan proyeksi'
      },
      {
        en: 'Data Visualization - Interactive charts for spending trends and analysis',
        id: 'Visualisasi Data - Chart interaktif untuk tren pengeluaran dan analisis'
      }
    ],
    challenges: [
      {
        en: 'AI Integration - Implemented OpenAI API for intelligent expense categorization. Had to optimize prompts for accuracy and cost efficiency, implementing caching for similar transactions.',
        id: 'Integrasi AI - Mengimplementasikan OpenAI API untuk kategorisasi pengeluaran cerdas. Harus mengoptimasi prompt untuk akurasi dan efisiensi biaya, mengimplementasikan caching untuk transaksi serupa.'
      },
      {
        en: 'Data Privacy - Handled sensitive financial data with encryption at rest and in transit. Implemented secure authentication and data isolation between users.',
        id: 'Privasi Data - Menangani data finansial sensitif dengan enkripsi at rest dan in transit. Mengimplementasikan autentikasi aman dan isolasi data antar user.'
      }
    ],
    outcomes: [
      {
        en: 'Users reported 30% average reduction in unnecessary spending',
        id: 'User melaporkan pengurangan 30% rata-rata pengeluaran yang tidak perlu'
      },
      {
        en: '1,000+ active users within first 3 months of launch',
        id: '1.000+ user aktif dalam 3 bulan pertama launch'
      },
      {
        en: '4.8/5 rating on product review platforms',
        id: 'Rating 4.8/5 di platform review produk'
      }
    ],
    techStack: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'OpenAI API', 'Chart.js', 'TailwindCSS'],
    designProcess: [
      {
        en: 'User Interviews - Talked to 20 users about their finance tracking habits',
        id: 'Wawancara User - Berbicara dengan 20 user tentang kebiasaan pelacakan keuangan mereka'
      },
      {
        en: 'Competitor Analysis - Studied existing finance apps to identify gaps',
        id: 'Analisis Kompetitor - Mempelajari aplikasi keuangan yang ada untuk identifikasi gap'
      },
      {
        en: 'Iterative Design - Multiple rounds of testing and refinement based on feedback',
        id: 'Desain Iteratif - Beberapa putaran testing dan perbaikan berdasarkan feedback'
      }
    ],
    lessonsLearned: [
      {
        en: 'AI features need careful prompt engineering and cost monitoring',
        id: 'Fitur AI membutuhkan prompt engineering yang hati-hati dan monitoring biaya'
      },
      {
        en: 'Financial apps require extra attention to data privacy and security',
        id: 'Aplikasi finansial membutuhkan perhatian ekstra pada privasi dan keamanan data'
      }
    ],
    featured: false,
    published: true,
    order: 3
  },

  // Project 4: UniCMS
  {
    slug: 'unicms-student-organization',
    id: 'proj-004',
    title: {
      en: 'UniCMS - Student Organization Website CMS',
      id: 'UniCMS - CMS Website Organisasi Mahasiswa'
    },
    tagline: {
      en: 'Content management system for university student organizations',
      id: 'Sistem manajemen konten untuk organisasi mahasiswa universitas'
    },
    description: {
      en: 'UniCMS is a specialized content management system designed for student organizations to manage their websites, events, member directories, and announcements. Features an intuitive admin panel, event calendar, and member management system tailored for campus organizations.',
      id: 'UniCMS adalah sistem manajemen konten khusus yang dirancang untuk organisasi mahasiswa mengelola website, event, direktori member, dan pengumuman mereka. Fitur admin panel yang intuitif, kalender event, dan sistem manajemen member yang disesuaikan untuk organisasi kampus.'
    },
    category: {
      en: 'Web App',
      id: 'Aplikasi Web'
    },
    tags: ['Next.js', 'React', 'Supabase', 'MDX', 'TailwindCSS', 'Vercel'],
    thumbnail: '/modern-design-system-interface.png',
    images: [
      '/modern-design-system-interface.png',
      '/mobile-app-interface.png',
      '/modern-ecommerce-website.png'
    ],
    year: 2024,
    duration: {
      en: '2 months (Feb 2024 - Mar 2024)',
      id: '2 bulan (Feb 2024 - Mar 2024)'
    },
    role: {
      en: 'Fullstack Developer',
      id: 'Fullstack Developer'
    },
    client: {
      en: 'University Student Council',
      id: 'Badan Eksekutif Mahasiswa'
    },
    teamSize: {
      en: 'Team of 2 (1 Developer + 1 Designer)',
      id: 'Tim 2 orang (1 Developer + 1 Designer)'
    },
    liveUrl: 'https://unicms-demo.vercel.app',
    githubUrl: 'https://github.com/aziziega/unicms',
    problem: {
      en: 'Student organizations struggled with outdated, complex CMS platforms. Non-technical members found it difficult to update content, publish events, or manage member information. High costs and steep learning curves limited adoption.',
      id: 'Organisasi mahasiswa kesulitan dengan platform CMS yang ketinggalan zaman dan kompleks. Member non-teknis merasa sulit untuk update konten, publish event, atau mengelola informasi member. Biaya tinggi dan learning curve yang curam membatasi adopsi.'
    },
    solution: {
      en: 'Built a user-friendly CMS specifically for student organizations with drag-and-drop page builder, event management with calendar integration, member directory with role management, and announcement system. Free to deploy on Vercel with Supabase backend.',
      id: 'Membangun CMS yang user-friendly khusus untuk organisasi mahasiswa dengan page builder drag-and-drop, manajemen event dengan integrasi kalender, direktori member dengan manajemen role, dan sistem pengumuman. Gratis untuk deploy di Vercel dengan backend Supabase.'
    },
    features: [
      {
        en: 'Page Builder - Drag-and-drop interface for creating and editing pages without code',
        id: 'Page Builder - Interface drag-and-drop untuk membuat dan edit halaman tanpa kode'
      },
      {
        en: 'Event Management - Create, publish, and manage events with registration forms',
        id: 'Manajemen Event - Buat, publish, dan kelola event dengan form registrasi'
      },
      {
        en: 'Member Directory - Searchable member profiles with role-based permissions',
        id: 'Direktori Member - Profil member searchable dengan permission berbasis role'
      },
      {
        en: 'Announcement System - Push notifications and email alerts for important updates',
        id: 'Sistem Pengumuman - Notifikasi push dan email alert untuk update penting'
      },
      {
        en: 'Blog Platform - MDX-powered blog with syntax highlighting for technical content',
        id: 'Platform Blog - Blog bertenaga MDX dengan syntax highlighting untuk konten teknis'
      }
    ],
    challenges: [
      {
        en: 'User-Friendly Design - Had to balance powerful features with simplicity. Conducted extensive user testing with non-technical students to refine the interface and create intuitive workflows.',
        id: 'Desain User-Friendly - Harus menyeimbangkan fitur powerful dengan kesederhanaan. Melakukan user testing ekstensif dengan mahasiswa non-teknis untuk memperbaiki interface dan membuat workflow intuitif.'
      },
      {
        en: 'Cost Optimization - Needed to keep it free for student organizations. Leveraged Vercel free tier, Supabase free tier, and optimized image delivery to stay within limits.',
        id: 'Optimasi Biaya - Perlu membuatnya gratis untuk organisasi mahasiswa. Memanfaatkan Vercel free tier, Supabase free tier, dan mengoptimasi pengiriman gambar untuk tetap dalam batas.'
      }
    ],
    outcomes: [
      {
        en: 'Adopted by 15 student organizations across 3 universities',
        id: 'Diadopsi oleh 15 organisasi mahasiswa di 3 universitas'
      },
      {
        en: '80% reduction in time spent on website updates',
        id: '80% pengurangan waktu yang dihabiskan untuk update website'
      },
      {
        en: 'Zero hosting costs for organizations using free tiers',
        id: 'Nol biaya hosting untuk organisasi menggunakan free tier'
      },
      {
        en: '200+ events published and managed through the platform',
        id: '200+ event dipublikasikan dan dikelola melalui platform'
      }
    ],
    techStack: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'MDX', 'TailwindCSS', 'Vercel'],
    designProcess: [
      {
        en: 'Student Feedback - Gathered requirements from 5 different student organizations',
        id: 'Feedback Mahasiswa - Mengumpulkan requirement dari 5 organisasi mahasiswa berbeda'
      },
      {
        en: 'Simplified UX - Focused on intuitive design with minimal training required',
        id: 'UX Disederhanakan - Fokus pada desain intuitif dengan minimal training diperlukan'
      },
      {
        en: 'Beta Testing - 3-week beta with real student organizations before launch',
        id: 'Beta Testing - Beta 3 minggu dengan organisasi mahasiswa nyata sebelum launch'
      }
    ],
    lessonsLearned: [
      {
        en: 'Simplicity is key when building for non-technical users',
        id: 'Kesederhanaan adalah kunci ketika membangun untuk user non-teknis'
      },
      {
        en: 'Free tier optimization requires careful resource planning and monitoring',
        id: 'Optimasi free tier membutuhkan perencanaan dan monitoring resource yang hati-hati'
      }
    ],
    featured: false,
    published: true,
    order: 4
  }
]

// Helper functions for accessing project data
export function getAllProjects(language: 'en' | 'id' = 'en'): Project[] {
  return projectsData.map(project => ({
    slug: project.slug,
    id: project.id,
    title: project.title[language],
    tagline: project.tagline[language],
    description: project.description[language],
    category: project.category[language],
    tags: project.tags,
    thumbnail: project.thumbnail,
    images: project.images,
    year: project.year,
    duration: project.duration[language],
    role: project.role[language],
    client: project.client[language],
    teamSize: project.teamSize[language],
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    caseStudyUrl: project.caseStudyUrl,
    problem: project.problem[language],
    solution: project.solution[language],
    features: project.features.map(f => f[language]),
    challenges: project.challenges.map(c => c[language]),
    outcomes: project.outcomes.map(o => o[language]),
    techStack: project.techStack,
    designProcess: project.designProcess?.map(d => d[language]),
    lessonsLearned: project.lessonsLearned?.map(l => l[language]),
    featured: project.featured,
    published: project.published,
    order: project.order
  })).filter(p => p.published)
}

export function getFeaturedProjects(language: 'en' | 'id' = 'en'): Project[] {
  return getAllProjects(language)
    .filter(project => project.featured)
    .sort((a, b) => a.order - b.order)
}

export function getProjectBySlug(slug: string, language: 'en' | 'id' = 'en'): Project | undefined {
  const project = projectsData.find(p => p.slug === slug)
  if (!project) return undefined

  return {
    slug: project.slug,
    id: project.id,
    title: project.title[language],
    tagline: project.tagline[language],
    description: project.description[language],
    category: project.category[language],
    tags: project.tags,
    thumbnail: project.thumbnail,
    images: project.images,
    year: project.year,
    duration: project.duration[language],
    role: project.role[language],
    client: project.client[language],
    teamSize: project.teamSize[language],
    liveUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    caseStudyUrl: project.caseStudyUrl,
    problem: project.problem[language],
    solution: project.solution[language],
    features: project.features.map(f => f[language]),
    challenges: project.challenges.map(c => c[language]),
    outcomes: project.outcomes.map(o => o[language]),
    techStack: project.techStack,
    designProcess: project.designProcess?.map(d => d[language]),
    lessonsLearned: project.lessonsLearned?.map(l => l[language]),
    featured: project.featured,
    published: project.published,
    order: project.order
  }
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map(p => p.slug)
}

-- =========================================================================
-- SUPABASE PORTFOLIO PROJECTS SEED DATA
-- Based on the original data defined in data/projects.ts
-- Execute this script in the Supabase SQL Editor.
-- =========================================================================

-- Clear existing projects data (optional, but good for clean seeding)
DELETE FROM public.projects;

-- 1. Insert Projects
INSERT INTO public.projects (
  id,
  slug,
  status,
  featured,
  sort_order,
  year,
  title,
  tagline,
  description,
  category,
  duration,
  role,
  client,
  team_size,
  problem,
  solution,
  features,
  challenges,
  outcomes,
  design_process,
  lessons_learned,
  tech_stack,
  live_url,
  github_url,
  thumbnail_url,
  seo_title,
  seo_description,
  published_at
) VALUES 
  -- Project 1: GymFlow CRM
  (
    'd1111111-1111-1111-1111-111111111111',
    'gymflow-crm-system',
    'published',
    true,
    1,
    2025,
    '{"en": "GymFlow - Gym Management CRM", "id": "GymFlow - Sistem CRM Manajemen Gym"}'::jsonb,
    '{"en": "Complete gym management solution with member tracking and billing automation", "id": "Solusi manajemen gym lengkap dengan pelacakan member dan otomasi billing"}'::jsonb,
    '{"en": "GymFlow is a comprehensive CRM system designed specifically for gym and fitness center management. It streamlines member management, class scheduling, payment processing, and performance analytics in one unified platform. Built with scalability in mind to handle gyms of all sizes.", "id": "GymFlow adalah sistem CRM komprehensif yang dirancang khusus untuk manajemen gym dan fitness center. Sistem ini menyederhanakan manajemen member, penjadwalan kelas, pemrosesan pembayaran, dan analitik performa dalam satu platform terpadu. Dibangun dengan skalabilitas untuk menangani gym dari berbagai ukuran."}'::jsonb,
    '{"en": "Web App", "id": "Aplikasi Web"}'::jsonb,
    '{"en": "4 months (Jan 2025 - Apr 2025)", "id": "4 bulan (Jan 2025 - Apr 2025)"}'::jsonb,
    '{"en": "Fullstack Developer", "id": "Fullstack Developer"}'::jsonb,
    '{"en": "FitnessPro Indonesia", "id": "FitnessPro Indonesia"}'::jsonb,
    '{"en": "Solo Project", "id": "Proyek Solo"}'::jsonb,
    '{"en": "Gym owners struggled with fragmented systems for member management, billing, and class scheduling. Manual processes led to errors, missed payments, and poor member experience. No unified view of gym performance metrics.", "id": "Pemilik gym kesulitan dengan sistem yang terfragmentasi untuk manajemen member, billing, dan penjadwalan kelas. Proses manual menyebabkan kesalahan, pembayaran yang terlewat, dan pengalaman member yang buruk. Tidak ada tampilan terpadu untuk metrik performa gym."}'::jsonb,
    '{"en": "Developed an all-in-one CRM platform that integrates member management, automated billing with Stripe, class scheduling with calendar sync, and real-time analytics dashboard. Mobile-responsive design ensures access from anywhere.", "id": "Mengembangkan platform CRM all-in-one yang mengintegrasikan manajemen member, billing otomatis dengan Stripe, penjadwalan kelas dengan sinkronisasi kalender, dan dashboard analitik real-time. Desain responsif mobile memastikan akses dari mana saja."}'::jsonb,
    '[
      {"en": "Member Management - Complete member profiles with photos, medical history, and attendance tracking", "id": "Manajemen Member - Profil member lengkap dengan foto, riwayat medis, dan pelacakan kehadiran"},
      {"en": "Automated Billing - Recurring payment processing with Stripe integration and invoice generation", "id": "Billing Otomatis - Pemrosesan pembayaran berulang dengan integrasi Stripe dan pembuatan invoice"},
      {"en": "Class Scheduling - Interactive calendar with capacity management and waitlist functionality", "id": "Penjadwalan Kelas - Kalender interaktif dengan manajemen kapasitas dan fungsi waitlist"},
      {"en": "Analytics Dashboard - Real-time metrics on revenue, attendance, and member retention", "id": "Dashboard Analitik - Metrik real-time tentang revenue, kehadiran, dan retensi member"},
      {"en": "Mobile App - Progressive Web App for members to book classes and track progress", "id": "Aplikasi Mobile - Progressive Web App untuk member booking kelas dan melacak progress"}
    ]'::jsonb,
    '[
      {"en": "Stripe Integration Complexity - Had to handle various payment scenarios including failed payments, refunds, and subscription changes. Implemented webhook system for reliable payment status updates.", "id": "Kompleksitas Integrasi Stripe - Harus menangani berbagai skenario pembayaran termasuk pembayaran gagal, refund, dan perubahan subscription. Mengimplementasikan sistem webhook untuk update status pembayaran yang reliable."},
      {"en": "Real-time Data Sync - Needed instant updates across multiple user sessions. Solved using Supabase real-time subscriptions for live data synchronization.", "id": "Sinkronisasi Data Real-time - Membutuhkan update instan di berbagai sesi user. Diselesaikan menggunakan Supabase real-time subscriptions untuk sinkronisasi data live."}
    ]'::jsonb,
    '[
      {"en": "40% reduction in administrative time through automation", "id": "40% pengurangan waktu administratif melalui otomasi"},
      {"en": "95% payment collection rate with automated reminders", "id": "95% tingkat pengumpulan pembayaran dengan reminder otomatis"},
      {"en": "25% increase in member retention through better engagement", "id": "25% peningkatan retensi member melalui engagement yang lebih baik"},
      {"en": "Successfully deployed to 12 gym locations across Indonesia", "id": "Berhasil di-deploy ke 12 lokasi gym di seluruh Indonesia"}
    ]'::jsonb,
    '[
      {"en": "User Research - Interviewed 15 gym owners to understand pain points", "id": "Riset User - Wawancara 15 pemilik gym untuk memahami pain points"},
      {"en": "Wireframing - Created low-fidelity mockups for key workflows", "id": "Wireframing - Membuat mockup low-fidelity untuk workflow kunci"},
      {"en": "Prototype Testing - Tested with 3 pilot gyms before full launch", "id": "Tes Prototype - Testing dengan 3 gym pilot sebelum launch penuh"}
    ]'::jsonb,
    '[
      {"en": "Payment integration requires extensive error handling and edge case management", "id": "Integrasi pembayaran membutuhkan error handling ekstensif dan manajemen edge case"},
      {"en": "Real-time features significantly improve user experience but add complexity", "id": "Fitur real-time secara signifikan meningkatkan user experience namun menambah kompleksitas"}
    ]'::jsonb,
    ARRAY['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Stripe', 'TailwindCSS', 'Chart.js']::text[],
    'https://gymflow-demo.vercel.app',
    'https://github.com/aziziega/gymflow-crm',
    '/modern-design-system-interface.png',
    '{"en": "GymFlow - Gym Management CRM", "id": "GymFlow - Sistem CRM Manajemen Gym"}'::jsonb,
    '{"en": "Complete gym management solution with member tracking and billing automation", "id": "Solusi manajemen gym lengkap dengan pelacakan member dan otomasi billing"}'::jsonb,
    now()
  ),

  -- Project 2: MediCore ERP
  (
    'd2222222-2222-2222-2222-222222222222',
    'medicore-erp-system',
    'published',
    true,
    2,
    2024,
    '{"en": "MediCore - Healthcare ERP System", "id": "MediCore - Sistem ERP Rekam Medis"}'::jsonb,
    '{"en": "Comprehensive electronic medical records system for clinics and hospitals", "id": "Sistem rekam medis elektronik komprehensif untuk klinik dan rumah sakit"}'::jsonb,
    '{"en": "MediCore is an enterprise resource planning system specifically designed for healthcare providers. It manages patient records, appointment scheduling, prescription management, and billing in compliance with healthcare regulations. Built with security and data privacy as top priorities.", "id": "MediCore adalah sistem enterprise resource planning yang dirancang khusus untuk penyedia layanan kesehatan. Sistem ini mengelola rekam medis pasien, penjadwalan appointment, manajemen resep, dan billing yang sesuai dengan regulasi kesehatan. Dibangun dengan keamanan dan privasi data sebagai prioritas utama."}'::jsonb,
    '{"en": "Web App", "id": "Aplikasi Web"}'::jsonb,
    '{"en": "6 months (Jul 2024 - Dec 2024)", "id": "6 bulan (Jul 2024 - Des 2024)"}'::jsonb,
    '{"en": "Lead Fullstack Developer", "id": "Lead Fullstack Developer"}'::jsonb,
    '{"en": "HealthCare Solutions", "id": "HealthCare Solutions"}'::jsonb,
    '{"en": "Team of 3 (2 Developers + 1 Designer)", "id": "Tim 3 orang (2 Developer + 1 Designer)"}'::jsonb,
    '{"en": "Healthcare providers were using paper-based records and fragmented digital systems, leading to data loss, duplicate records, and compliance issues. No centralized system for patient history, making diagnosis and treatment difficult.", "id": "Penyedia layanan kesehatan menggunakan rekam medis berbasis kertas dan sistem digital yang terfragmentasi, menyebabkan kehilangan data, duplikasi rekam, dan masalah kepatuhan. Tidak ada sistem terpusat untuk riwayat pasien, membuat diagnosis dan perawatan sulit."}'::jsonb,
    '{"en": "Developed a secure, HIPAA-compliant ERP system with encrypted patient records, role-based access control, and comprehensive audit logging. Integrated appointment system with automated reminders and prescription management with drug interaction checks.", "id": "Mengembangkan sistem ERP yang aman dan HIPAA-compliant dengan rekam medis pasien terenkripsi, role-based access control, dan comprehensive audit logging. Mengintegrasikan sistem appointment dengan reminder otomatis dan manajemen resep dengan pengecekan interaksi obat."}'::jsonb,
    '[
      {"en": "Electronic Medical Records - Secure, searchable patient records with medical history", "id": "Rekam Medis Elektronik - Rekam medis pasien yang aman, searchable dengan riwayat medis"},
      {"en": "Appointment Management - Online booking with doctor availability and automated SMS reminders", "id": "Manajemen Appointment - Booking online dengan ketersediaan dokter dan SMS reminder otomatis"},
      {"en": "Prescription System - Digital prescriptions with drug database and interaction warnings", "id": "Sistem Resep - Resep digital dengan database obat dan warning interaksi"},
      {"en": "Billing Integration - Insurance claims processing and patient billing management", "id": "Integrasi Billing - Pemrosesan klaim asuransi dan manajemen billing pasien"},
      {"en": "Analytics Dashboard - Patient statistics, revenue tracking, and operational metrics", "id": "Dashboard Analitik - Statistik pasien, pelacakan revenue, dan metrik operasional"}
    ]'::jsonb,
    '[
      {"en": "Data Security - Implemented end-to-end encryption for all patient data, role-based access control with audit trails, and secure API authentication using JWT with refresh tokens.", "id": "Keamanan Data - Mengimplementasikan enkripsi end-to-end untuk semua data pasien, role-based access control dengan audit trail, dan autentikasi API yang aman menggunakan JWT dengan refresh token."},
      {"en": "Regulatory Compliance - Ensured HIPAA compliance through data encryption, access logging, and implementing data retention policies. Worked closely with healthcare legal team.", "id": "Kepatuhan Regulasi - Memastikan kepatuhan HIPAA melalui enkripsi data, logging akses, dan implementasi kebijakan retensi data. Bekerja sama erat dengan tim legal healthcare."},
      {"en": "Performance Optimization - Large medical records required optimization. Implemented Redis caching, database indexing, and lazy loading for improved performance.", "id": "Optimasi Performa - Rekam medis yang besar membutuhkan optimasi. Mengimplementasikan Redis caching, database indexing, dan lazy loading untuk performa yang lebih baik."}
    ]'::jsonb,
    '[
      {"en": "Reduced patient record retrieval time from 15 minutes to 30 seconds", "id": "Mengurangi waktu pengambilan rekam medis pasien dari 15 menit menjadi 30 detik"},
      {"en": "Zero data breaches and full compliance with healthcare regulations", "id": "Nol pelanggaran data dan kepatuhan penuh terhadap regulasi kesehatan"},
      {"en": "50% reduction in appointment no-shows through automated reminders", "id": "50% pengurangan no-show appointment melalui reminder otomatis"},
      {"en": "Successfully deployed to 8 clinics serving 50,000+ patients", "id": "Berhasil di-deploy ke 8 klinik yang melayani 50.000+ pasien"}
    ]'::jsonb,
    '[
      {"en": "Regulatory Research - Studied HIPAA requirements and healthcare data standards", "id": "Riset Regulasi - Mempelajari persyaratan HIPAA dan standar data kesehatan"},
      {"en": "Security Architecture - Designed multi-layer security with encryption and access control", "id": "Arsitektur Keamanan - Merancang keamanan multi-layer dengan enkripsi dan access control"},
      {"en": "User Testing - Conducted testing with doctors and nurses for workflow optimization", "id": "Tes User - Melakukan testing dengan dokter dan perawat untuk optimasi workflow"}
    ]'::jsonb,
    '[
      {"en": "Healthcare systems require extensive security measures and compliance documentation", "id": "Sistem healthcare membutuhkan langkah keamanan ekstensif dan dokumentasi kepatuhan"},
      {"en": "Working with medical professionals provides valuable insights for better UX design", "id": "Bekerja dengan profesional medis memberikan insight berharga untuk desain UX yang lebih baik"}
    ]'::jsonb,
    ARRAY['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'TailwindCSS', 'Socket.io']::text[],
    'https://medicore-demo.vercel.app',
    'https://github.com/aziziega/medicore-erp',
    '/mobile-app-interface.png',
    '{"en": "MediCore - Healthcare ERP System", "id": "MediCore - Sistem ERP Rekam Medis"}'::jsonb,
    '{"en": "Comprehensive electronic medical records system for clinics and hospitals", "id": "Sistem rekam medis elektronik komprehensif untuk klinik dan rumah sakit"}'::jsonb,
    now()
  ),

  -- Project 3: FinanceTrack
  (
    'd3333333-3333-3333-3333-333333333333',
    'financetrack-personal-finance',
    'published',
    false,
    3,
    2024,
    '{"en": "FinanceTrack - Personal Finance Manager", "id": "FinanceTrack - Manajer Keuangan Personal"}'::jsonb,
    '{"en": "Smart personal finance tracking with AI-powered insights and budgeting", "id": "Pelacakan keuangan personal cerdas dengan insight bertenaga AI dan budgeting"}'::jsonb,
    '{"en": "FinanceTrack is a modern personal finance management app that helps users track expenses, set budgets, and achieve financial goals. Features AI-powered categorization, spending insights, and visualization tools to make financial management simple and intuitive.", "id": "FinanceTrack adalah aplikasi manajemen keuangan personal modern yang membantu user melacak pengeluaran, menetapkan budget, dan mencapai tujuan finansial. Fitur kategorisasi bertenaga AI, insight pengeluaran, dan tools visualisasi untuk membuat manajemen keuangan sederhana dan intuitif."}'::jsonb,
    '{"en": "Web App", "id": "Aplikasi Web"}'::jsonb,
    '{"en": "3 months (Apr 2024 - Jun 2024)", "id": "3 bulan (Apr 2024 - Jun 2024)"}'::jsonb,
    '{"en": "Fullstack Developer", "id": "Fullstack Developer"}'::jsonb,
    '{"en": "Personal Project", "id": "Proyek Personal"}'::jsonb,
    '{"en": "Solo Project", "id": "Proyek Solo"}'::jsonb,
    '{"en": "People struggle to track their spending and stick to budgets. Manual expense categorization is time-consuming and error-prone. Lack of actionable insights makes it difficult to improve financial habits.", "id": "Orang-orang kesulitan melacak pengeluaran dan menjalankan budget. Kategorisasi pengeluaran manual memakan waktu dan rawan kesalahan. Kurangnya insight yang actionable membuat sulit untuk meningkatkan kebiasaan finansial."}'::jsonb,
    '{"en": "Built an intelligent finance tracker with automatic expense categorization using AI, visual budget tracking with progress indicators, and personalized insights based on spending patterns. Mobile-first design ensures easy expense logging on-the-go.", "id": "Membangun finance tracker cerdas dengan kategorisasi pengeluaran otomatis menggunakan AI, pelacakan budget visual dengan indikator progress, dan insight personal berdasarkan pola pengeluaran. Desain mobile-first memastikan logging pengeluaran mudah saat bepergian."}'::jsonb,
    '[
      {"en": "AI Categorization - Automatic expense categorization with 95% accuracy", "id": "Kategorisasi AI - Kategorisasi pengeluaran otomatis dengan akurasi 95%"},
      {"en": "Budget Management - Set category budgets with visual progress tracking", "id": "Manajemen Budget - Set budget kategori dengan pelacakan progress visual"},
      {"en": "Spending Insights - AI-generated insights and recommendations for saving", "id": "Insight Pengeluaran - Insight dan rekomendasi hemat bertenaga AI"},
      {"en": "Goal Tracking - Set financial goals with milestone tracking and projections", "id": "Pelacakan Goal - Set tujuan finansial dengan pelacakan milestone dan proyeksi"},
      {"en": "Data Visualization - Interactive charts for spending trends and analysis", "id": "Visualisasi Data - Chart interaktif untuk tren pengeluaran dan analisis"}
    ]'::jsonb,
    '[
      {"en": "AI Integration - Implemented OpenAI API for intelligent expense categorization. Had to optimize prompts for accuracy and cost efficiency, implementing caching for similar transactions.", "id": "Integrasi AI - Mengimplementasikan OpenAI API untuk kategorisasi pengeluaran cerdas. Harus mengoptimasi prompt untuk akurasi dan efisiensi biaya, mengimplementasikan caching untuk transaksi serupa."},
      {"en": "Data Privacy - Handled sensitive financial data with encryption at rest and in transit. Implemented secure authentication and data isolation between users.", "id": "Privasi Data - Menangani data finansial sensitif dengan enkripsi at rest dan in transit. Mengimplementasikan autentikasi aman dan isolasi data antar user."}
    ]'::jsonb,
    '[
      {"en": "Users reported 30% average reduction in unnecessary spending", "id": "User melaporkan pengurangan 30% rata-rata pengeluaran yang tidak perlu"},
      {"en": "1,000+ active users within first 3 months of launch", "id": "1.000+ user aktif dalam 3 bulan pertama launch"},
      {"en": "4.8/5 rating on product review platforms", "id": "Rating 4.8/5 di platform review produk"}
    ]'::jsonb,
    '[
      {"en": "User Interviews - Talked to 20 users about their finance tracking habits", "id": "Wawancara User - Berbicara dengan 20 user tentang kebiasaan pelacakan keuangan mereka"},
      {"en": "Competitor Analysis - Studied existing finance apps to identify gaps", "id": "Analisis Kompetitor - Mempelajari aplikasi keuangan yang ada untuk identifikasi gap"},
      {"en": "Iterative Design - Multiple rounds of testing and refinement based on feedback", "id": "Desain Iteratif - Beberapa putaran testing dan perbaikan berdasarkan feedback"}
    ]'::jsonb,
    '[
      {"en": "AI features need careful prompt engineering and cost monitoring", "id": "Fitur AI membutuhkan prompt engineering yang hati-hati dan monitoring biaya"},
      {"en": "Financial apps require extra attention to data privacy and security", "id": "Aplikasi finansial membutuhkan perhatian ekstra pada privasi dan keamanan data"}
    ]'::jsonb,
    ARRAY['Next.js', 'React', 'Supabase', 'PostgreSQL', 'OpenAI API', 'Chart.js', 'TailwindCSS']::text[],
    'https://financetrack-demo.vercel.app',
    'https://github.com/aziziega/financetrack',
    '/modern-ecommerce-website.png',
    '{"en": "FinanceTrack - Personal Finance Manager", "id": "FinanceTrack - Manajer Keuangan Personal"}'::jsonb,
    '{"en": "Smart personal finance tracking with AI-powered insights and budgeting", "id": "Pelacakan keuangan personal cerdas dengan insight bertenaga AI dan budgeting"}'::jsonb,
    now()
  ),

  -- Project 4: UniCMS
  (
    'd4444444-4444-4444-4444-444444444444',
    'unicms-student-organization',
    'published',
    false,
    4,
    2024,
    '{"en": "UniCMS - Student Organization Website CMS", "id": "UniCMS - CMS Website Organisasi Mahasiswa"}'::jsonb,
    '{"en": "Content management system for university student organizations", "id": "Sistem manajemen konten untuk organisasi mahasiswa universitas"}'::jsonb,
    '{"en": "UniCMS is a specialized content management system designed for student organizations to manage their websites, events, member directories, and announcements. Features an intuitive admin panel, event calendar, and member management system tailored for campus organizations.", "id": "UniCMS adalah sistem manajemen konten khusus yang dirancang untuk organisasi mahasiswa mengelola website, event, direktori member, dan pengumuman mereka. Fitur admin panel yang intuitif, kalender event, dan sistem manajemen member yang disesuaikan untuk organisasi kampus."}'::jsonb,
    '{"en": "Web App", "id": "Aplikasi Web"}'::jsonb,
    '{"en": "2 months (Feb 2024 - Mar 2024)", "id": "2 bulan (Feb 2024 - Mar 2024)"}'::jsonb,
    '{"en": "Fullstack Developer", "id": "Fullstack Developer"}'::jsonb,
    '{"en": "University Student Council", "id": "Badan Eksekutif Mahasiswa"}'::jsonb,
    '{"en": "Team of 2 (1 Developer + 1 Designer)", "id": "Tim 2 orang (1 Developer + 1 Designer)"}'::jsonb,
    '{"en": "Student organizations struggled with outdated, complex CMS platforms. Non-technical members found it difficult to update content, publish events, or manage member information. High costs and steep learning curves limited adoption.", "id": "Organisasi mahasiswa kesulitan dengan platform CMS yang ketinggalan zaman dan kompleks. Member non-teknis merasa sulit untuk update konten, publish event, atau mengelola informasi member. Biaya tinggi dan learning curve yang curam membatasi adopsi."}'::jsonb,
    '{"en": "Built a user-friendly CMS specifically for student organizations with drag-and-drop page builder, event management with calendar integration, member directory with role management, and announcement system. Free to deploy on Vercel with Supabase backend.", "id": "Membangun CMS yang user-friendly khusus untuk organisasi mahasiswa dengan page builder drag-and-drop, manajemen event dengan integrasi kalender, direktori member dengan manajemen role, dan sistem pengumuman. Gratis untuk deploy di Vercel dengan backend Supabase."}'::jsonb,
    '[
      {"en": "Page Builder - Drag-and-drop interface for creating and editing pages without code", "id": "Page Builder - Interface drag-and-drop untuk membuat dan edit halaman tanpa kode"},
      {"en": "Event Management - Create, publish, and manage events with registration forms", "id": "Manajemen Event - Buat, publish, dan kelola event dengan form registrasi"},
      {"en": "Member Directory - Searchable member profiles with role-based permissions", "id": "Direktori Member - Profil member searchable dengan permission berbasis role"},
      {"en": "Announcement System - Push notifications and email alerts for important updates", "id": "Sistem Pengumuman - Notifikasi push dan email alert untuk update penting"},
      {"en": "Blog Platform - MDX-powered blog with syntax highlighting for technical content", "id": "Platform Blog - Blog bertenaga MDX dengan syntax highlighting untuk konten teknis"}
    ]'::jsonb,
    '[
      {"en": "User-Friendly Design - Had to balance powerful features with simplicity. Conducted extensive user testing with non-technical students to refine the interface and create intuitive workflows.", "id": "Desain User-Friendly - Harus menyeimbangkan fitur powerful dengan kesederhanaan. Melakukan user testing ekstensif dengan mahasiswa non-teknis untuk memperbaiki interface dan membuat workflow intuitif."},
      {"en": "Cost Optimization - Needed to keep it free for student organizations. Leveraged Vercel free tier, Supabase free tier, and optimized image delivery to stay within limits.", "id": "Optimasi Biaya - Perlu membuatnya gratis untuk organisasi mahasiswa. Memanfaatkan Vercel free tier, Supabase free tier, dan mengoptimasi pengiriman gambar untuk tetap dalam batas."}
    ]'::jsonb,
    '[
      {"en": "Adopted by 15 student organizations across 3 universities", "id": "Diadopsi oleh 15 organisasi mahasiswa di 3 universitas"},
      {"en": "80% reduction in time spent on website updates", "id": "80% pengurangan waktu yang dihabiskan untuk update website"},
      {"en": "Zero hosting costs for organizations using free tiers", "id": "Nol biaya hosting untuk organisasi menggunakan free tier"},
      {"en": "200+ events published and managed through the platform", "id": "200+ event dipublikasikan dan dikelola melalui platform"}
    ]'::jsonb,
    '[
      {"en": "Student Feedback - Gathered requirements from 5 different student organizations", "id": "Feedback Mahasiswa - Mengumpulkan requirement dari 5 organisasi mahasiswa berbeda"},
      {"en": "Simplified UX - Focused on intuitive design with minimal training required", "id": "UX Disederhanakan - Fokus pada desain intuitif dengan minimal training diperlukan"},
      {"en": "Beta Testing - 3-week beta with real student organizations before launch", "id": "Beta Testing - Beta 3 minggu dengan organisasi mahasiswa nyata sebelum launch"}
    ]'::jsonb,
    '[
      {"en": "Simplicity is key when building for non-technical users", "id": "Kesederhanaan adalah kunci ketika membangun untuk user non-teknis"},
      {"en": "Free tier optimization requires careful resource planning and monitoring", "id": "Optimasi free tier membutuhkan perencanaan dan monitoring resource yang hati-hati"}
    ]'::jsonb,
    ARRAY['Next.js', 'React', 'Supabase', 'PostgreSQL', 'MDX', 'TailwindCSS', 'Vercel']::text[],
    'https://unicms-demo.vercel.app',
    'https://github.com/aziziega/unicms',
    '/modern-design-system-interface.png',
    '{"en": "UniCMS - Student Organization Website CMS", "id": "UniCMS - CMS Website Organisasi Mahasiswa"}'::jsonb,
    '{"en": "Content management system for university student organizations", "id": "Sistem manajemen konten untuk organisasi mahasiswa universitas"}'::jsonb,
    now()
  ),

  -- Project 5: Azz Portfolio
  (
    'd5555555-5555-5555-5555-555555555555',
    'azz-portfolio-cms',
    'published',
    true,
    5,
    2026,
    '{"en": "azz-portfolio — Developer Portfolio & CMS", "id": "azz-portfolio — Portfolio Developer & CMS"}'::jsonb,
    '{"en": "Interactive developer portfolio with 3D physics and headless CMS", "id": "Portfolio developer interaktif dengan fisika 3D dan headless CMS"}'::jsonb,
    '{"en": "A highly polished, interactive personal portfolio and full-stack headless CMS. It serves as a Public Proof of Work to showcase fullstack engineering, Web3, and ML projects, featuring a 3D interactive physics lanyard, bento grid UI, and a custom Midnight Blue dark mode.", "id": "Portfolio personal interaktif dan full-stack headless CMS. Berfungsi sebagai Public Proof of Work untuk menampilkan proyek fullstack engineering, Web3, dan ML, dilengkapi lanyard fisika 3D interaktif, bento grid UI, dan mode gelap Midnight Blue kustom."}'::jsonb,
    '{"en": "Web App / Portfolio", "id": "Aplikasi Web / Portfolio"}'::jsonb,
    '{"en": "Ongoing (Aug 2026 - Present)", "id": "Berjalan (Agt 2026 - Sekarang)"}'::jsonb,
    '{"en": "Fullstack Engineer", "id": "Fullstack Engineer"}'::jsonb,
    '{"en": "Personal Project", "id": "Proyek Personal"}'::jsonb,
    '{"en": "Solo Project", "id": "Proyek Solo"}'::jsonb,
    '{"en": "Needed a centralized hub to showcase diverse skills ranging from fullstack web development to machine learning. Existing template solutions lacked the deep interactivity, custom CMS capabilities, and distinct personal branding required to stand out as a top-tier developer.", "id": "Membutuhkan hub terpusat untuk memamerkan beragam keahlian mulai dari fullstack web development hingga machine learning. Solusi template yang ada kurang memiliki interaktivitas mendalam, kemampuan CMS kustom, dan personal branding yang berbeda untuk menonjol sebagai developer top-tier."}'::jsonb,
    '{"en": "Developed a custom Next.js 16 portfolio with a headless UI architecture, Supabase backend for dynamic content (CMS), and smooth Framer Motion/Three.js animations. Integrated a fully-fledged admin dashboard to manage content and a client feedback portal.", "id": "Mengembangkan portfolio Next.js 16 kustom dengan arsitektur headless UI, backend Supabase untuk konten dinamis (CMS), dan animasi Framer Motion/Three.js yang halus. Mengintegrasikan dashboard admin lengkap untuk mengelola konten dan portal feedback klien."}'::jsonb,
    '[
      {"en": "Custom Headless CMS - Built-in admin dashboard (/admin) to manage projects, testimonials, and blog posts securely using Supabase.", "id": "Headless CMS Kustom - Dashboard admin bawaan (/admin) untuk mengelola proyek, testimoni, dan artikel blog secara aman menggunakan Supabase."},
      {"en": "3D Interactive Lanyard - Physics-based 3D lanyard interaction built with Three.js and React Three Fiber.", "id": "Lanyard Interaktif 3D - Interaksi lanyard 3D berbasis fisika yang dibangun dengan Three.js dan React Three Fiber."},
      {"en": "Advanced Dark Mode - Midnight Blue OKLCH-based dark theme with segmented pill toggles and smooth transitions.", "id": "Mode Gelap Lanjutan - Tema gelap Midnight Blue berbasis OKLCH dengan toggle pill tersegmentasi dan transisi mulus."},
      {"en": "Bilingual System - Seamless multi-language support (EN & ID) leveraging JSONB columns in Supabase.", "id": "Sistem Bilingual - Dukungan multi-bahasa yang mulus (EN & ID) memanfaatkan kolom JSONB di Supabase."},
      {"en": "Email Automation - Integrated with Resend API for newsletter, contact form, and direct replies.", "id": "Otomasi Email - Terintegrasi dengan Resend API untuk newsletter, form kontak, dan balasan langsung."}
    ]'::jsonb,
    '[
      {"en": "3D Performance Optimization - Balancing the rich 3D physics of the lanyard with fast loading times and maintaining high Lighthouse scores.", "id": "Optimasi Performa 3D - Menyeimbangkan fisika 3D yang kaya pada lanyard dengan waktu loading yang cepat dan mempertahankan skor Lighthouse yang tinggi."},
      {"en": "Complex State Management - Handling theme switching (Midnight Blue Dark Mode), language toggles, and CMS state simultaneously without hydration mismatches.", "id": "Manajemen State Kompleks - Menangani perpindahan tema (Midnight Blue Dark Mode), toggle bahasa, dan state CMS secara bersamaan tanpa hydration mismatch."}
    ]'::jsonb,
    '[
      {"en": "Serves as the primary professional identity and lead generation hub for freelance projects.", "id": "Berfungsi sebagai identitas profesional utama dan pusat penghasil prospek untuk proyek freelance."},
      {"en": "Open-sourced as a template, helping other developers build high-quality interactive portfolios.", "id": "Di-open-source-kan sebagai template, membantu developer lain membangun portofolio interaktif berkualitas tinggi."},
      {"en": "Demonstrates mastery of modern React 19, Next.js 16 App Router, and full-stack integration with Supabase.", "id": "Mendemonstrasikan penguasaan React 19 modern, Next.js 16 App Router, dan integrasi full-stack dengan Supabase."}
    ]'::jsonb,
    '[
      {"en": "Vision & Identity - Defined the core vision as a Public Proof of Work with a focus on modern aesthetic (Glassmorphism & Bento Grid).", "id": "Visi & Identitas - Menetapkan visi inti sebagai Public Proof of Work dengan fokus pada estetika modern (Glassmorphism & Bento Grid)."},
      {"en": "Architecture Design - Selected Next.js 16 for SSR/SSG capabilities and Supabase for a robust, secure headless CMS backend.", "id": "Desain Arsitektur - Memilih Next.js 16 untuk kemampuan SSR/SSG dan Supabase untuk backend headless CMS yang tangguh dan aman."}
    ]'::jsonb,
    '[
      {"en": "Using OKLCH for colors provides much better perceptual uniformity, especially for custom dark modes.", "id": "Menggunakan OKLCH untuk warna memberikan keseragaman perseptual yang jauh lebih baik, terutama untuk mode gelap kustom."},
      {"en": "React Three Fiber integration requires careful loading strategies (lazy loading) to not block the main thread during initial page load.", "id": "Integrasi React Three Fiber membutuhkan strategi loading yang hati-hati (lazy loading) agar tidak memblokir main thread saat initial page load."}
    ]'::jsonb,
    ARRAY['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Resend']::text[],
    'https://aziziem.xyz',
    'https://github.com/aziziega/azz-portfolio',
    '/azz-portfolio-desktop.png',
    '{"en": "azz-portfolio - Developer Portfolio & Headless CMS", "id": "azz-portfolio - Portfolio Developer & Headless CMS"}'::jsonb,
    '{"en": "Interactive developer portfolio and headless CMS built with Next.js, Supabase, and Three.js.", "id": "Portfolio developer interaktif dan headless CMS dibangun dengan Next.js, Supabase, dan Three.js."}'::jsonb,
    now()
  );

-- 2. Insert Project Images
DELETE FROM public.project_images;

INSERT INTO public.project_images (
  project_id,
  url,
  alt,
  sort_order
) VALUES
  -- GymFlow
  ('d1111111-1111-1111-1111-111111111111', '/modern-design-system-interface.png', '{"en": "GymFlow Dashboard", "id": "Dashboard GymFlow"}'::jsonb, 0),
  ('d1111111-1111-1111-1111-111111111111', '/mobile-app-interface.png', '{"en": "GymFlow Mobile App", "id": "Aplikasi Mobile GymFlow"}'::jsonb, 1),
  ('d1111111-1111-1111-1111-111111111111', '/modern-ecommerce-website.png', '{"en": "GymFlow Landing Page", "id": "Landing Page GymFlow"}'::jsonb, 2),

  -- MediCore
  ('d2222222-2222-2222-2222-222222222222', '/mobile-app-interface.png', '{"en": "MediCore Dashboard", "id": "Dashboard MediCore"}'::jsonb, 0),
  ('d2222222-2222-2222-2222-222222222222', '/modern-design-system-interface.png', '{"en": "MediCore Admin", "id": "Admin MediCore"}'::jsonb, 1),
  ('d2222222-2222-2222-2222-222222222222', '/modern-ecommerce-website.png', '{"en": "MediCore Patients Portal", "id": "Portal Pasien MediCore"}'::jsonb, 2),

  -- FinanceTrack
  ('d3333333-3333-3333-3333-333333333333', '/modern-ecommerce-website.png', '{"en": "FinanceTrack Home", "id": "Beranda FinanceTrack"}'::jsonb, 0),
  ('d3333333-3333-3333-3333-333333333333', '/modern-design-system-interface.png', '{"en": "FinanceTrack Analytics", "id": "Analitik FinanceTrack"}'::jsonb, 1),
  ('d3333333-3333-3333-3333-333333333333', '/mobile-app-interface.png', '{"en": "FinanceTrack Add Expense", "id": "Tambah Pengeluaran FinanceTrack"}'::jsonb, 2),

  -- UniCMS
  ('d4444444-4444-4444-4444-444444444444', '/modern-design-system-interface.png', '{"en": "UniCMS Dashboard", "id": "Dashboard UniCMS"}'::jsonb, 0),
  ('d4444444-4444-4444-4444-444444444444', '/mobile-app-interface.png', '{"en": "UniCMS Frontend", "id": "Frontend UniCMS"}'::jsonb, 1),
  ('d4444444-4444-4444-4444-444444444444', '/modern-ecommerce-website.png', '{"en": "UniCMS Documentation", "id": "Dokumentasi UniCMS"}'::jsonb, 2),

-- 3. Insert Certificates Seed Data
INSERT INTO public.certificates (title, issuer, year, image_url, credential_url, description, featured, sort_order, status)
VALUES
(
  'AWS Certified Solutions Architect – Associate',
  'Amazon Web Services',
  2024,
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop',
  'https://www.credly.com/badges/aws-certified-solutions-architect-associate',
  '{"en": "Validated expertise in designing distributed systems, cloud security, and scalable infrastructure on AWS.", "id": "Keahlian teruji dalam merancang sistem terdistribusi, keamanan cloud, dan infrastruktur berskala besar di AWS."}'::jsonb,
  true,
  1,
  'published'
),
(
  'Meta Front-End Developer Professional Certificate',
  'Meta',
  2023,
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
  'https://www.coursera.org/account/accomplishments/professional-cert/meta-frontend',
  '{"en": "Comprehensive program covering modern React, JavaScript ES6+, UI/UX principles, and web performance optimization.", "id": "Program komprehensif mencakup React modern, JavaScript ES6+, prinsip UI/UX, dan optimasi performa web."}'::jsonb,
  true,
  2,
  'published'
),
(
  'Google Cloud Associate Cloud Engineer',
  'Google Cloud',
  2023,
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop',
  'https://www.credential.net/google-cloud-associate-engineer',
  '{"en": "Demonstrated proficiency in deploying applications, monitoring operations, and managing GCP cloud solutions.", "id": "Menunjukkan kemahiran dalam mendeploy aplikasi, memantau operasi, dan mengelola solusi cloud GCP."}'::jsonb,
  false,
  3,
  'published'
);

-- 4. Insert Tech Stacks Seed Data
INSERT INTO public.tech_stacks (name, icon_url, color, featured, sort_order, status)
VALUES
('Next.js', 'https://cdn.simpleicons.org/nextdotjs/000000', '#000000', true, 1, 'published'),
('React', 'https://cdn.simpleicons.org/react/000000', '#61DAFB', true, 2, 'published'),
('TypeScript', 'https://cdn.simpleicons.org/typescript/000000', '#3178C6', true, 3, 'published'),
('Tailwind CSS', 'https://cdn.simpleicons.org/tailwindcss/000000', '#06B6D4', true, 4, 'published'),
('Node.js', 'https://cdn.simpleicons.org/nodedotjs/000000', '#339933', true, 5, 'published'),
('PostgreSQL', 'https://cdn.simpleicons.org/postgresql/000000', '#4169E1', true, 6, 'published'),
('Supabase', 'https://cdn.simpleicons.org/supabase/000000', '#3ECF8E', true, 7, 'published'),
('Git', 'https://cdn.simpleicons.org/git/000000', '#F05032', true, 8, 'published'),
('Docker', 'https://cdn.simpleicons.org/docker/000000', '#2496ED', false, 9, 'published'),
('Vercel', 'https://cdn.simpleicons.org/vercel/000000', '#000000', true, 10, 'published'),
('OpenAI', 'https://cdn.simpleicons.org/openai/000000', '#10A37F', true, 11, 'published'),
('ChatGPT', 'https://cdn.simpleicons.org/chatgpt/000000', '#74AA9C', true, 12, 'published'),
('Claude', 'https://cdn.simpleicons.org/claude/000000', '#D97757', true, 13, 'published'),
('Gemini', 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg', '#8E75B2', true, 14, 'published');

-- 5. Insert Testimonials Seed Data
INSERT INTO public.testimonials (name, role, company, avatar_url, quote, rating, featured, sort_order, status)
VALUES
('Alex Rivera', 'Senior Product Manager', 'Nexus Tech', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', '{"en":"Azizi delivered an outstanding fullstack application with incredible speed and clean code structure. Extremely reliable engineer!","id":"Azizi menyampaikan aplikasi fullstack yang luar biasa dengan kecepatan tinggi dan struktur kode yang sangat bersih. Sangat dapat diandalkan!"}', 5, true, 1, 'published'),
('Sarah Chen', 'Lead UI/UX Designer', 'Studio Vanguard', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80', '{"en":"Collaborating with Azizi was seamless. He translated complex design requirements into pixel-perfect, responsive React components effortlessly.","id":"Bekerja sama dengan Azizi sangat lancar. Dia menerjemahkan desain rumit menjadi komponen React yang sempurna dan responsif tanpa hambatan."}', 5, true, 2, 'published'),
('Budi Santoso', 'CTO & Co-Founder', 'Innova Digital', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', '{"en":"His expertise in Next.js, PostgreSQL, and Supabase saved our project timeline by weeks. Highly recommended for any serious web product!","id":"Keahliannya dalam Next.js, PostgreSQL, dan Supabase menghemat jadwal proyek kami hingga berminggu-minggu. Sangat direkomendasikan!"}', 5, true, 3, 'published'),
('Maya Putri', 'Fullstack Developer', 'Kreativ Studio', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80', '{"en":"Working with Azizi on our SaaS platform was a great experience. His code is clean, well-structured, and always delivered on time.","id":"Bekerja dengan Azizi pada platform SaaS kami adalah pengalaman yang luar biasa. Kodenya bersih, terstruktur dengan baik, dan selalu tepat waktu."}', 5, false, 4, 'published'),
('Rendra Wijaya', 'Product Owner', 'Garuda Labs', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', '{"en":"Azizi built our entire clinic EMR system from scratch. The result was impressive — clean architecture, fast performance, and easy to maintain.","id":"Azizi membangun seluruh sistem EMR klinik kami dari awal. Hasilnya mengesankan — arsitektur bersih, performa cepat, dan mudah dipelihara."}', 5, false, 5, 'published');


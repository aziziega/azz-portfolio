# CMS Implementation Plan

Dokumen ini merangkum rencana implementasi CMS pribadi untuk portfolio `azz-portfolio` berdasarkan struktur frontend saat ini. Fokus utama: memindahkan konten statis ke Supabase, menambahkan admin panel pribadi, mengamankan akses admin, dan menyiapkan workflow konten bilingual EN/ID.

## 1. Kondisi Frontend Saat Ini

Website saat ini memakai Next.js App Router dengan konten utama masih hardcoded di frontend.

Sumber konten yang sudah ditemukan:

- `data/projects.ts`: data project portfolio, sudah bilingual `en` dan `id`.
- `data/blogs.ts`: data external writing statis, tetapi belum menjadi sumber utama halaman blog saat ini.
- `contexts/language-contexts.tsx`: translation UI untuk navigasi, hero, contact, newsletter, footer, dan label project.
- `components/landingPage/contact.tsx`: contact form sudah ada, tetapi belum punya submit handler.
- `components/landingPage/newletter.tsx`: newsletter form sudah ada, tetapi belum menyimpan subscriber.
- `app/api/medium/route.ts`: mengambil artikel Medium via RSS dan `rss2json`.
- `app/work/[slug]/page.tsx`: detail project masih memakai static params dari `data/projects.ts`.

Catatan teknis penting:

- `Header` saat ini dirender di `app/layout.tsx` dan juga di `app/page.tsx`, sehingga berpotensi double render di homepage.
- Language switch saat ini berbasis `localStorage`, bagus untuk UX, tetapi belum ideal untuk SEO bilingual.
- Metadata halaman masih statis dan belum terhubung ke data CMS.

## 2. Target CMS

CMS dibuat sebagai admin panel pribadi untuk mengelola konten portfolio tanpa edit file manual.

Fitur target versi awal:

- Login admin pribadi.
- CRUD project portfolio.
- Upload thumbnail dan gallery project.
- Konten bilingual EN/ID untuk project.
- Toggle `draft`, `published`, `featured`, dan urutan tampil.
- Kelola contact messages dari form public.
- Kelola newsletter subscribers.
- Kelola external writing atau artikel dari Medium sebagai cache.
- Kelola site settings penting seperti social links, hero copy, contact info, dan SEO dasar.

Fitur yang bisa ditunda:

- Page builder.
- Rich text internal blog penuh.
- Scheduled publish.
- Version history detail.
- Multi-admin role kompleks.
- Workflow approval.

## 3. Stack Yang Disarankan

- Next.js App Router untuk public site dan admin panel.
- Supabase Auth untuk login admin.
- Supabase Postgres untuk data CMS.
- Supabase Storage untuk media project dan site assets.
- Supabase RLS untuk security.
- Next.js Route Handlers atau Server Actions untuk mutation.
- Zod untuk validasi input server.
- Vercel untuk deployment.

Dependency yang kemungkinan perlu ditambahkan:

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Opsional untuk form dan validasi admin:

```bash
npm install react-hook-form @hookform/resolvers zod
```

Catatan: `react-hook-form`, `@hookform/resolvers`, dan `zod` sudah ada di `package.json`, jadi kemungkinan tidak perlu install ulang.

## 4. Environment Variables

Tambahkan environment variable berikut di `.env.local` dan Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_ALLOWED_EMAIL=
```

Catatan security:

- `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` boleh dipakai client.
- `SUPABASE_SERVICE_ROLE_KEY` hanya boleh dipakai server.
- Jangan pernah expose service role key ke browser.

## 5. Auth Plan

Rekomendasi untuk admin pribadi:

- Gunakan Supabase Auth.
- Login via magic link, GitHub OAuth, atau Google OAuth.
- Simpan whitelist admin di table `admin_users`.
- Proteksi route `/admin` dan semua child route.
- Disable public sign-up jika tidak dibutuhkan.

Flow login:

1. User membuka `/admin/login`.
2. User login via provider yang dipilih.
3. Server mengecek session Supabase.
4. Server mengecek email di `admin_users`.
5. Jika email valid, masuk dashboard.
6. Jika tidak valid, redirect ke unauthorized page atau logout.

Table admin:

```sql
create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);
```

## 6. Database Schema Plan

### 6.1 Projects

Gunakan JSONB bilingual agar sesuai dengan struktur `data/projects.ts` saat ini.

```sql
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  featured boolean not null default false,
  sort_order integer not null default 0,
  year integer,
  title jsonb not null default '{"en":"","id":""}'::jsonb,
  tagline jsonb not null default '{"en":"","id":""}'::jsonb,
  description jsonb not null default '{"en":"","id":""}'::jsonb,
  category jsonb not null default '{"en":"","id":""}'::jsonb,
  duration jsonb not null default '{"en":"","id":""}'::jsonb,
  role jsonb not null default '{"en":"","id":""}'::jsonb,
  client jsonb not null default '{"en":"","id":""}'::jsonb,
  team_size jsonb not null default '{"en":"","id":""}'::jsonb,
  problem jsonb not null default '{"en":"","id":""}'::jsonb,
  solution jsonb not null default '{"en":"","id":""}'::jsonb,
  features jsonb not null default '[]'::jsonb,
  challenges jsonb not null default '[]'::jsonb,
  outcomes jsonb not null default '[]'::jsonb,
  design_process jsonb not null default '[]'::jsonb,
  lessons_learned jsonb not null default '[]'::jsonb,
  tech_stack text[] not null default '{}',
  live_url text,
  github_url text,
  case_study_url text,
  thumbnail_url text,
  seo_title jsonb not null default '{"en":"","id":""}'::jsonb,
  seo_description jsonb not null default '{"en":"","id":""}'::jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

Contoh format array bilingual untuk `features`, `challenges`, `outcomes`, `design_process`, dan `lessons_learned`:

```json
[
  {
    "en": "Member Management - Complete member profiles",
    "id": "Manajemen Member - Profil member lengkap"
  }
]
```

### 6.2 Project Images

```sql
create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  alt jsonb not null default '{"en":"","id":""}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
```

### 6.3 Site Settings

Untuk copy global yang perlu diedit dari admin.

```sql
create table public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
```

Contoh key:

- `hero`
- `navigation`
- `availability_marquee`
- `contact`
- `newsletter`
- `footer`
- `social_links`
- `seo_home`
- `seo_work`
- `seo_blog`
- `medium_source`

### 6.4 Contact Messages

```sql
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  source text not null default 'contact_form',
  created_at timestamptz not null default now()
);
```

### 6.5 Newsletter Subscribers

```sql
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'active' check (status in ('active', 'unsubscribed', 'bounced')),
  source text not null default 'website',
  created_at timestamptz not null default now()
);
```

### 6.6 External Writings

```sql
create table public.external_writings (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  title jsonb not null default '{"en":"","id":""}'::jsonb,
  excerpt jsonb not null default '{"en":"","id":""}'::jsonb,
  platform text not null,
  url text not null,
  category text,
  published_date text,
  read_time jsonb not null default '{"en":"","id":""}'::jsonb,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published', 'hidden')),
  source text not null default 'manual',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (url)
);
```

## 7. Storage Plan

Buat bucket Supabase Storage:

- `project-images`: public read, admin upload/update/delete.
- `site-assets`: public read, admin upload/update/delete.

Struktur path:

```txt
project-images/{project_id}/thumbnail.webp
project-images/{project_id}/gallery/{image_id}.webp
site-assets/profile/avatar.webp
site-assets/logo/logo.webp
```

Validasi upload:

- Hanya gambar: `image/jpeg`, `image/png`, `image/webp`.
- Batasi ukuran file, misalnya 2-5 MB.
- Disarankan kompres/convert ke WebP sebelum upload.

## 8. RLS Policy Plan

Prinsip security:

- Public hanya boleh membaca konten published.
- Public hanya boleh insert contact message dan newsletter subscriber.
- Admin boleh read/write semua data CMS.
- Service role hanya dipakai untuk operasi server yang memang membutuhkan bypass RLS.

Helper function admin:

```sql
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  );
$$;
```

Contoh RLS projects:

```sql
alter table public.projects enable row level security;

create policy "Public can read published projects"
on public.projects
for select
using (status = 'published');

create policy "Admin can manage projects"
on public.projects
for all
using (public.is_admin())
with check (public.is_admin());
```

Contoh RLS contact messages:

```sql
alter table public.contact_messages enable row level security;

create policy "Public can create contact messages"
on public.contact_messages
for insert
with check (true);

create policy "Admin can manage contact messages"
on public.contact_messages
for all
using (public.is_admin())
with check (public.is_admin());
```

Catatan: insert public untuk contact/newsletter sebaiknya tetap lewat Route Handler agar bisa divalidasi dan diberi rate limit.

## 9. Struktur Folder Yang Disarankan

```txt
app/
  admin/
    layout.tsx
    page.tsx
    login/
      page.tsx
    projects/
      page.tsx
      new/
        page.tsx
      [id]/
        page.tsx
    messages/
      page.tsx
    newsletter/
      page.tsx
    writing/
      page.tsx
    site/
      page.tsx
    settings/
      page.tsx
  api/
    contact/
      route.ts
    newsletter/
      route.ts
    medium/
      route.ts
    medium-sync/
      route.ts
lib/
  supabase/
    client.ts
    server.ts
    middleware.ts
  cms/
    projects.ts
    site-settings.ts
    writings.ts
    messages.ts
    newsletter.ts
  validations/
    project.ts
    contact.ts
    newsletter.ts
components/
  admin/
    admin-sidebar.tsx
    admin-header.tsx
    project-form.tsx
    image-uploader.tsx
    localized-field.tsx
    sortable-list.tsx
```

## 10. Public Frontend Migration Plan

### 10.1 Projects

Ganti sumber data dari `data/projects.ts` ke Supabase.

Fungsi yang perlu dibuat ulang:

- `getAllProjects(language)`
- `getFeaturedProjects(language)`
- `getProjectBySlug(slug, language)`
- `getAllProjectSlugs()` atau hilangkan jika route dibuat dynamic.

Strategi minimal:

- Server fetch semua field bilingual.
- Client memilih bahasa berdasarkan context `language`.
- Fallback ke `en` jika field `id` kosong.

Halaman terdampak:

- `components/landingPage/work.tsx`
- `components/work/work-page-client.tsx`
- `components/work/project-detail-client.tsx`
- `app/work/[slug]/page.tsx`

### 10.2 Metadata

Project metadata sekarang mengambil data dari static file.

Setelah CMS:

- Query Supabase di `generateMetadata`.
- Gunakan `seo_title` dan `seo_description` jika tersedia.
- Fallback ke `title`, `tagline`, dan `description`.

### 10.3 Site Copy

Tahap pertama cukup pindahkan copy yang paling sering berubah:

- Hero role, location, bio.
- Social links.
- Contact email dan location.
- Newsletter title/subtitle.
- Availability marquee.
- SEO home/work/blog.

Microcopy seperti tombol `View All`, `Read Externally`, `Back to Home` bisa tetap di `language-contexts.tsx` dulu.

### 10.4 Contact Form

Tambahkan submit ke `/api/contact`.

Flow:

1. User isi form.
2. Client submit ke API.
3. API validasi Zod.
4. API insert ke `contact_messages`.
5. Tampilkan success/error.
6. Admin membaca pesan di `/admin/messages`.

### 10.5 Newsletter Form

Tambahkan submit ke `/api/newsletter`.

Flow:

1. User isi email.
2. Client submit ke API.
3. API validasi email.
4. API insert ke `newsletter_subscribers`.
5. Jika email sudah ada, tampilkan pesan aman seperti "You are already subscribed".

### 10.6 Blog/Medium

Jangan bergantung langsung ke `rss2json` di client flow jangka panjang.

Rekomendasi:

- Tetap pertahankan `/api/medium` untuk fetch cepat sementara.
- Tambah `/api/medium-sync` untuk sync ke `external_writings`.
- Homepage dan blog page membaca dari `external_writings`.
- Admin bisa hide, feature, dan reorder item.

## 11. Admin Panel UX Plan

### Dashboard

Konten dashboard:

- Total published projects.
- Total draft projects.
- Messages baru.
- Subscriber aktif.
- Artikel external published.
- Quick action: `New Project`, `View Messages`, `Edit Site Copy`.

### Projects List

Fitur:

- Search project.
- Filter status.
- Toggle featured.
- Drag/reorder atau input sort order.
- Tombol preview.
- Tombol edit.

Kolom:

- Thumbnail.
- Title.
- Slug.
- Status.
- Featured.
- Year.
- Updated at.

### Project Form

Field utama:

- Slug.
- Status.
- Featured.
- Sort order.
- Year.
- Title EN/ID.
- Tagline EN/ID.
- Description EN/ID.
- Category EN/ID.
- Duration EN/ID.
- Role EN/ID.
- Client EN/ID.
- Team size EN/ID.
- Problem EN/ID.
- Solution EN/ID.
- Features dynamic list EN/ID.
- Challenges dynamic list EN/ID.
- Outcomes dynamic list EN/ID.
- Design process dynamic list EN/ID.
- Lessons learned dynamic list EN/ID.
- Tech stack tag input.
- Live URL.
- GitHub URL.
- Case study URL.
- Thumbnail upload.
- Gallery upload dan reorder.
- SEO title EN/ID.
- SEO description EN/ID.

Validasi publish:

- Slug wajib unique.
- Title EN wajib.
- Tagline EN wajib.
- Description EN wajib.
- Thumbnail wajib untuk published.
- Minimal satu image gallery disarankan, tetapi tidak wajib.
- Tech stack minimal satu item.

### Messages

Fitur:

- List pesan terbaru.
- Status `new`, `read`, `replied`, `archived`.
- Detail pesan.
- Mailto reply link.
- Archive pesan.

### Newsletter

Fitur:

- List subscribers.
- Search email.
- Status active/unsubscribed.
- Export CSV opsional.

### Site Settings

Fitur:

- Edit hero copy EN/ID.
- Edit contact info.
- Edit social links.
- Edit newsletter copy.
- Edit availability marquee.
- Edit metadata home/work/blog.

## 12. Workflow Konten

Workflow project baru:

1. Login ke `/admin`.
2. Buat project baru.
3. Isi konten EN sebagai default.
4. Isi konten ID.
5. Upload thumbnail dan gallery.
6. Preview project.
7. Set `published`.
8. Atur `featured` dan `sort_order`.
9. Project tampil di homepage dan work page.

Workflow translation:

- Field EN menjadi default.
- Field ID boleh kosong saat draft.
- Saat public memilih bahasa ID dan field ID kosong, fallback ke EN.
- Admin form perlu indikator field ID yang belum lengkap.

Workflow contact:

1. Visitor submit contact form.
2. Pesan masuk ke `contact_messages`.
3. Admin lihat pesan baru di dashboard.
4. Admin reply via email.
5. Admin ubah status menjadi `replied` atau `archived`.

Workflow newsletter:

1. Visitor submit email.
2. Email masuk ke `newsletter_subscribers`.
3. Admin bisa melihat dan export list.
4. Integrasi email marketing bisa ditambahkan nanti.

## 13. Milestone Implementasi

### Milestone 1: Supabase Foundation

- Buat Supabase project.
- Tambahkan env vars.
- Tambahkan Supabase client/server helper.
- Buat schema SQL awal.
- Aktifkan RLS.
- Tambahkan `admin_users` dan whitelist email admin.
- Buat storage buckets.

Output:

- Supabase terkoneksi.
- Auth siap.
- Database siap menerima konten.

### Milestone 2: Admin Auth Shell

- Buat `/admin/login`.
- Buat middleware proteksi `/admin`.
- Buat `/admin` dashboard sederhana.
- Tambahkan logout.
- Tambahkan unauthorized handling.

Output:

- Hanya admin yang bisa masuk dashboard.

### Milestone 3: Projects CMS

- Buat seed/migration dari `data/projects.ts` ke Supabase.
- Buat `/admin/projects` list.
- Buat `/admin/projects/new`.
- Buat `/admin/projects/[id]` edit.
- Tambahkan validasi Zod.
- Tambahkan create/update/delete/archive.
- Tambahkan publish/unpublish/featured/sort order.

Output:

- Project bisa dikelola dari admin.

### Milestone 4: Project Images

- Buat image uploader.
- Upload thumbnail ke Supabase Storage.
- Upload gallery image.
- Simpan metadata ke `project_images`.
- Reorder gallery.
- Delete image.

Output:

- Project images tidak lagi perlu disimpan manual di `public/`.

### Milestone 5: Public Project Migration

- Ganti homepage work section agar membaca dari Supabase.
- Ganti work list agar membaca dari Supabase.
- Ganti project detail agar membaca dari Supabase.
- Update metadata project.
- Pastikan fallback language berjalan.

Output:

- Data project public berasal dari CMS.

### Milestone 6: Contact And Newsletter

- Tambahkan `/api/contact`.
- Tambahkan submit handler contact form.
- Tambahkan admin messages page.
- Tambahkan `/api/newsletter`.
- Tambahkan submit handler newsletter form.
- Tambahkan admin subscribers page.

Output:

- Contact dan newsletter sudah masuk database.

### Milestone 7: Site Settings

- Buat table seed `site_settings`.
- Buat `/admin/site`.
- Pindahkan hero/contact/social/newsletter/marquee copy ke database.
- Public frontend membaca site settings.

Output:

- Copy penting homepage bisa diedit dari admin.

### Milestone 8: External Writing / Medium Sync

- Buat sync Medium ke `external_writings`.
- Buat `/admin/writing`.
- Admin bisa hide/feature/reorder external writing.
- Blog page membaca dari database.

Output:

- Blog/external writing lebih stabil dan bisa dikurasi.

### Milestone 9: Polish And Hardening

- Loading/error states.
- Empty states.
- Toast success/error.
- Confirm dialog untuk delete/archive.
- Rate limit contact/newsletter.
- Basic audit log opsional.
- SEO cleanup.
- Build dan regression testing.

Output:

- CMS siap dipakai harian.

## 14. File Yang Kemungkinan Akan Diubah

Public/frontend:

- `app/page.tsx`
- `app/layout.tsx`
- `app/work/page.tsx`
- `app/work/[slug]/page.tsx`
- `app/blog/page.tsx`
- `components/landingPage/work.tsx`
- `components/landingPage/blog.tsx`
- `components/landingPage/contact.tsx`
- `components/landingPage/newletter.tsx`
- `components/landingPage/hero-section.tsx`
- `components/landingPage/header.tsx`
- `components/landingPage/footer.tsx`
- `components/work/work-page-client.tsx`
- `components/work/project-detail-client.tsx`
- `components/work/project-list-item.tsx`

Data lama yang mungkin dipertahankan sementara sebagai fallback/seed:

- `data/projects.ts`
- `data/blogs.ts`
- `contexts/language-contexts.tsx`

File/folder baru:

- `lib/supabase/*`
- `lib/cms/*`
- `lib/validations/*`
- `app/admin/*`
- `app/api/contact/route.ts`
- `app/api/newsletter/route.ts`
- `app/api/medium-sync/route.ts`
- `components/admin/*`

## 15. Testing Checklist

Functional:

- Admin bisa login.
- Non-admin tidak bisa akses `/admin`.
- Admin bisa create project draft.
- Admin bisa publish project.
- Project published muncul di homepage.
- Project draft tidak muncul di public.
- Project detail bisa dibuka via slug.
- Toggle language tetap bekerja.
- Translation fallback bekerja.
- Contact form berhasil submit.
- Newsletter form berhasil submit.
- Blog/external writing tampil dari database.

Security:

- Public tidak bisa insert/update/delete project.
- Public tidak bisa read contact messages.
- Public tidak bisa read full newsletter list.
- Service role key tidak muncul di client bundle.
- Storage upload hanya admin.

Build:

```bash
npm run lint
npm run build
```

Manual QA:

- Cek homepage desktop/mobile.
- Cek work page desktop/mobile.
- Cek project detail desktop/mobile.
- Cek blog page desktop/mobile.
- Cek admin desktop.
- Cek empty state jika belum ada data.

## 16. Keputusan Yang Perlu Dikonfirmasi

Sebelum mulai coding, jawab keputusan berikut agar implementasi tidak salah arah:

1. Login admin mau pakai magic link, Google, atau GitHub?
2. Admin hanya satu email atau perlu support collaborator?
3. Bahasa default public mau `en` atau `id`?
4. URL bilingual cukup toggle saat ini, atau ingin `/en` dan `/id` untuk SEO?
5. Blog tetap pakai Medium sebagai sumber utama, atau ingin blog internal?
6. Contact form cukup masuk database, atau perlu notifikasi email juga?
7. Newsletter hanya simpan email, atau integrasi email marketing dari awal?
8. Gambar project wajib upload ke Supabase Storage, atau masih boleh pakai path dari `public/`?
9. Project detail tetap format fixed seperti sekarang, atau ingin section custom per project?
10. Perlu preview draft dengan URL khusus atau cukup preview di admin form?

## 17. Rekomendasi Eksekusi Pertama

Rekomendasi langkah pertama setelah dokumen ini disetujui:

1. Setup Supabase project dan env vars.
2. Implement Supabase helper dan auth admin.
3. Buat schema `projects`, `project_images`, `admin_users`, dan RLS.
4. Seed data dari `data/projects.ts` ke Supabase.
5. Migrasikan public project read ke Supabase.
6. Baru setelah itu bangun form admin CRUD project.

Alasan urutan ini:

- Project adalah konten paling kompleks dan paling penting di website ini.
- Struktur project sudah jelas dari `data/projects.ts`.
- Setelah project berhasil pindah ke CMS, pattern untuk settings, writing, contact, dan newsletter akan lebih mudah.

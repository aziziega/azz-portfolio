# feat(admin): lengkapi manajemen Certificates

## Ringkasan

Modul Certificates sudah memiliki halaman admin list/new/edit, API dasar, validasi, query CMS, tabel Supabase, dan komponen landing page. Implementasinya masih parsial: belum mendukung PDF, credential ID, tanggal terbit yang lengkap, archive/restore, drag-and-drop reorder, dan bucket Storage khusus.

Lengkapi modul secara end-to-end dengan mempertahankan desain dan pola interaksi dashboard admin yang sudah ada pada Projects, Tech Stack, dan Testimonials.

## Kondisi Existing

- `app/admin/certificates/page.tsx`, `new/page.tsx`, dan `[id]/page.tsx` sudah tersedia.
- `components/admin/certificate-form.tsx` masih memakai field `year` dan hanya upload gambar.
- `components/admin/certificates-list.tsx` sudah memiliki search, filter draft/published, edit, dan delete.
- API admin sudah menyediakan create, update, dan delete.
- `public.certificates` saat ini memiliki `year`, `image_url`, `credential_url`, `description`, `featured`, `sort_order`, dan `status`.
- Landing page sudah memiliki slider dan lightbox, tetapi belum menampilkan PDF atau credential ID.

## Database dan Supabase Storage

Jalankan SQL berikut di Supabase SQL Editor. Query harus aman dijalankan setelah schema existing.

```sql
-- Certificate metadata tambahan.
alter table public.certificates
  add column if not exists issue_date date,
  add column if not exists credential_id text,
  add column if not exists pdf_url text,
  add column if not exists archived_at timestamptz;

-- Backfill data lama dari kolom year tanpa menghapus year demi kompatibilitas.
update public.certificates
set issue_date = make_date(year, 1, 1)
where issue_date is null
  and year is not null;

create index if not exists certificates_admin_filter_idx
  on public.certificates (status, archived_at, sort_order, created_at desc);

create index if not exists certificates_credential_id_idx
  on public.certificates (credential_id)
  where credential_id is not null;

-- Bucket asset certificate.
insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', true)
on conflict (id) do nothing;

drop policy if exists "Public can read certificate assets" on storage.objects;
create policy "Public can read certificate assets"
on storage.objects for select
using (bucket_id = 'certificates');

drop policy if exists "Admin can upload certificate assets" on storage.objects;
create policy "Admin can upload certificate assets"
on storage.objects for insert
with check (bucket_id = 'certificates' and public.is_admin());

drop policy if exists "Admin can update certificate assets" on storage.objects;
create policy "Admin can update certificate assets"
on storage.objects for update
using (bucket_id = 'certificates' and public.is_admin())
with check (bucket_id = 'certificates' and public.is_admin());

drop policy if exists "Admin can delete certificate assets" on storage.objects;
create policy "Admin can delete certificate assets"
on storage.objects for delete
using (bucket_id = 'certificates' and public.is_admin());

-- Dipakai endpoint reorder agar perubahan urutan atomik.
create or replace function public.reorder_certificates(p_ids uuid[])
returns void
language sql
security invoker
set search_path = public
as $$
  update public.certificates as c
  set sort_order = ordered.position,
      updated_at = now()
  from unnest(p_ids) with ordinality as ordered(id, position)
  where c.id = ordered.id
    and c.archived_at is null;
$$;
```

Catatan implementasi:

- `issue_date` wajib pada form/API untuk certificate baru dan saat publish.
- `year` dipertahankan sementara untuk kompatibilitas data lama; tampilan baru mengambil tahun dari `issue_date`.
- `archived_at` adalah soft delete. Archive tidak menghapus file Storage.
- Jangan menambahkan hard delete ke UI normal.

## Perubahan Admin UI

### Form New/Edit

Pertahankan class CSS dan layout form existing. Tambahkan atau ubah field berikut:

- Certificate title, wajib.
- Issuer organization, wajib.
- Issue date, wajib, menggunakan date input/picker existing.
- Credential URL, opsional dan harus URL valid.
- Credential ID, opsional.
- Certificate image, opsional; dukung upload atau URL.
- Certificate PDF, opsional; dukung upload atau URL, preview nama file, dan link buka/unduh.
- Bilingual description/caption EN dan ID.
- Featured toggle.
- Status Draft/Published.
- Sort order hanya sebagai fallback; urutan utama dikelola melalui drag-and-drop.

Validasi upload:

- Gambar: JPEG, PNG, atau WebP, maksimal 5 MB.
- PDF: maksimal 10 MB.
- Tampilkan state uploading, error, replace, dan remove.
- Gunakan bucket `certificates` dengan folder `images/` dan `pdfs/`.

### List

- Pertahankan tabel dan toolbar existing.
- Search berdasarkan title, issuer, dan credential ID.
- Filter status: All, Draft, Published.
- Filter arsip: Active dan Archived.
- Tampilkan thumbnail, title, issuer, issue date/year, status, media tersedia, credential link, dan actions.
- Tambahkan drag handle untuk mengubah urutan certificate aktif.
- Simpan urutan melalui endpoint reorder setelah drop dan tampilkan error jika gagal.
- Ganti delete menjadi modal Archive.
- Pada record archived, tampilkan aksi Restore.

## API dan CMS

- Perbarui `CertificateInput`, `DBCertificate`, dan `PublicCertificate` agar mencakup `issue_date`, `credential_id`, `pdf_url`, dan `archived_at`.
- Perbarui schema Zod: title, issuer, dan issue date wajib; media dan credential metadata opsional.
- Pertahankan autentikasi admin yang sudah digunakan oleh route existing.
- Tambahkan endpoint `PATCH /api/admin/certificates/reorder` yang menerima array UUID terurut dan memanggil RPC `reorder_certificates`.
- Tambahkan endpoint archive/restore atau gunakan `PATCH /api/admin/certificates/[id]` dengan operasi eksplisit.
- Endpoint publik hanya mengembalikan record dengan `status = 'published'` dan `archived_at IS NULL`.
- API publik mengembalikan URL gambar, URL PDF, credential URL/ID, deskripsi ter-resolve berdasarkan bahasa, dan tahun hasil `issue_date`.

## Landing Page

- Pertahankan slider, card, lightbox, spacing, warna, dan typography existing.
- Tampilkan placeholder yang konsisten jika certificate tidak memiliki gambar.
- Pada lightbox tampilkan issuer, issue year, bilingual description, credential ID jika ada, tombol verifikasi credential jika ada, dan tombol buka/unduh PDF jika ada.
- Jangan tampilkan draft atau archived certificate.
- Pastikan keyboard interaction, ESC close, external link security, dan responsive layout tetap berfungsi.

## Acceptance Criteria

- Admin dapat membuat certificate dengan title, issuer, dan issue date.
- Admin dapat menyimpan draft lalu mempublikasikannya.
- Admin dapat mengunggah gambar dan PDF ke bucket `certificates` atau memasukkan URL eksternal.
- File dengan tipe/ukuran tidak valid ditolak dengan pesan yang jelas.
- Admin dapat mencari, memfilter, mengedit, mengarsipkan, dan memulihkan certificate.
- Drag-and-drop reorder tersimpan di database dan bertahan setelah refresh.
- Certificate published dan tidak archived muncul di landing page dalam urutan yang benar.
- Draft dan archived tidak muncul di landing page maupun API publik.
- Credential URL, credential ID, gambar, PDF, dan fallback tanpa gambar tampil benar.
- RLS mencegah user non-admin mengubah data atau asset certificate.
- Tidak ada hard delete dari workflow admin normal.

## Testing

- Tambahkan unit test untuk schema validation dan resolver public certificate.
- Tambahkan test API untuk create, update, publish, archive, restore, reorder, dan unauthorized request.
- Uji query SQL pada database yang sudah memiliki data certificate.
- Uji upload gambar/PDF, batas ukuran, tipe file, replace, dan remove.
- Uji rendering landing page untuk data lengkap, tanpa gambar, tanpa PDF, draft, dan archived.
- Jalankan:

```bash
npm run lint
npm run build
```

## Scope dan Kompatibilitas

- Jangan redesign dashboard atau landing page.
- Jangan mengubah modul Projects, Tech Stack, Testimonials, atau schema yang tidak terkait.
- Pertahankan fallback certificate existing bila API publik gagal atau tidak memiliki data.
- Jangan menghapus kolom `year` dalam issue ini; migration lanjutan dapat menghapusnya setelah seluruh consumer berpindah ke `issue_date`.

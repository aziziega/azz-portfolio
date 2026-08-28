-- =========================================================================
-- SUPABASE CMS DATABASE SETUP
-- Execute this single script in the Supabase SQL Editor.
-- =========================================================================

-- 1. Create Admin Users table first (so that functions can reference it)
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  email text unique not null,
  role text not null default 'owner',
  created_at timestamptz not null default now()
);

-- Enable RLS on admin_users
alter table public.admin_users enable row level security;

-- 2. Create helper functions
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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
       or admin_users.email = auth.jwt() ->> 'email'
  );
$$;

-- RLS policy for admin_users (uses public.is_admin())
create policy "Admin can read admin_users"
on public.admin_users
for select
using (public.is_admin());

-- 3. Seed admin user email (GANTI dengan email admin Anda!)
insert into public.admin_users (email, role)
values ('your-admin-email@example.com', 'owner')
on conflict (email) do nothing;


-- 4. Create Projects & Project Images
create table if not exists public.projects (
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

-- Auto-update updated_at for projects
create or replace trigger projects_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

-- RLS for projects
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

create index if not exists idx_projects_status on public.projects(status);
create index if not exists idx_projects_slug on public.projects(slug);
create index if not exists idx_projects_featured on public.projects(featured);

-- Project Images
create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  alt jsonb not null default '{"en":"","id":""}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.project_images enable row level security;

create policy "Public can read project images of published projects"
on public.project_images
for select
using (
  exists (
    select 1 from public.projects
    where projects.id = project_images.project_id
    and projects.status = 'published'
  )
);

create policy "Admin can manage project images"
on public.project_images
for all
using (public.is_admin())
with check (public.is_admin());


-- 5. Create Contact Messages
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  source text not null default 'contact_form',
  created_at timestamptz not null default now()
);

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

create index if not exists idx_contact_messages_status on public.contact_messages(status);
create index if not exists idx_contact_messages_created on public.contact_messages(created_at desc);


-- 6. Create Newsletter Subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  status text not null default 'pending' check (status in ('active', 'pending', 'unsubscribed', 'bounced')),
  source text not null default 'website',
  confirm_token text,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

create policy "Public can subscribe to newsletter"
on public.newsletter_subscribers
for insert
with check (true);

create policy "Admin can manage newsletter subscribers"
on public.newsletter_subscribers
for all
using (public.is_admin())
with check (public.is_admin());

create index if not exists idx_newsletter_status on public.newsletter_subscribers(status);


-- 7. Create External Writings
create table if not exists public.external_writings (
  id uuid primary key default gen_random_uuid(),
  external_id text,
  title text not null,
  excerpt text,
  platform text not null default 'Medium',
  url text not null,
  category text,
  published_date text,
  read_time text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'published' check (status in ('draft', 'published', 'hidden')),
  source text not null default 'medium_sync',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (url)
);

-- Auto-update updated_at for writings
create or replace trigger external_writings_updated_at
  before update on public.external_writings
  for each row
  execute function public.handle_updated_at();

alter table public.external_writings enable row level security;

create policy "Public can read published writings"
on public.external_writings
for select
using (status = 'published');

create policy "Admin can manage external writings"
on public.external_writings
for all
using (public.is_admin())
with check (public.is_admin());

create index if not exists idx_external_writings_status on public.external_writings(status);


-- 8. Create Site Settings
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Auto-update updated_at for site settings
create or replace trigger site_settings_updated_at
  before update on public.site_settings
  for each row
  execute function public.handle_updated_at();

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
on public.site_settings
for select
using (true);

create policy "Admin can manage site settings"
on public.site_settings
for all
using (public.is_admin())
with check (public.is_admin());

-- Seed default settings
insert into public.site_settings (key, value) values
  ('hero', '{
    "en": {
      "role": "Fullstack Web Developer",
      "location": "Prambanan, Klaten, Central Java Indonesia.",
      "bio": "Fullstack Web Developer delivering scalable, end-to-end web solutions with Next.js, React, Supabase, and Node.js. I transform complex requirements into clean, intuitive digital experiences. Reliable, continuously learning, and committed to modern best practices."
    },
    "id": {
      "role": "Fullstack Web Developer",
      "location": "Prambanan, Klaten, Jawa Tengah Indonesia.",
      "bio": "Fullstack Web Developer yang menghadirkan solusi web scalable dan end-to-end dengan Next.js, React, Supabase, dan Node.js. Saya mengubah requirement kompleks menjadi pengalaman digital yang clean dan intuitif. Dapat diandalkan, terus belajar, dan berkomitmen pada best practices modern."
    }
  }'::jsonb),
  ('social_links', '{
    "resume": "/resume",
    "github": "https://github.com/aziziega",
    "linkedin": "https://linkedin.com/in/aziziegatri",
    "x": "https://x.com/aziziegatri",
    "email": "aziziegatrim@gmail.com"
  }'::jsonb),
  ('contact', '{
    "en": {
      "email": "aziziegatrim@gmail.com",
      "location": "Prambanan, Klaten, Jawa Tengah Indonesia."
    },
    "id": {
      "email": "aziziegatrim@gmail.com",
      "location": "Prambanan, Klaten, Jawa Tengah Indonesia."
    }
  }'::jsonb),
  ('seo_home', '{
    "en": {
      "title": "Azizi Egatri M. — Fullstack Web Developer",
      "description": "Portfolio of Azizi Egatri M., a Fullstack Web Developer specializing in Next.js, React, Supabase, and Node.js."
    },
    "id": {
      "title": "Azizi Egatri M. — Fullstack Web Developer",
      "description": "Portfolio Azizi Egatri M., Fullstack Web Developer spesialis Next.js, React, Supabase, dan Node.js."
    }
  }'::jsonb)
on conflict (key) do nothing;


-- 9. Create Storage Buckets
insert into storage.buckets (id, name, public)
values 
  ('project-images', 'project-images', true),
  ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Storage policies for project-images
create policy "Public can read project images"
on storage.objects for select
using (bucket_id = 'project-images');

create policy "Admin can upload project images"
on storage.objects for insert
with check (
  bucket_id = 'project-images'
  and public.is_admin()
);

create policy "Admin can update project images"
on storage.objects for update
using (
  bucket_id = 'project-images'
  and public.is_admin()
);

create policy "Admin can delete project images"
on storage.objects for delete
using (
  bucket_id = 'project-images'
  and public.is_admin()
);

-- Storage policies for site-assets
create policy "Public can read site assets"
on storage.objects for select
using (bucket_id = 'site-assets');

create policy "Admin can upload site assets"
on storage.objects for insert
with check (
  bucket_id = 'site-assets'
  and public.is_admin()
);

create policy "Admin can update site assets"
on storage.objects for update
using (
  bucket_id = 'site-assets'
  and public.is_admin()
);

create policy "Admin can delete site assets"
on storage.objects for delete
using (
  bucket_id = 'site-assets'
  and public.is_admin()
);


-- 10. Create Certificates Table & RLS Policies
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title jsonb not null default '{"en":"","id":""}'::jsonb,
  issuer text not null,
  year integer,
  image_url text not null default '',
  credential_url text,
  description jsonb not null default '{"en":"","id":""}'::jsonb,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists certificates_status_sort_idx on public.certificates (status, sort_order);

drop trigger if exists certificates_set_updated_at on public.certificates;
create trigger certificates_set_updated_at
  before update on public.certificates
  for each row execute function public.handle_updated_at();

-- RLS Policies for Certificates
alter table public.certificates enable row level security;

drop policy if exists "Public can read published certificates" on public.certificates;
create policy "Public can read published certificates"
on public.certificates for select using (status = 'published');

drop policy if exists "Admin can manage certificates" on public.certificates;
create policy "Admin can manage certificates"
on public.certificates for all
using (public.is_admin()) with check (public.is_admin());

-- 11. Create Tech Stacks Table & RLS Policies
create table if not exists public.tech_stacks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon_url text,
  color text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tech_stacks_status_sort_idx on public.tech_stacks (status, sort_order);

drop trigger if exists tech_stacks_set_updated_at on public.tech_stacks;
create trigger tech_stacks_set_updated_at
  before update on public.tech_stacks
  for each row execute function public.handle_updated_at();

-- RLS Policies for Tech Stacks
alter table public.tech_stacks enable row level security;

drop policy if exists "Public can read published tech stacks" on public.tech_stacks;
create policy "Public can read published tech stacks"
on public.tech_stacks for select using (status = 'published');

drop policy if exists "Admin can manage tech stacks" on public.tech_stacks;
create policy "Admin can manage tech stacks"
on public.tech_stacks for all
using (public.is_admin()) with check (public.is_admin());

-- 12. Create Testimonials Table & RLS Policies
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  company text,
  avatar_url text,
  quote jsonb not null default '{"en":"","id":""}'::jsonb,
  feedback text not null default '',
  source text not null default 'admin' check (source in ('admin', 'client')),
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'pending')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_status_sort_idx on public.testimonials (status, sort_order);

drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at
  before update on public.testimonials
  for each row execute function public.handle_updated_at();

-- RLS Policies for Testimonials
alter table public.testimonials enable row level security;

drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials"
on public.testimonials for select using (status = 'published');

drop policy if exists "Admin can manage testimonials" on public.testimonials;
create policy "Admin can manage testimonials"
on public.testimonials for all
using (public.is_admin()) with check (public.is_admin());

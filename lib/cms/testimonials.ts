import { createClient } from "@/lib/supabase/server"
import { type TestimonialInput } from "@/lib/validations/testimonial"

export interface DBTestimonial {
  id: string
  name: string
  role: string
  company: string | null
  avatar_url: string | null
  quote: Record<string, string>
  rating: number | null
  featured: boolean
  sort_order: number
  status: "draft" | "published"
  created_at: string
  updated_at: string
}

export interface PublicTestimonial {
  id: string
  name: string
  role: string
  company: string | null
  avatarUrl: string | null
  quote: string
  rating: number | null
  featured: boolean
  sortOrder: number
  createdAt: string
}

// ---------------- Admin Functions ----------------

export async function getAllTestimonialsAdmin(): Promise<DBTestimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as DBTestimonial[]
}

export async function getTestimonialById(id: string): Promise<DBTestimonial | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data as DBTestimonial
}

export async function createTestimonial(input: TestimonialInput): Promise<DBTestimonial> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .insert([input])
    .select()
    .single()

  if (error) throw error
  return data as DBTestimonial
}

export async function updateTestimonial(id: string, input: TestimonialInput): Promise<DBTestimonial> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DBTestimonial
}

export async function deleteTestimonial(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id)

  if (error) throw error
}

// ---------------- Public Functions ----------------

export function resolveTestimonial(t: DBTestimonial, language: "en" | "id" = "en"): PublicTestimonial {
  const quote = t.quote
    ? (t.quote[language] || t.quote["en"] || "")
    : ""

  return {
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    avatarUrl: t.avatar_url,
    quote,
    rating: t.rating,
    featured: t.featured,
    sortOrder: t.sort_order,
    createdAt: t.created_at,
  }
}

export async function getPublicTestimonials(language: "en" | "id" = "en"): Promise<PublicTestimonial[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch public testimonials:", error)
    return []
  }

  return (data as DBTestimonial[]).map((t) => resolveTestimonial(t, language))
}

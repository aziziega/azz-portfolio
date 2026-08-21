import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { type TestimonialInput } from "@/lib/validations/testimonial"
import { type FeedbackInput } from "@/lib/validations/feedback"

export interface DBTestimonial {
  id: string
  name: string
  role: string
  company: string | null
  avatar_url: string | null
  quote: Record<string, string>
  feedback: string
  source: "admin" | "client"
  featured: boolean
  sort_order: number
  status: "draft" | "published" | "pending"
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
  featured: boolean
  sortOrder: number
  createdAt: string
}

// ---------------- Admin Functions ----------------

export async function getAllTestimonialsAdmin(filters?: {
  status?: string
  source?: string
}): Promise<DBTestimonial[]> {
  const supabase = await createClient()
  let query = supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status)
  }

  if (filters?.source && filters.source !== "all") {
    query = query.eq("source", filters.source)
  }

  const { data, error } = await query
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
  const payload = {
    ...input,
    company: input.company?.trim() || null,
    avatar_url: input.avatar_url?.trim() || null,
    feedback: input.feedback?.trim() || "",
    source: input.source || "admin",
  }

  const { data, error } = await supabase
    .from("testimonials")
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return data as DBTestimonial
}

export async function updateTestimonial(id: string, input: Partial<TestimonialInput>): Promise<DBTestimonial> {
  const supabase = await createClient()
  const payload = {
    ...input,
    company: input.company !== undefined ? (input.company?.trim() || null) : undefined,
    avatar_url: input.avatar_url !== undefined ? (input.avatar_url?.trim() || null) : undefined,
    feedback: input.feedback !== undefined ? (input.feedback?.trim() || "") : undefined,
  }

  const { data, error } = await supabase
    .from("testimonials")
    .update(payload)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DBTestimonial
}

export async function approveTestimonial(id: string): Promise<DBTestimonial> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .update({ status: "published" })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DBTestimonial
}

export async function rejectTestimonial(id: string): Promise<DBTestimonial> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("testimonials")
    .update({ status: "draft" })
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

// ---------------- Public Feedback Submission ----------------

export async function createClientFeedback(input: FeedbackInput): Promise<DBTestimonial> {
  const supabase = createAdminClient()

  const cleanQuote = input.quote.trim()
  const payload = {
    name: input.name.trim(),
    role: input.role.trim(),
    company: input.company?.trim() || null,
    avatar_url: input.avatar_url?.trim() || null,
    quote: {
      en: cleanQuote,
      id: cleanQuote,
    },
    feedback: input.feedback?.trim() || "",
    source: "client",
    featured: false,
    sort_order: 0,
    status: "pending",
  }

  const { data, error } = await supabase
    .from("testimonials")
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return data as DBTestimonial
}

// ---------------- Public Functions ----------------

export function resolveTestimonial(t: DBTestimonial, language: "en" | "id" = "en"): PublicTestimonial {
  const quote = t.quote
    ? (t.quote[language] || t.quote["en"] || t.quote["id"] || "")
    : ""

  return {
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    avatarUrl: t.avatar_url,
    quote,
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

import { createClient } from "@/lib/supabase/server"
import { type TechStackInput } from "@/lib/validations/tech-stack"

export interface DBTechStack {
  id: string
  name: string
  icon_url: string | null
  color: string | null
  featured: boolean
  sort_order: number
  status: "draft" | "published"
  created_at: string
  updated_at: string
}

export interface PublicTechStack {
  id: string
  name: string
  iconUrl: string | null
  color: string | null
  featured: boolean
  sortOrder: number
  createdAt: string
}

// ---------------- Admin Functions ----------------

export async function getAllTechStacksAdmin(): Promise<DBTechStack[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tech_stacks")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as DBTechStack[]
}

export async function getTechStackById(id: string): Promise<DBTechStack | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tech_stacks")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data as DBTechStack
}

export async function createTechStack(input: TechStackInput): Promise<DBTechStack> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tech_stacks")
    .insert([input])
    .select()
    .single()

  if (error) throw error
  return data as DBTechStack
}

export async function updateTechStack(id: string, input: TechStackInput): Promise<DBTechStack> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("tech_stacks")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DBTechStack
}

export async function deleteTechStack(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("tech_stacks")
    .delete()
    .eq("id", id)

  if (error) throw error
}

// ---------------- Public Functions ----------------

export function resolveTechStack(t: DBTechStack, language: "en" | "id" = "en"): PublicTechStack {
  return {
    id: t.id,
    name: t.name,
    iconUrl: t.icon_url,
    color: t.color,
    featured: t.featured,
    sortOrder: t.sort_order,
    createdAt: t.created_at,
  }
}

export async function getPublicTechStacks(language: "en" | "id" = "en"): Promise<PublicTechStack[]> {
  const supabase = await createClient()
  const { data: techStacks, error } = await supabase
    .from("tech_stacks")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching public tech stacks:", error)
    return []
  }

  if (!techStacks) return []

  return (techStacks as DBTechStack[]).map((t) => resolveTechStack(t, language))
}

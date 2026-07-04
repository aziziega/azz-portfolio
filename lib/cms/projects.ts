import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { type ProjectInput } from "@/lib/validations/project"

export interface DBProject {
  id: string
  slug: string
  status: 'draft' | 'published' | 'archived'
  featured: boolean
  sort_order: number
  year: number | null
  title: Record<string, string>
  tagline: Record<string, string>
  description: Record<string, string>
  category: Record<string, string>
  duration: Record<string, string>
  role: Record<string, string>
  client: Record<string, string>
  team_size: Record<string, string>
  problem: Record<string, string>
  solution: Record<string, string>
  features: Record<string, string>[]
  challenges: Record<string, string>[]
  outcomes: Record<string, string>[]
  design_process: Record<string, string>[]
  lessons_learned: Record<string, string>[]
  tech_stack: string[]
  live_url: string | null
  github_url: string | null
  case_study_url: string | null
  thumbnail_url: string | null
  seo_title: Record<string, string>
  seo_description: Record<string, string>
  published_at: string | null
  created_at: string
  updated_at: string
}

// ---------------- Admin Functions ----------------

export async function getAllProjectsAdmin(): Promise<DBProject[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
  
  if (error) throw error
  return data as DBProject[]
}

export async function getProjectById(id: string): Promise<DBProject | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single()
  
  if (error) {
    if (error.code === "PGRST116") return null // Not found
    throw error
  }
  return data as DBProject
}

export async function createProject(input: ProjectInput): Promise<DBProject> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .insert([input])
    .select()
    .single()
  
  if (error) throw error
  return data as DBProject
}

export async function updateProject(id: string, input: ProjectInput): Promise<DBProject> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .update(input)
    .eq("id", id)
    .select()
    .single()
  
  if (error) throw error
  return data as DBProject
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
  
  if (error) throw error
}

export async function toggleFeatured(id: string, featured: boolean): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("projects")
    .update({ featured })
    .eq("id", id)
  
  if (error) throw error
}

export async function updateSortOrder(id: string, sort_order: number): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("projects")
    .update({ sort_order })
    .eq("id", id)
  
  if (error) throw error
}

// ---------------- Public Functions ----------------

// Helper to resolve bilingual DB fields into public site Project interface
function resolveProject(p: DBProject, language: "en" | "id"): any {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title[language] || p.title["en"] || "",
    tagline: p.tagline[language] || p.tagline["en"] || "",
    description: p.description[language] || p.description["en"] || "",
    category: p.category[language] || p.category["en"] || "",
    tags: p.tech_stack, // Maps tags to techStack
    thumbnail: p.thumbnail_url || "",
    images: [], // Populated separately or via gallery table
    year: p.year || new Date().getFullYear(),
    duration: p.duration[language] || p.duration["en"] || "",
    role: p.role[language] || p.role["en"] || "",
    client: p.client[language] || p.client["en"] || "",
    teamSize: p.team_size[language] || p.team_size["en"] || "",
    liveUrl: p.live_url || undefined,
    githubUrl: p.github_url || undefined,
    caseStudyUrl: p.case_study_url || undefined,
    problem: p.problem[language] || p.problem["en"] || "",
    solution: p.solution[language] || p.solution["en"] || "",
    features: (p.features || []).map(f => f[language] || f["en"] || ""),
    challenges: (p.challenges || []).map(c => c[language] || c["en"] || ""),
    outcomes: (p.outcomes || []).map(o => o[language] || o["en"] || ""),
    techStack: p.tech_stack,
    designProcess: (p.design_process || []).map(d => d[language] || d["en"] || ""),
    lessonsLearned: (p.lessons_learned || []).map(l => l[language] || l["en"] || ""),
    featured: p.featured,
    published: p.status === "published",
    order: p.sort_order,
  }
}

export async function getPublicProjects(language: "en" | "id" = "en"): Promise<any[]> {
  const supabase = await createClient()
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
  
  if (projectsError) throw projectsError
  if (!projects) return []

  // Fetch images for all projects
  const { data: images, error: imagesError } = await supabase
    .from("project_images")
    .select("*")
    .order("sort_order", { ascending: true })
  
  if (imagesError) throw imagesError

  return (projects as DBProject[]).map(p => {
    const resolved = resolveProject(p, language)
    resolved.images = (images || [])
      .filter(img => img.project_id === p.id)
      .map(img => img.url)
    return resolved
  })
}

export async function getPublicFeaturedProjects(language: "en" | "id" = "en"): Promise<any[]> {
  const all = await getPublicProjects(language)
  return all.filter(p => p.featured)
}

export async function getPublicProjectBySlug(slug: string, language: "en" | "id" = "en"): Promise<any | null> {
  const supabase = await createClient()
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()
  
  if (projectError) {
    if (projectError.code === "PGRST116") return null
    throw projectError
  }

  const { data: images, error: imagesError } = await supabase
    .from("project_images")
    .select("url")
    .eq("project_id", project.id)
    .order("sort_order", { ascending: true })
  
  if (imagesError) throw imagesError

  const resolved = resolveProject(project as DBProject, language)
  resolved.images = (images || []).map(img => img.url)
  return resolved
}

export async function getRawProjectBySlug(slug: string): Promise<any | null> {
  const supabase = await createClient()
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single()
  
  if (projectError) {
    if (projectError.code === "PGRST116") return null
    throw projectError
  }

  const { data: images, error: imagesError } = await supabase
    .from("project_images")
    .select("url")
    .eq("project_id", project.id)
    .order("sort_order", { ascending: true })
  
  if (imagesError) throw imagesError

  return {
    ...project,
    images: (images || []).map(img => img.url)
  }
}

export async function getAllPublicSlugs(): Promise<string[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("status", "published")
    
  if (error) throw error
  return (data || []).map(p => p.slug)
}

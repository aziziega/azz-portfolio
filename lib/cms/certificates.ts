import { createClient } from "@/lib/supabase/server"
import { type CertificateInput } from "@/lib/validations/certificate"

export interface DBCertificate {
  id: string
  title: string
  issuer: string
  year: number | null
  image_url: string
  credential_url: string | null
  description: Record<string, string>
  featured: boolean
  sort_order: number
  status: "draft" | "published"
  created_at: string
  updated_at: string
}

export interface PublicCertificate {
  id: string
  title: string
  issuer: string
  year: number | null
  imageUrl: string
  credentialUrl: string | null
  description: string
  featured: boolean
  sortOrder: number
  createdAt: string
}

// ---------------- Admin Functions ----------------

export async function getAllCertificatesAdmin(): Promise<DBCertificate[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as DBCertificate[]
}

export async function getCertificateById(id: string): Promise<DBCertificate | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .single()

  if (error) return null
  return data as DBCertificate
}

export async function createCertificate(input: CertificateInput): Promise<DBCertificate> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("certificates")
    .insert([input])
    .select()
    .single()

  if (error) throw error
  return data as DBCertificate
}

export async function updateCertificate(id: string, input: CertificateInput): Promise<DBCertificate> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("certificates")
    .update(input)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DBCertificate
}

export async function deleteCertificate(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from("certificates")
    .delete()
    .eq("id", id)

  if (error) throw error
}

// ---------------- Public Functions ----------------

export function resolveCertificate(c: DBCertificate, language: "en" | "id" = "en"): PublicCertificate {
  const description = c.description
    ? (c.description[language] || c.description["en"] || "")
    : ""

  return {
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    year: c.year,
    imageUrl: c.image_url,
    credentialUrl: c.credential_url,
    description,
    featured: c.featured,
    sortOrder: c.sort_order,
    createdAt: c.created_at,
  }
}

export async function getPublicCertificates(language: "en" | "id" = "en"): Promise<PublicCertificate[]> {
  const supabase = await createClient()
  const { data: certificates, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching public certificates:", error)
    return []
  }

  if (!certificates) return []

  return (certificates as DBCertificate[]).map((c) => resolveCertificate(c, language))
}

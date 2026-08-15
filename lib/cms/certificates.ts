import { createClient } from "@/lib/supabase/server"
import { type CertificateInput } from "@/lib/validations/certificate"

export interface DBCertificate {
  id: string
  title: string
  issuer: string
  issue_date: string | null
  year: number | null
  credential_id: string | null
  credential_url: string | null
  image_url: string | null
  pdf_url: string | null
  description: Record<string, string>
  featured: boolean
  sort_order: number
  status: "draft" | "published"
  archived_at: string | null
  created_at: string
  updated_at: string
}

export interface PublicCertificate {
  id: string
  title: string
  issuer: string
  issueDate: string | null
  year: number | null
  credentialId: string | null
  credentialUrl: string | null
  imageUrl: string
  pdfUrl: string | null
  description: string
  featured: boolean
  sortOrder: number
  createdAt: string
}

// ---------------- Admin Functions ----------------

export async function getAllCertificatesAdmin(includeArchived = true): Promise<DBCertificate[]> {
  const supabase = await createClient()
  let query = supabase
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (!includeArchived) {
    query = query.is("archived_at", null)
  }

  const { data, error } = await query
  if (error) throw error
  return (data || []) as DBCertificate[]
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
  
  // Calculate year from issue_date if year is not provided
  let computedYear = input.year
  if (!computedYear && input.issue_date) {
    const parsedYear = new Date(input.issue_date).getFullYear()
    if (!isNaN(parsedYear)) {
      computedYear = parsedYear
    }
  }

  const payload = {
    ...input,
    year: computedYear ?? null,
  }

  const { data, error } = await supabase
    .from("certificates")
    .insert([payload])
    .select()
    .single()

  if (error) throw error
  return data as DBCertificate
}

export async function updateCertificate(id: string, input: Partial<CertificateInput>): Promise<DBCertificate> {
  const supabase = await createClient()

  let computedYear = input.year
  if (computedYear === undefined && input.issue_date) {
    const parsedYear = new Date(input.issue_date).getFullYear()
    if (!isNaN(parsedYear)) {
      computedYear = parsedYear
    }
  }

  const payload: Record<string, any> = {
    ...input,
    updated_at: new Date().toISOString(),
  }
  if (computedYear !== undefined) {
    payload.year = computedYear
  }

  const { data, error } = await supabase
    .from("certificates")
    .update(payload)
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DBCertificate
}

export async function archiveCertificate(id: string): Promise<DBCertificate> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("certificates")
    .update({ archived_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error
  return data as DBCertificate
}

export async function restoreCertificate(id: string): Promise<DBCertificate> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("certificates")
    .update({ archived_at: null, updated_at: new Date().toISOString() })
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

export async function reorderCertificates(ids: string[]): Promise<void> {
  const supabase = await createClient()
  
  // Try invoking Supabase RPC if exists
  const { error: rpcError } = await supabase.rpc("reorder_certificates", { p_ids: ids })
  if (!rpcError) return

  // Fallback: batch update sort_order for each ID
  const updates = ids.map((id, index) =>
    supabase
      .from("certificates")
      .update({ sort_order: index + 1, updated_at: new Date().toISOString() })
      .eq("id", id)
  )
  const results = await Promise.all(updates)
  const firstError = results.find((r) => r.error)?.error
  if (firstError) throw firstError
}

// ---------------- Public Functions ----------------

export function resolveCertificate(c: DBCertificate, language: "en" | "id" = "en"): PublicCertificate {
  const description = c.description
    ? (c.description[language] || c.description["en"] || "")
    : ""

  let computedYear = c.year
  if (c.issue_date) {
    const parsed = new Date(c.issue_date).getFullYear()
    if (!isNaN(parsed)) {
      computedYear = parsed
    }
  }

  return {
    id: c.id,
    title: c.title,
    issuer: c.issuer,
    issueDate: c.issue_date,
    year: computedYear,
    credentialId: c.credential_id || null,
    credentialUrl: c.credential_url || null,
    imageUrl: c.image_url || "",
    pdfUrl: c.pdf_url || null,
    description,
    featured: Boolean(c.featured),
    sortOrder: c.sort_order ?? 0,
    createdAt: c.created_at,
  }
}

export async function getPublicCertificates(language: "en" | "id" = "en"): Promise<PublicCertificate[]> {
  const supabase = await createClient()
  const { data: certificates, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("status", "published")
    .is("archived_at", null)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching public certificates:", error)
    return []
  }

  if (!certificates) return []

  return (certificates as DBCertificate[]).map((c) => resolveCertificate(c, language))
}

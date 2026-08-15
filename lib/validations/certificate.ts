import { z } from "zod"

const bilingualField = z.object({
  en: z.string().default(""),
  id: z.string().default(""),
})

export const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  issuer: z.string().min(1, "Issuer name is required"),
  issue_date: z.string().min(1, "Issue date is required"),
  year: z.number().int().nullable().optional(),
  credential_id: z.string().nullable().optional().default(""),
  credential_url: z.string().url("Invalid credential URL").or(z.literal("")).nullable().optional(),
  image_url: z.string().nullable().optional().default(""),
  pdf_url: z.string().nullable().optional().default(""),
  description: bilingualField.optional().default({ en: "", id: "" }),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
  archived_at: z.string().nullable().optional(),
})

export const reorderCertificatesSchema = z.object({
  ids: z.array(z.string().uuid("Invalid certificate ID format")).min(1, "At least one ID is required"),
})

export type CertificateInput = z.infer<typeof certificateSchema>

import { z } from "zod"

const bilingualField = z.object({
  en: z.string(),
  id: z.string().default(""),
})

export const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  issuer: z.string().min(1, "Issuer name is required"),
  year: z.number().int().nullable().optional(),
  image_url: z.string().min(1, "Certificate image is required"),
  credential_url: z.string().url().or(z.literal("")).nullable().optional(),
  description: bilingualField.optional().default({ en: "", id: "" }),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
})

export type CertificateInput = z.infer<typeof certificateSchema>

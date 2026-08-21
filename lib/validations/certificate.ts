import { z } from "zod"

const bilingualField = z.object({
  en: z.string().default(""),
  id: z.string().default(""),
})

export const certificateSchema = z
  .object({
    title: z
      .union([bilingualField, z.string()])
      .transform((val) => {
        if (typeof val === "string") {
          return { en: val, id: val }
        }
        return {
          en: val.en || val.id || "",
          id: val.id || val.en || "",
        }
      })
      .refine((val) => val.en.trim().length > 0 || val.id.trim().length > 0, {
        message: "Certificate title is required (in English or Indonesian)",
      }),
    issuer: z.string().min(1, "Issuer name is required"),
    issue_date: z.string().min(1, "Issue date is required"),
    year: z.number().int().nullable().optional(),
    credential_id: z.string().nullable().optional().default(""),
    credential_url: z.string().url("Invalid credential URL").or(z.literal("")).nullable().optional(),
    image_url: z.string().nullable().optional().transform((val) => val || ""),
    pdf_url: z.string().nullable().optional().transform((val) => val || ""),
    description: bilingualField.optional().default({ en: "", id: "" }),
    featured: z.boolean().default(false),
    sort_order: z.number().int().default(0),
    status: z.enum(["draft", "published"]).default("draft"),
    archived_at: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      const hasImage = Boolean(data.image_url && data.image_url.trim().length > 0)
      const hasPdf = Boolean(data.pdf_url && data.pdf_url.trim().length > 0)
      return hasImage || hasPdf
    },
    {
      message: "Harap upload file sertifikat (Image atau PDF) terlebih dahulu!",
      path: ["image_url"],
    }
  )

export const reorderCertificatesSchema = z.object({
  ids: z.array(z.string().uuid("Invalid certificate ID format")).min(1, "At least one ID is required"),
})

export type CertificateInput = z.infer<typeof certificateSchema>

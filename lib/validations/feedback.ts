import { z } from "zod"

export const feedbackSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  role: z.string().min(1, "Role / Jabatan wajib diisi"),
  company: z.string().optional().default(""),
  avatar_url: z.string().optional().default(""),
  quote: z.string().min(1, "Kutipan testimonial wajib diisi"),
  feedback: z.string().optional().default(""),
  token: z.string().min(1, "Token akses diperlukan"),
})

export type FeedbackInput = z.infer<typeof feedbackSchema>

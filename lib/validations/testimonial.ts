import { z } from "zod"

const bilingualField = z.object({
  en: z.string().default(""),
  id: z.string().default(""),
})

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().nullable().optional().default(""),
  avatar_url: z.string().nullable().optional().default(""),
  quote: bilingualField.optional().default({ en: "", id: "" }),
  feedback: z.string().optional().default(""),
  source: z.enum(["admin", "client"]).default("admin"),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  status: z.enum(["draft", "published", "pending"]).default("draft"),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>

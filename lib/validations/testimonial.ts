import { z } from "zod"

const bilingualField = z.object({
  en: z.string(),
  id: z.string().default(""),
})

export const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().nullable().optional(),
  avatar_url: z.string().nullable().optional(),
  quote: bilingualField.optional().default({ en: "", id: "" }),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>

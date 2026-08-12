import { z } from "zod"

export const techStackSchema = z.object({
  name: z.string().min(1, "Tech stack name is required"),
  icon_url: z.string().nullable().optional().default(""),
  color: z.string().nullable().optional().default(""),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
})

export type TechStackInput = z.infer<typeof techStackSchema>

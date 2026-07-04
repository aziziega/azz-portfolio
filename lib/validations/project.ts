import { z } from "zod"

const bilingualField = z.object({
  en: z.string(),
  id: z.string().default(""),
})

const bilingualItem = z.object({
  en: z.string().min(1, "English text is required"),
  id: z.string().default(""),
})

export const projectSchema = z.object({
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
  year: z.number().int().nullable().optional(),
  title: bilingualField.refine(v => v.en.length > 0, "English title is required"),
  tagline: bilingualField.refine(v => v.en.length > 0, "English tagline is required"),
  description: bilingualField.refine(v => v.en.length > 0, "English description is required"),
  category: bilingualField,
  duration: bilingualField,
  role: bilingualField,
  client: bilingualField,
  team_size: bilingualField,
  problem: bilingualField,
  solution: bilingualField,
  features: z.array(bilingualItem).default([]),
  challenges: z.array(bilingualItem).default([]),
  outcomes: z.array(bilingualItem).default([]),
  design_process: z.array(bilingualItem).default([]),
  lessons_learned: z.array(bilingualItem).default([]),
  tech_stack: z.array(z.string()).default([]),
  live_url: z.string().url().or(z.literal("")).nullable().optional(),
  github_url: z.string().url().or(z.literal("")).nullable().optional(),
  case_study_url: z.string().url().or(z.literal("")).nullable().optional(),
  thumbnail_url: z.string().nullable().optional(),
  seo_title: bilingualField.optional(),
  seo_description: bilingualField.optional(),
})

export type ProjectInput = z.infer<typeof projectSchema>

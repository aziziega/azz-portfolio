export interface FilterState {
  categories: string[]
  years: number[]
  techStacks: string[]
}

export function groupProjectsByYear<T extends { year?: number | string }>(
  projects: T[]
): Record<number, T[]> {
  const grouped: Record<number, T[]> = {}
  projects.forEach((project) => {
    const yr = Number(project.year) || new Date().getFullYear()
    if (!grouped[yr]) {
      grouped[yr] = []
    }
    grouped[yr].push(project)
  })
  return grouped
}

export function filterProjects<T extends {
  title?: string
  tagline?: string
  description?: string
  category?: string
  year?: number | string
  techStack?: string[]
}>(
  projects: T[],
  searchQuery: string,
  filters: FilterState
): T[] {
  const query = searchQuery.trim().toLowerCase()

  return projects.filter((project) => {
    // 1. Search Query Filter (Title, Tagline, Description, Category, TechStack)
    if (query) {
      const matchTitle = project.title?.toLowerCase().includes(query)
      const matchTagline = project.tagline?.toLowerCase().includes(query)
      const matchDesc = project.description?.toLowerCase().includes(query)
      const matchCategory = project.category?.toLowerCase().includes(query)
      const matchTech = project.techStack?.some((t) => t.toLowerCase().includes(query))

      if (!matchTitle && !matchTagline && !matchDesc && !matchCategory && !matchTech) {
        return false
      }
    }

    // 2. Categories Filter (OR inside category group)
    if (filters.categories.length > 0) {
      if (!project.category || !filters.categories.includes(project.category)) {
        return false
      }
    }

    // 3. Years Filter (OR inside year group)
    if (filters.years.length > 0) {
      const pYear = Number(project.year)
      if (!filters.years.includes(pYear)) {
        return false
      }
    }

    // 4. Tech Stacks Filter (OR inside techStack group)
    if (filters.techStacks.length > 0) {
      const pTech = project.techStack || []
      const hasMatchTech = filters.techStacks.some((t) => pTech.includes(t))
      if (!hasMatchTech) {
        return false
      }
    }

    return true
  })
}

export function formatProjectDate(
  project: {
    publishedAt?: string
    createdAt?: string
    created_at?: string
    published_at?: string
    date?: string
    year?: number | string
  },
  language: "en" | "id" = "id"
): string {
  const dateStr =
    project.publishedAt ||
    project.published_at ||
    project.createdAt ||
    project.created_at ||
    project.date

  if (dateStr) {
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    }
  }

  return `${project.year || new Date().getFullYear()}`
}

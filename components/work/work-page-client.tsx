"use client"

import { useEffect, useMemo, useState } from "react"
import { useLanguage } from "@/contexts/language-contexts"
import WorkHeader, { ViewMode } from "@/components/work/work-header"
import WorkFilters from "@/components/work/work-filters"
import WorkGridView from "@/components/work/work-grid-view"
import WorkTimelineView from "@/components/work/work-timeline-view"
import WorkFooterCTA from "@/components/work/work-footer-cta"
import { filterProjects, FilterState } from "@/lib/work-utils"

export default function WorkPageClient() {
  const { language } = useLanguage()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    years: [],
    techStacks: [],
  })

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      try {
        const res = await fetch(`/api/projects?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          setProjects(data.projects || [])
        }
      } catch (err) {
        console.error("Failed to fetch projects:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [language])

  // Derive filter options from projects data
  const availableCategories = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return Array.from(set).sort()
  }, [projects])

  const availableYears = useMemo(() => {
    const set = new Set<number>()
    projects.forEach((p) => {
      const yr = Number(p.year)
      if (yr) set.add(yr)
    })
    return Array.from(set).sort((a, b) => b - a)
  }, [projects])

  const availableTech = useMemo(() => {
    const set = new Set<string>()
    projects.forEach((p) => {
      if (Array.isArray(p.techStack)) {
        p.techStack.forEach((t: string) => set.add(t))
      }
    })
    return Array.from(set).sort()
  }, [projects])

  // Filter projects client-side
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, searchQuery, filters)
  }, [projects, searchQuery, filters])

  // Count active filters
  const activeFilterCount =
    filters.categories.length + filters.years.length + filters.techStacks.length

  // Handlers
  const handleCategoryToggle = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleYearToggle = (year: number) => {
    setFilters((prev) => ({
      ...prev,
      years: prev.years.includes(year)
        ? prev.years.filter((y) => y !== year)
        : [...prev.years, year],
    }))
  }

  const handleTechToggle = (tech: string) => {
    setFilters((prev) => ({
      ...prev,
      techStacks: prev.techStacks.includes(tech)
        ? prev.techStacks.filter((t) => t !== tech)
        : [...prev.techStacks, tech],
    }))
  }

  const handleClearAll = () => {
    setFilters({
      categories: [],
      years: [],
      techStacks: [],
    })
    setSearchQuery("")
  }

  return (
    <main className="work-list-main">
      {/* Header with Hero, Search Bar & Grid/Timeline Toggle */}
      <WorkHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Body (2 Columns Layout: Filters Sidebar + Content Grid/Timeline) */}
      <section className="work-content-section">
        <div className="work-body-grid">
          {/* Sidebar Filter */}
          <div className="work-sidebar-col">
            <WorkFilters
              filters={filters}
              availableCategories={availableCategories}
              availableYears={availableYears}
              availableTech={availableTech}
              onCategoryToggle={handleCategoryToggle}
              onYearToggle={handleYearToggle}
              onTechToggle={handleTechToggle}
              onClearAll={handleClearAll}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Main Content (Grid or Timeline) */}
          <div className="work-main-col">
            {loading ? (
              <div className="work-loading-state">
                <div className="work-loading-spinner" />
                <p>Loading projects...</p>
              </div>
            ) : viewMode === "grid" ? (
              <WorkGridView projects={filteredProjects} />
            ) : (
              <WorkTimelineView projects={filteredProjects} />
            )}
          </div>
        </div>
      </section>

      {/* Simple White Footer CTA Section */}
      <WorkFooterCTA />
    </main>
  )
}

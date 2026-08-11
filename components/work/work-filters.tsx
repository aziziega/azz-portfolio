"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Filter, X, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-contexts"
import { FilterState } from "@/lib/work-utils"

interface WorkFiltersProps {
  filters: FilterState
  availableCategories: string[]
  availableYears: number[]
  availableTech: string[]
  onCategoryToggle: (category: string) => void
  onYearToggle: (year: number) => void
  onTechToggle: (tech: string) => void
  onClearAll: () => void
  activeFilterCount: number
}

export default function WorkFilters({
  filters,
  availableCategories,
  availableYears,
  availableTech,
  onCategoryToggle,
  onYearToggle,
  onTechToggle,
  onClearAll,
  activeFilterCount,
}: WorkFiltersProps) {
  const { t } = useLanguage()
  const [isOpenMobile, setIsOpenMobile] = useState(false)

  return (
    <aside className="work-filters-aside">
      {/* Mobile Filter Trigger Button */}
      <div className="work-filters-mobile-toggle">
        <Button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          variant="outline"
          className="work-mobile-btn"
        >
          <Filter className="w-4 h-4 mr-2" />
          <span>{t("work.filter.title") || "Filter"}</span>
          {activeFilterCount > 0 && (
            <Badge className="work-filter-badge-count ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Main Filter Panel */}
      <div className={`work-filters-panel ${isOpenMobile ? "is-open-mobile" : ""}`}>
        <div className="work-filters-card">
          {/* Header */}
          <div className="work-filters-header">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <h3 className="work-filters-title">
                {t("work.filter.title") || "Filter"}
              </h3>
              {activeFilterCount > 0 && (
                <Badge className="work-filter-badge-count">
                  {activeFilterCount}
                </Badge>
              )}
            </div>

            {activeFilterCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="work-filters-clear-btn"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                {t("work.filter.clear") || "Clear All"}
              </Button>
            )}
          </div>

          {/* Group 1: Category */}
          {availableCategories.length > 0 && (
            <div className="work-filter-group">
              <h4 className="work-filter-group-title">
                {t("work.filter.categories") || "Categories"}
              </h4>
              <div className="work-filter-chips">
                {availableCategories.map((cat) => {
                  const isSelected = filters.categories.includes(cat)
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => onCategoryToggle(cat)}
                      className={`work-chip ${isSelected ? "is-selected" : ""}`}
                    >
                      {cat}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Group 2: Year */}
          {availableYears.length > 0 && (
            <div className="work-filter-group">
              <h4 className="work-filter-group-title">
                {t("work.filter.years") || "Year"}
              </h4>
              <div className="work-filter-chips">
                {availableYears.map((year) => {
                  const isSelected = filters.years.includes(year)
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => onYearToggle(year)}
                      className={`work-chip ${isSelected ? "is-selected" : ""}`}
                    >
                      {year}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Group 3: Tech Stack */}
          {availableTech.length > 0 && (
            <div className="work-filter-group">
              <h4 className="work-filter-group-title">
                {t("work.filter.tech") || "Tech Stack"}
              </h4>
              <div className="work-filter-tech-list">
                {availableTech.map((tech) => {
                  const isSelected = filters.techStacks.includes(tech)
                  return (
                    <label key={tech} className="work-tech-checkbox-label">
                      <div className={`work-checkbox ${isSelected ? "checked" : ""}`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onTechToggle(tech)}
                        className="sr-only"
                      />
                      <span className="work-tech-name">{tech}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { ArrowLeft, Search, Grid3x3, List } from "lucide-react"
import { useLanguage } from "@/contexts/language-contexts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type ViewMode = "grid" | "timeline"

interface WorkHeaderProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function WorkHeader({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchChange,
}: WorkHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="work-header-container">
      <div className="work-header-inner">
        {/* Back Link */}
        <Link href="/" className="work-header-back-link">
          <ArrowLeft size={18} />
          <span>{t("project.nav.back") || "← Back to Home"}</span>
        </Link>

        {/* Hero Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="work-header-hero"
        >
          <span className="work-header-badge">
            {t("work.title") || "FEATURED WORK"}
          </span>
          <h1 className="work-header-title">
            {t("work.selectedWorks")}
          </h1>
          <p className="work-header-subtitle">
            {t("work.page.description")}
          </p>
        </motion.div>

        {/* Search Bar & View Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="work-header-controls"
        >
          {/* Search Input */}
          <div className="work-search-wrapper">
            <Search className="work-search-icon" />
            <Input
              type="text"
              placeholder={t("work.filter.searchPlaceholder") || "Search projects..."}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="work-search-input"
            />
          </div>

          {/* Toggle View Mode */}
          <div className="work-view-toggle">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className={`work-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span>{t("work.view.grid") || "Grid"}</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange("timeline")}
              className={`work-toggle-btn ${viewMode === "timeline" ? "active" : ""}`}
            >
              <List className="w-4 h-4" />
              <span>{t("work.view.timeline") || "Timeline"}</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

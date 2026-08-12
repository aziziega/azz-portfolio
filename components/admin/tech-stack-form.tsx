"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type TechStackInput } from "@/lib/validations/tech-stack"
import ImageUploader from "./image-uploader"

interface TechStackFormProps {
  initialData?: any
  id?: string
}

export default function TechStackForm({ initialData, id }: TechStackFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form States
  const [name, setName] = useState(initialData?.name || "")
  const [iconUrl, setIconUrl] = useState(initialData?.icon_url || "")
  const [color, setColor] = useState(initialData?.color || "")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order || 0)
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!name || name.trim() === "") {
        throw new Error("Tech stack name is required.")
      }

      const payload: TechStackInput = {
        name,
        icon_url: iconUrl || null,
        color: color || null,
        featured,
        sort_order: Number(sortOrder),
        status,
      }

      const endpoint = id ? `/api/admin/tech-stacks/${id}` : "/api/admin/tech-stacks"
      const response = await fetch(endpoint, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to save tech stack")
      }

      router.push("/admin/tech-stack")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-form-grid">
        {/* Main Column */}
        <div className="admin-form-main">
          {/* Tech Name */}
          <div className="admin-form-group">
            <label className="admin-label">Tech Stack Name *</label>
            <input
              type="text"
              className="admin-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Next.js, React, PostgreSQL"
              required
            />
          </div>

          {/* Icon Image Uploader */}
          <div className="admin-form-group">
            <ImageUploader
              label="Icon / Logo"
              value={iconUrl}
              onChange={(url) => setIconUrl(url)}
              bucketName="site-assets"
              projectSlug="tech"
            />
            <p className="admin-help-text">
              Upload an SVG/PNG icon or paste a direct CDN URL (e.g. devicon URL). Leave empty to use initial fallback.
            </p>
          </div>

          {/* Accent Color */}
          <div className="admin-form-group">
            <label className="admin-label">Accent Color (Hex)</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={color || "#2563eb"}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: "40px", height: "38px", padding: "2px", border: "1px solid var(--border)", borderRadius: "6px", cursor: "pointer" }}
              />
              <input
                type="text"
                className="admin-input"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. #61DAFB or #3178C6"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="admin-form-sidebar">
          {/* Status */}
          <div className="admin-card">
            <h4 className="admin-card-title">Publish Status</h4>
            <div className="admin-form-group">
              <select
                className="admin-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Visible)</option>
              </select>
            </div>
          </div>

          {/* Display & Order Options */}
          <div className="admin-card">
            <h4 className="admin-card-title">Display Options</h4>
            
            <div className="admin-form-group">
              <label className="admin-label">Sort Order</label>
              <input
                type="number"
                className="admin-input"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-checkbox-label">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span>Featured Tech Stack</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="admin-form-actions">
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => router.back()}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : id ? "Update Tech Stack" : "Create Tech Stack"}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

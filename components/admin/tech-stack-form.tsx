"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type TechStackInput } from "@/lib/validations/tech-stack"
import ImageUploader from "./image-uploader"

interface TechStackFormProps {
  initialData?: any
  id?: string
}

const PRESET_COLORS = [
  { name: "Next.js", hex: "#000000" },
  { name: "React", hex: "#61DAFB" },
  { name: "TypeScript", hex: "#3178C6" },
  { name: "Tailwind", hex: "#06B6D4" },
  { name: "Supabase", hex: "#3ECF8E" },
  { name: "Node.js", hex: "#339933" },
  { name: "PostgreSQL", hex: "#4169E1" },
  { name: "Git", hex: "#F05032" },
  { name: "Docker", hex: "#2496ED" },
  { name: "OpenAI", hex: "#10A37F" },
]

export default function TechStackForm({ initialData, id }: TechStackFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [toastMsg, setToastMsg] = useState("")
  const [toastError, setToastError] = useState(false)

  const showToast = (message: string, isErr = true) => {
    setToastMsg(message)
    setToastError(isErr)
    setTimeout(() => {
      setToastMsg("")
    }, 4000)
  }

  // Form States
  const [name, setName] = useState(initialData?.name || "")
  const [iconUrl, setIconUrl] = useState(initialData?.icon_url || "")
  const [color, setColor] = useState(initialData?.color || "#3b82f6")
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order ?? 0)
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "published")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || name.trim() === "") {
      const msg = "Tech stack name is required."
      setError(msg)
      showToast(msg, true)
      return
    }

    setLoading(true)

    try {
      const payload: TechStackInput = {
        name: name.trim(),
        icon_url: iconUrl?.trim() || null,
        color: color?.trim() || null,
        featured,
        sort_order: Number(sortOrder) || 0,
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
        throw new Error(data.message || (data.errors ? JSON.stringify(data.errors) : "Failed to save tech stack"))
      }

      showToast(id ? "Tech stack updated successfully!" : "Tech stack created successfully!", false)
      router.push("/admin/tech-stack")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      const msg = err.message || "An unexpected error occurred"
      setError(msg)
      showToast(msg, true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`admin-toast ${toastError ? "error" : "success"}`}>
          {toastError ? "❌" : "✅"} {toastMsg}
        </div>
      )}

      {error && (
        <div className="admin-alert error" style={{ marginBottom: "20px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Row 1: Basic Info */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Tech Stack Name *</label>
          <input
            type="text"
            className="admin-form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Next.js, React, PostgreSQL, Docker"
            required
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status</label>
          <select
            className="admin-form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
          >
            <option value="published">Published (Visible on site)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>
      </div>

      {/* Row 2: Visuals & Ordering */}
      <div className="admin-form-row">
        {/* Accent Color Picker */}
        <div className="admin-form-group">
          <label className="admin-form-label">Accent / Brand Color (Hex)</label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="color"
              value={color || "#3b82f6"}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: "44px",
                height: "42px",
                padding: "2px",
                border: "1px solid var(--admin-border-strong)",
                borderRadius: "10px",
                cursor: "pointer",
                background: "#ffffff",
              }}
            />
            <input
              type="text"
              className="admin-form-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. #61DAFB or #3178C6"
              style={{ flex: 1 }}
            />
            {color && (
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: color,
                  border: "2px solid #ffffff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  flexShrink: 0,
                }}
                title={color}
              />
            )}
          </div>

          {/* Quick Presets */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
            <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, alignSelf: "center", marginRight: "4px" }}>
              Presets:
            </span>
            {PRESET_COLORS.map((p) => (
              <button
                key={p.hex}
                type="button"
                onClick={() => setColor(p.hex)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "3px 8px",
                  fontSize: "11px",
                  borderRadius: "6px",
                  border: color.toLowerCase() === p.hex.toLowerCase() ? `1.5px solid ${p.hex}` : "1px solid #e2e8f0",
                  background: color.toLowerCase() === p.hex.toLowerCase() ? "#f0f9ff" : "#ffffff",
                  color: "#334155",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: p.hex,
                  }}
                />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Order */}
        <div className="admin-form-group">
          <label className="admin-form-label">Sort Order</label>
          <input
            type="number"
            className="admin-form-input"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            placeholder="0"
          />
          <small style={{ color: "#64748b", marginTop: "4px" }}>
            Lower numbers appear first in the tech stack grid.
          </small>
        </div>
      </div>

      {/* Featured Switch */}
      <div className="admin-form-group">
        <div style={{ display: "flex", gap: "12px", alignItems: "center", padding: "8px 0" }}>
          <label className="admin-toggle">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <span className="admin-toggle-slider" />
          </label>
          <div>
            <span className="admin-form-label" style={{ margin: 0, display: "block" }}>
              Pin as Featured Tech Stack
            </span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Featured technologies will be highlighted prominently on the landing page.
            </span>
          </div>
        </div>
      </div>

      {/* Icon Image Uploader */}
      <div style={{ marginTop: "8px" }}>
        <ImageUploader
          label="Icon / Logo (Optional)"
          value={iconUrl}
          onChange={(url) => setIconUrl(url)}
          bucket="site-assets"
          folder="tech"
        />
        <p style={{ fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
          Upload an SVG/PNG icon or enter a direct CDN URL (e.g. SimpleIcons or Devicon).
        </p>
      </div>

      {/* Form Actions */}
      <div className="admin-form-actions" style={{ marginTop: "24px" }}>
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={() => router.push("/admin/tech-stack")}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? "Saving..." : id ? "Update Tech Stack" : "Create Tech Stack"}
        </button>
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploader from "@/components/admin/image-uploader"
import LocalizedField from "@/components/admin/localized-field"
import { ArrowLeft, Save } from "lucide-react"

interface TestimonialFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function TestimonialForm({ initialData, isEditing = false }: TestimonialFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState(initialData?.name || "")
  const [role, setRole] = useState(initialData?.role || "")
  const [company, setCompany] = useState(initialData?.company || "")
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar_url || "")
  const [quoteEn, setQuoteEn] = useState(initialData?.quote?.en || "")
  const [quoteId, setQuoteId] = useState(initialData?.quote?.id || "")
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order ?? 0)
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "published")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const payload = {
        name,
        role,
        company: company.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        quote: {
          en: quoteEn,
          id: quoteId,
        },
        rating: null,
        featured,
        sort_order: Number(sortOrder) || 0,
        status,
      }

      const url = isEditing
        ? `/api/admin/testimonials/${initialData.id}`
        : "/api/admin/testimonials"

      const method = isEditing ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to save testimonial")
      }

      router.push("/admin/testimonials")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "An error occurred while saving")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && (
        <div className="admin-alert admin-alert-danger" style={{ marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div className="admin-grid-2">
        {/* Main Details */}
        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "20px" }}>
            Client Information
          </h3>

          <div className="admin-form-group">
            <label className="admin-label Required">Client Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="admin-input"
            />
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label Required">Role / Title</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Product Manager"
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Company Name (Optional)</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Nexus Tech"
                className="admin-input"
              />
            </div>
          </div>

          {/* Bilingual Quote */}
          <div className="admin-form-group" style={{ marginTop: "16px" }}>
            <label className="admin-label Required">Testimonial Quote</label>
            <LocalizedField
              type="textarea"
              label="Quote"
              valueEn={quoteEn}
              valueId={quoteId}
              onChangeEn={setQuoteEn}
              onChangeId={setQuoteId}
              placeholderEn="Write testimonial quote in English..."
              placeholderId="Tulis kutipan testimoni dalam Bahasa Indonesia..."
            />
          </div>
        </div>

        {/* Media & Settings */}
        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "20px" }}>
            Avatar & Configuration
          </h3>

          {/* Avatar Upload */}
          <div className="admin-form-group">
            <label className="admin-label">Avatar Photo (Optional)</label>
            <ImageUploader
              value={avatarUrl}
              onChange={(url) => setAvatarUrl(url)}
              folder="testimonials"
            />
            <p className="admin-help-text">
              If left empty, a placeholder with client's initials will be shown automatically.
            </p>
          </div>

          <div className="admin-grid-2" style={{ marginTop: "20px" }}>
            <div className="admin-form-group">
              <label className="admin-label">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Publish Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="admin-select"
                style={{ width: "100%" }}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group" style={{ marginTop: "16px" }}>
            <label className="admin-checkbox-label">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="admin-checkbox"
              />
              <span>Featured Testimonial</span>
            </label>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="admin-form-actions" style={{ marginTop: "24px" }}>
        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
          className="admin-btn admin-btn-secondary"
        >
          <ArrowLeft size={16} /> Back to List
        </button>

        <button type="submit" disabled={loading} className="admin-btn admin-btn-primary">
          <Save size={16} /> {loading ? "Saving..." : isEditing ? "Update Testimonial" : "Create Testimonial"}
        </button>
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ImageUploader from "@/components/admin/image-uploader"
import LocalizedField from "@/components/admin/localized-field"
import { ArrowLeft, Save, Lock, UserCheck, Shield } from "lucide-react"

interface TestimonialFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function TestimonialForm({ initialData, isEditing = false }: TestimonialFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState("")
  const [toastError, setToastError] = useState(false)

  const showToast = (msg: string, isErr = false) => {
    setToastMsg(msg)
    setToastError(isErr)
    setTimeout(() => setToastMsg(""), 4000)
  }

  const [name, setName] = useState(initialData?.name || "")
  const [role, setRole] = useState(initialData?.role || "")
  const [company, setCompany] = useState(initialData?.company || "")
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar_url || "")
  const [quoteEn, setQuoteEn] = useState(initialData?.quote?.en || initialData?.quote?.id || "")
  const [quoteId, setQuoteId] = useState(initialData?.quote?.id || initialData?.quote?.en || "")
  const [feedback, setFeedback] = useState(initialData?.feedback || "")
  const [source, setSource] = useState<"admin" | "client">(initialData?.source || "admin")
  const [featured, setFeatured] = useState(initialData?.featured ?? false)
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order ?? 0)
  const [status, setStatus] = useState<"draft" | "published" | "pending">(initialData?.status || "published")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!name.trim()) {
      setError("Client name is required.")
      showToast("Client name is required.", true)
      setLoading(false)
      return
    }

    if (!role.trim()) {
      setError("Role / Title is required.")
      showToast("Role / Title is required.", true)
      setLoading(false)
      return
    }

    if (!quoteEn.trim() && !quoteId.trim()) {
      setError("Testimonial quote is required (in English or Indonesian).")
      showToast("Testimonial quote is required.", true)
      setLoading(false)
      return
    }

    try {
      const payload = {
        name: name.trim(),
        role: role.trim(),
        company: company.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        quote: {
          en: quoteEn.trim() || quoteId.trim(),
          id: quoteId.trim() || quoteEn.trim(),
        },
        feedback: feedback.trim(),
        source,
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

      showToast(isEditing ? "Testimonial updated successfully!" : "Testimonial created successfully!", false)
      router.push("/admin/testimonials")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      const msg = err.message || "An error occurred while saving"
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

      {/* Header Info with Source Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--admin-border)", paddingBottom: "14px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--admin-text)", margin: 0 }}>
            {isEditing ? "Edit Testimonial Details" : "Create New Testimonial"}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--admin-text-secondary)", margin: 0, marginTop: "4px" }}>
            Configure client identity, quote, and publishing settings.
          </p>
        </div>
        <div>
          {source === "client" ? (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                background: "#e0f2fe",
                color: "#0369a1",
              }}
            >
              <UserCheck size={14} /> Client Submission
            </span>
          ) : (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 700,
                background: "#f1f5f9",
                color: "#475569",
              }}
            >
              <Shield size={14} /> Admin Input
            </span>
          )}
        </div>
      </div>

      {/* Row 1: Name & Role */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Client Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alex Rivera"
            className="admin-form-input"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Role / Title *</label>
          <input
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Senior Product Manager"
            className="admin-form-input"
          />
        </div>
      </div>

      {/* Row 2: Company & Status */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Company / Brand (Optional)</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Nexus Tech"
            className="admin-form-input"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Publish Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published" | "pending")}
            className="admin-form-select"
          >
            <option value="published">Published (Visible on site)</option>
            <option value="pending">Pending Review (Waiting approval)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>
      </div>

      {/* Row 3: Bilingual Quote */}
      <LocalizedField
        type="textarea"
        label="Testimonial Quote"
        valueEn={quoteEn}
        valueId={quoteId}
        onChangeEn={setQuoteEn}
        onChangeId={setQuoteId}
        placeholderEn="Write testimonial quote in English..."
        placeholderId="Tulis kutipan testimoni dalam Bahasa Indonesia..."
        required
      />

      {/* Row 4: Private Feedback / Kritik & Saran */}
      <div
        style={{
          background: "rgba(245, 158, 11, 0.04)",
          border: "1px dashed rgba(245, 158, 11, 0.4)",
          borderRadius: "14px",
          padding: "18px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label className="admin-form-label" style={{ display: "flex", alignItems: "center", gap: "6px", margin: 0 }}>
            <Lock size={14} className="text-amber-500" />
            <span>Kritik & Saran dari Client (Private / Internal Admin)</span>
          </label>
          <span style={{ fontSize: "11px", fontWeight: 700, background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "6px" }}>
            🔒 Private Only
          </span>
        </div>
        <textarea
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Masukan, kritik, atau saran dari client untuk evaluasi internal..."
          className="admin-form-textarea"
          style={{ minHeight: "80px" }}
        />
        <small style={{ color: "#64748b", marginTop: "6px", display: "block" }}>
          Kritik & saran ini hanya dapat dilihat oleh admin dan tidak akan pernah ditampilkan di landing page.
        </small>
      </div>

      {/* Row 5: Avatar Uploader */}
      <div className="admin-form-group">
        <ImageUploader
          label="Avatar / Foto Client (Opsional)"
          value={avatarUrl}
          onChange={(url) => setAvatarUrl(url)}
          bucket="site-assets"
          folder="testimonials"
        />
        <small style={{ color: "#64748b", marginTop: "4px" }}>
          Jika dikosongkan, inisial nama client otomatis dijadikan avatar di landing page.
        </small>
      </div>

      {/* Row 6: Sort Order & Featured Toggle */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="admin-form-input"
            placeholder="0"
          />
          <small style={{ color: "#64748b", marginTop: "4px" }}>
            Nomor lebih kecil muncul lebih awal di carousel landing page.
          </small>
        </div>

        <div className="admin-form-group">
          <div style={{ display: "flex", gap: "12px", alignItems: "center", paddingTop: "28px" }}>
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
                Pin as Featured Testimonial
              </span>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Highlight testimonial di posisi utama.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="admin-form-actions" style={{ marginTop: "16px" }}>
        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
          className="admin-btn admin-btn-secondary"
          disabled={loading}
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

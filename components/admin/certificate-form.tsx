"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type CertificateInput } from "@/lib/validations/certificate"
import LocalizedField from "./localized-field"
import ImageUploader from "./image-uploader"

interface CertificateFormProps {
  initialData?: any
  id?: string
}

export default function CertificateForm({ initialData, id }: CertificateFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form States
  const [title, setTitle] = useState(initialData?.title || "")
  const [issuer, setIssuer] = useState(initialData?.issuer || "")
  const [year, setYear] = useState<number | null>(initialData?.year || new Date().getFullYear())
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "")
  const [credentialUrl, setCredentialUrl] = useState(initialData?.credential_url || "")
  const [description, setDescription] = useState(initialData?.description || { en: "", id: "" })
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order || 0)
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (!imageUrl || imageUrl.trim() === "") {
        throw new Error("Certificate image is required. Please upload or specify an image URL.")
      }

      const payload: CertificateInput = {
        title,
        issuer,
        year: year ? Number(year) : null,
        image_url: imageUrl,
        credential_url: credentialUrl || null,
        description,
        featured,
        sort_order: Number(sortOrder),
        status,
      }

      const endpoint = id ? `/api/admin/certificates/${id}` : "/api/admin/certificates"
      const response = await fetch(endpoint, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to save certificate")
      }

      router.push("/admin/certificates")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      {error && (
        <div className="admin-alert error" style={{ marginBottom: "20px" }}>
          ⚠️ {error}
        </div>
      )}

      {/* Basic Meta Row */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Certificate Title *</label>
          <input
            type="text"
            className="admin-form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. AWS Certified Cloud Practitioner"
            required
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Issuer Organization *</label>
          <input
            type="text"
            className="admin-form-input"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            placeholder="e.g. Amazon Web Services"
            required
          />
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Year Issued</label>
          <input
            type="number"
            className="admin-form-input"
            value={year || ""}
            onChange={(e) => setYear(e.target.value ? Number(e.target.value) : null)}
            placeholder="e.g. 2024"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Status</label>
          <select
            className="admin-form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Sort Order (integer)</label>
          <input
            type="number"
            className="admin-form-input"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Credential Verification URL (Optional)</label>
          <input
            type="url"
            className="admin-form-input"
            value={credentialUrl}
            onChange={(e) => setCredentialUrl(e.target.value)}
            placeholder="https://www.credly.com/badges/..."
          />
        </div>
      </div>

      <div className="admin-form-group" style={{ flexDirection: "row", gap: "10px", alignItems: "center" }}>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <span className="admin-toggle-slider" />
        </label>
        <span className="admin-form-label">Pin certificate as Featured</span>
      </div>

      {/* Image Upload */}
      <ImageUploader
        label="Certificate Image *"
        value={imageUrl}
        onChange={(url) => setImageUrl(url)}
        bucketName="site-assets"
        projectSlug="certificates"
      />

      {/* Bilingual Description for Lightbox Caption */}
      <LocalizedField
        label="Description / Caption (Optional - Lightbox Caption)"
        valueEn={description.en}
        valueId={description.id}
        onChangeEn={(val) => setDescription({ ...description, en: val })}
        onChangeId={(val) => setDescription({ ...description, id: val })}
        type="textarea"
        placeholderEn="Brief notes about what this certification covers..."
        placeholderId="Catatan singkat tentang cakupan sertifikasi ini..."
      />

      {/* Form Action Buttons */}
      <div className="admin-form-actions" style={{ marginTop: "24px" }}>
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={() => router.push("/admin/certificates")}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? "Saving..." : id ? "Update Certificate" : "Create Certificate"}
        </button>
      </div>
    </form>
  )
}

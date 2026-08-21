"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { type CertificateInput } from "@/lib/validations/certificate"
import LocalizedField from "./localized-field"
import CertificateFileUploader from "./certificate-file-uploader"

interface CertificateFormProps {
  initialData?: any
  id?: string
}

export default function CertificateForm({ initialData, id }: CertificateFormProps) {
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

  // Format initial title (supports both object { en, id } and legacy plain string)
  const initialTitle = typeof initialData?.title === "object" && initialData?.title !== null
    ? { en: initialData.title.en || "", id: initialData.title.id || "" }
    : typeof initialData?.title === "string"
      ? initialData.title.startsWith("{")
        ? (() => {
            try {
              const p = JSON.parse(initialData.title)
              return { en: p.en || "", id: p.id || "" }
            } catch {
              return { en: initialData.title, id: initialData.title }
            }
          })()
        : { en: initialData.title || "", id: initialData.title || "" }
      : { en: "", id: "" }

  // Form States
  const [title, setTitle] = useState(initialTitle)
  const [issuer, setIssuer] = useState(initialData?.issuer || "")
  
  // Format initial issue_date or fallback from year
  const initialIssueDate = initialData?.issue_date 
    ? initialData.issue_date.split("T")[0]
    : initialData?.year 
      ? `${initialData.year}-01-01`
      : new Date().toISOString().split("T")[0]

  const [issueDate, setIssueDate] = useState(initialIssueDate)
  const [credentialId, setCredentialId] = useState(initialData?.credential_id || "")
  const [credentialUrl, setCredentialUrl] = useState(initialData?.credential_url || "")
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "")
  const [pdfUrl, setPdfUrl] = useState(initialData?.pdf_url || "")
  const [description, setDescription] = useState(initialData?.description || { en: "", id: "" })
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order || 0)
  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Check certificate files requirement (at least Image or PDF)
    const hasImage = Boolean(imageUrl && imageUrl.trim().length > 0)
    const hasPdf = Boolean(pdfUrl && pdfUrl.trim().length > 0)

    if (!hasImage && !hasPdf) {
      showToast("Harap upload file sertifikat (Image atau PDF) terlebih dahulu!", true)
      setError("Harap upload file sertifikat berupa Image atau PDF terlebih dahulu (salah satu wajib diisi).")
      return
    }

    const finalTitleEn = (title.en || "").trim()
    const finalTitleId = (title.id || "").trim()

    if (!finalTitleEn && !finalTitleId) {
      const msg = "Certificate title is required (in English or Indonesian)"
      setError(msg)
      showToast(msg, true)
      return
    }

    if (!issuer.trim()) {
      const msg = "Issuer organization is required"
      setError(msg)
      showToast(msg, true)
      return
    }

    if (!issueDate) {
      const msg = "Issue date is required"
      setError(msg)
      showToast(msg, true)
      return
    }

    setLoading(true)

    try {
      const computedYear = issueDate ? new Date(issueDate).getFullYear() : null

      const payload: CertificateInput = {
        title: {
          en: finalTitleEn || finalTitleId,
          id: finalTitleId || finalTitleEn,
        },
        issuer: issuer.trim(),
        issue_date: issueDate,
        year: computedYear,
        credential_id: credentialId.trim() || null,
        credential_url: credentialUrl.trim() || null,
        image_url: imageUrl.trim() || "",
        pdf_url: pdfUrl.trim() || "",
        description: {
          en: description?.en || "",
          id: description?.id || "",
        },
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
        throw new Error(data.message || (data.errors ? JSON.stringify(data.errors) : "Failed to save certificate"))
      }

      showToast(id ? "Certificate updated successfully!" : "Certificate created successfully!", false)
      router.push("/admin/certificates")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      const message = err.message || "Something went wrong"
      setError(message)
      showToast(message, true)
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

      {/* Title (Bilingual Field: EN & ID) */}
      <LocalizedField
        label="Certificate Title"
        valueEn={title.en}
        valueId={title.id}
        onChangeEn={(val) => setTitle({ ...title, en: val })}
        onChangeId={(val) => setTitle({ ...title, id: val })}
        placeholderEn="e.g. AWS Certified Solutions Architect – Associate"
        placeholderId="e.g. Belajar Membuat Front-End Web untuk Pemula"
        required
      />

      {/* Issuer Organization */}
      <div className="admin-form-group">
        <label className="admin-form-label">Issuer Organization *</label>
        <input
          type="text"
          className="admin-form-input"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          placeholder="e.g. Amazon Web Services, Dicoding, Google Cloud"
          required
        />
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Issue Date *</label>
          <input
            type="date"
            className="admin-form-input"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
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

      {/* Credentials */}
      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Credential ID (Optional)</label>
          <input
            type="text"
            className="admin-form-input"
            value={credentialId}
            onChange={(e) => setCredentialId(e.target.value)}
            placeholder="e.g. AWS-PSA-728190 or CERT-9938"
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

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">Fallback Sort Order</label>
          <input
            type="number"
            className="admin-form-input"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            placeholder="0"
          />
          <small style={{ color: "#64748b", marginTop: "4px" }}>
            Note: Primary order is managed via drag-and-drop in the certificate list.
          </small>
        </div>

        <div className="admin-form-group" style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", paddingTop: "20px" }}>
            <label className="admin-toggle">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span className="admin-toggle-slider" />
            </label>
            <span className="admin-form-label" style={{ margin: 0 }}>Pin certificate as Featured</span>
          </div>
        </div>
      </div>

      {/* Media: Image & PDF Uploaders */}
      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label className="admin-form-label" style={{ marginBottom: "4px" }}>
            Certificate Files <span style={{ color: "#ef4444" }}>* (Wajib upload Image atau PDF)</span>
          </label>
          <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>
            Harap upload setidaknya salah satu berkas: Gambar sertifikat (Image) atau Dokumen (PDF).
          </p>
        </div>

        <CertificateFileUploader
          label="Certificate Image (Preview Card & Lightbox)"
          value={imageUrl}
          onChange={(url) => {
            setImageUrl(url)
            if (url) setError("")
          }}
          type="image"
          folder="images"
        />

        <CertificateFileUploader
          label="Certificate PDF (Original Document Download)"
          value={pdfUrl}
          onChange={(url) => {
            setPdfUrl(url)
            if (url) setError("")
          }}
          type="pdf"
          folder="pdfs"
        />
      </div>

      {/* Bilingual Description for Lightbox Caption */}
      <div style={{ marginTop: "16px" }}>
        <LocalizedField
          label="Description / Caption (Optional - Lightbox Caption)"
          valueEn={description.en}
          valueId={description.id}
          onChangeEn={(val) => setDescription({ ...description, en: val })}
          onChangeId={(val) => setDescription({ ...description, id: val })}
          type="textarea"
          placeholderEn="Brief summary of competencies or topics validated by this certificate..."
          placeholderId="Ringkasan kompetensi atau materi yang divalidasi oleh sertifikasi ini..."
        />
      </div>

      {/* Form Action Buttons */}
      <div className="admin-form-actions" style={{ marginTop: "28px" }}>
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

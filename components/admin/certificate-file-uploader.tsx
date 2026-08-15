"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { UploadCloud, FileText, ExternalLink, Trash2, Eye, RefreshCw } from "lucide-react"

interface CertificateFileUploaderProps {
  label: string
  value: string
  onChange: (url: string) => void
  type: "image" | "pdf"
  folder?: string
}

export default function CertificateFileUploader({
  label,
  value,
  onChange,
  type,
  folder = type === "image" ? "images" : "pdfs",
}: CertificateFileUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"upload" | "url">("upload")
  const [isDragActive, setIsDragActive] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isPdf = type === "pdf"
  const maxSizeBytes = isPdf ? 10 * 1024 * 1024 : 5 * 1024 * 1024 // 10MB for PDF, 5MB for Image
  const allowedTypes = isPdf
    ? ["application/pdf"]
    : ["image/jpeg", "image/png", "image/webp"]

  const validateFile = (file: File): string | null => {
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${isPdf ? "10 MB" : "5 MB"} limit (${(file.size / (1024 * 1024)).toFixed(1)} MB)`
    }
    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith(isPdf ? ".pdf" : "")) {
      return `Invalid file type. Allowed: ${isPdf ? "PDF documents" : "JPEG, PNG, WebP images"}`
    }
    return null
  }

  const uploadFile = async (file: File) => {
    try {
      setError("")
      const validationError = validateFile(file)
      if (validationError) {
        setError(validationError)
        return
      }

      setUploading(true)
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
      const filePath = `${folder}/${Date.now()}_${cleanFileName}`

      const supabase = createClient()
      
      // Try uploading to 'certificates' bucket; fallback to 'site-assets' if certificates bucket is not created
      let bucketToUse = "certificates"
      let { data, error: uploadError } = await supabase.storage
        .from(bucketToUse)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        })

      if (uploadError && (uploadError.message?.includes("bucket not found") || (uploadError as any)?.statusCode === "404")) {
        bucketToUse = "site-assets"
        const fallbackPath = `certificates/${filePath}`
        const fallbackRes = await supabase.storage
          .from(bucketToUse)
          .upload(fallbackPath, file, {
            cacheControl: "3600",
            upsert: true,
          })
        if (fallbackRes.error) throw fallbackRes.error
        filePath.replace(/^/, "")
        const { data: { publicUrl } } = supabase.storage
          .from(bucketToUse)
          .getPublicUrl(fallbackPath)
        onChange(publicUrl)
        return
      }

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from(bucketToUse)
        .getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError(err.message || "Failed to upload file")
    } finally {
      setUploading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    await uploadFile(files[0])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0])
    }
  }

  const getFileNameFromUrl = (url: string) => {
    try {
      const parts = url.split("/")
      return decodeURIComponent(parts[parts.length - 1]) || url
    } catch {
      return url
    }
  }

  return (
    <div className="admin-form-group">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <label className="admin-form-label">{label}</label>
        <div className="admin-lang-tabs">
          <button
            type="button"
            className={`admin-lang-tab ${mode === "upload" ? "active" : ""}`}
            onClick={() => setMode("upload")}
          >
            Upload File
          </button>
          <button
            type="button"
            className={`admin-lang-tab ${mode === "url" ? "active" : ""}`}
            onClick={() => setMode("url")}
          >
            Direct URL
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="url"
            className="admin-form-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={isPdf ? "https://example.com/certificate.pdf" : "https://example.com/certificate.jpg"}
          />
          {value && (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="admin-btn admin-btn-danger admin-btn-sm"
            >
              Clear
            </button>
          )}
        </div>
      ) : (
        <div>
          {value ? (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              gap: "12px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                {isPdf ? (
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "#fee2e2",
                    color: "#dc2626",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <FileText size={20} />
                  </div>
                ) : (
                  <img
                    src={value}
                    alt="Preview"
                    style={{
                      width: "56px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #cbd5e1",
                      flexShrink: 0
                    }}
                  />
                )}
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {getFileNameFromUrl(value)}
                  </p>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: "2px 0 0" }}>
                    {isPdf ? "PDF Document attached" : "Image preview ready"}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <a
                  href={value}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <Eye size={13} /> {isPdf ? "View PDF" : "View"}
                </a>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                  disabled={uploading}
                >
                  <RefreshCw size={13} className={uploading ? "animate-spin" : ""} /> Replace
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirm(true)}
                  className="admin-btn admin-btn-danger admin-btn-sm"
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                >
                  <Trash2 size={13} /> Remove
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`admin-image-upload ${isDragActive ? "drag-active" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              style={{
                cursor: uploading ? "not-allowed" : "pointer",
                padding: "24px 16px",
                border: isDragActive ? "2px dashed #3b82f6" : "2px dashed #cbd5e1",
                borderRadius: "12px",
                background: isDragActive ? "#eff6ff" : "#f8fafc",
                textAlign: "center",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ marginBottom: "8px", color: uploading ? "#3b82f6" : "#64748b" }}>
                {uploading ? (
                  <RefreshCw size={28} className="animate-spin inline-block text-blue-500" />
                ) : isPdf ? (
                  <FileText size={28} className="inline-block text-slate-400" />
                ) : (
                  <UploadCloud size={28} className="inline-block text-slate-400" />
                )}
              </div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: 0 }}>
                {uploading
                  ? `Uploading ${isPdf ? "PDF" : "Image"}...`
                  : isDragActive
                    ? `Drop ${isPdf ? "PDF" : "Image"} here...`
                    : `Click to browse or drag & drop ${isPdf ? "PDF" : "image"} here`}
              </p>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "4px 0 0" }}>
                {isPdf ? "PDF format up to 10 MB" : "JPEG, PNG, WebP up to 5 MB"}
              </p>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
            accept={isPdf ? ".pdf,application/pdf" : "image/jpeg,image/png,image/webp"}
            disabled={uploading}
          />
        </div>
      )}

      {error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#ef4444", fontWeight: 500 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              ⚠️ Remove {isPdf ? "PDF Document" : "Certificate Image"}?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "20px" }}>
              Are you sure you want to remove this attached {isPdf ? "PDF" : "image"}?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => {
                  setShowConfirm(false)
                  onChange("")
                  if (fileInputRef.current) fileInputRef.current.value = ""
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

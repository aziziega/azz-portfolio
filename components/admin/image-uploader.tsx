"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"

interface ImageUploaderProps {
  label: string
  value: string
  onChange: (url: string) => void
  bucketName?: string
  projectSlug?: string
}

export default function ImageUploader({
  label,
  value,
  onChange,
  bucketName = "project-images",
  projectSlug = "general",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"upload" | "url">("upload")
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File) => {
    try {
      setError("")
      const fileExt = file.name.split(".").pop()
      const fileName = `${projectSlug}/${Date.now()}.${fileExt}`

      setUploading(true)

      const supabase = createClient()
      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        })

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName)

      onChange(publicUrl)
    } catch (err: any) {
      console.error("Upload error:", err)
      setError(err.message || "Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    await uploadFile(files[0])
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
      const file = e.dataTransfer.files[0]
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed")
        return
      }
      await uploadFile(file)
    }
  }

  const [showConfirm, setShowConfirm] = useState(false)

  const handleRemove = () => {
    setShowConfirm(true)
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
            Image URL
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            className="admin-form-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /images/project1.png or https://example.com/img.jpg"
          />
          {value && (
            <button
              type="button"
              onClick={handleRemove}
              className="admin-btn admin-btn-danger admin-btn-sm"
            >
              Clear
            </button>
          )}
        </div>
      ) : (
        <div>
          {value ? (
            <div className="admin-image-preview">
              <img src={value} alt="Preview" />
              <div className="admin-image-preview-actions">
                <button
                  type="button"
                  onClick={handleRemove}
                  className="admin-btn admin-btn-danger admin-btn-sm"
                >
                  Delete Image
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
              style={isDragActive ? { borderColor: "var(--admin-blue)", backgroundColor: "#f0f9ff" } : undefined}
            >
              <div className="admin-image-upload-icon">📤</div>
              <p className="admin-image-upload-text">
                {uploading 
                  ? "Uploading..." 
                  : isDragActive 
                    ? "Drop image file here..." 
                    : "Click to browse or drag & drop image here"}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
                accept="image/*"
                disabled={uploading}
              />
            </div>
          )}
        </div>
      )}

      {error && <div className="admin-login-error" style={{ marginTop: "8px" }}>{error}</div>}

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
            animation: "scaleIn 0.2s ease-out",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              ⚠️ Remove Image?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "20px" }}>
              Are you sure you want to remove this image? This action cannot be undone.
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
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

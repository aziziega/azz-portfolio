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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError("")
      const files = e.target.files
      if (!files || files.length === 0) return

      const file = files[0]
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

  const handleRemove = () => {
    onChange("")
    if (fileInputRef.current) fileInputRef.current.value = ""
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
              className="admin-image-upload"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="admin-image-upload-icon">📤</div>
              <p className="admin-image-upload-text">
                {uploading ? "Uploading..." : "Click to browse and upload image"}
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
    </div>
  )
}

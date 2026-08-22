"use client"

import { useState, useRef } from "react"
import { useLanguage } from "@/contexts/language-contexts"
import ImageCropModal from "@/components/feedback/image-crop-modal"
import {
  CheckCircle2,
  Camera,
  Trash2,
  MessageSquareQuote,
  ShieldAlert,
  Sparkles,
  Building2,
  User,
  Briefcase,
  Lock,
  Crop
} from "lucide-react"

interface FeedbackFormProps {
  token: string
}

export default function FeedbackForm({ token }: FeedbackFormProps) {
  const { language } = useLanguage()
  const isId = language === "id"

  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [company, setCompany] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [quote, setQuote] = useState("")
  const [feedback, setFeedback] = useState("")

  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false)

  // Cropper states
  const [cropModalOpen, setCropModalOpen] = useState(false)
  const [rawImageSrc, setRawImageSrc] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Compute initials for avatar fallback preview
  const getInitials = (text: string) => {
    if (!text.trim()) return "CL"
    const parts = text.trim().split(" ")
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith("image/")) {
      setErrorMessage(isId ? "Hanya file gambar (JPG, PNG, WebP) yang diperbolehkan." : "Only image files (JPG, PNG, WebP) are allowed.")
      return
    }

    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage(isId ? "Ukuran file maksimal 8MB." : "File size cannot exceed 8MB.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setRawImageSrc(reader.result as string)
      setCropModalOpen(true)
      setErrorMessage("")
    }
    reader.readAsDataURL(file)

    // Reset input so same file can be re-selected if needed
    e.target.value = ""
  }

  const handleCropComplete = async (croppedBlob: Blob) => {
    try {
      setUploading(true)
      setErrorMessage("")

      const formData = new FormData()
      formData.append("file", croppedBlob, "avatar.jpg")
      formData.append("token", token)

      const res = await fetch("/api/feedback/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || (isId ? "Gagal mengupload gambar" : "Failed to upload image"))
      }

      setAvatarUrl(data.url)
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err.message || (isId ? "Gagal mengupload foto avatar" : "Failed to upload avatar photo"))
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveAvatar = () => {
    setAvatarUrl("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!name.trim()) {
      setErrorMessage(isId ? "Nama lengkap wajib diisi." : "Full name is required.")
      return
    }
    if (!role.trim()) {
      setErrorMessage(isId ? "Role / Jabatan wajib diisi." : "Role / Title is required.")
      return
    }
    if (!quote.trim()) {
      setErrorMessage(isId ? "Kutipan testimonial wajib diisi." : "Testimonial quote is required.")
      return
    }

    try {
      setSubmitting(true)

      const payload = {
        name: name.trim(),
        role: role.trim(),
        company: company.trim(),
        avatar_url: avatarUrl.trim(),
        quote: quote.trim(),
        feedback: feedback.trim(),
        token,
      }

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || (isId ? "Gagal mengirim testimonial" : "Failed to submit testimonial"))
      }

      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setErrorMessage(err.message || (isId ? "Terjadi kesalahan saat mengirim." : "An error occurred during submission."))
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="feedback-card feedback-success-card animate-fadeIn">
        <div className="feedback-success-icon">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h2 className="feedback-success-title">
          {isId ? "Terima Kasih Banyak!" : "Thank You So Much!"}
        </h2>
        <p className="feedback-success-desc">
          {isId
            ? "Testimonial dan kritik/saran Anda telah berhasil terkirim. Ulasan Anda sangat berharga bagi perkembangan karya dan layanan saya ke depannya."
            : "Your testimonial and feedback have been successfully submitted. Your review means a lot for the continuous improvement of my work and services."}
        </p>
        <div style={{ marginTop: "24px" }}>
          <a href="/" className="feedback-home-btn">
            {isId ? "Kembali ke Beranda" : "Return to Home"}
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="feedback-card animate-fadeIn">
        {/* Header */}
        <div className="feedback-header">
          <div className="feedback-badge">
            <Sparkles size={14} />
            <span>{isId ? "Client Feedback" : "Client Feedback"}</span>
          </div>
          <h1 className="feedback-title">
            {isId ? "Berikan Ulasan & Testimonial Anda" : "Share Your Experience & Testimonial"}
          </h1>
          <p className="feedback-subtitle">
            {isId
              ? "Pengalaman dan masukan Anda sangat berharga. Ceritakan bagaimana hasil kolaborasi kita!"
              : "Your feedback and experience mean the world to me. Let others know how our collaboration went!"}
          </p>
        </div>

        {errorMessage && (
          <div className="feedback-error-banner">
            <ShieldAlert size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="feedback-form-content">
          {/* TOP SECTION: Dedicated Avatar Upload & Preview */}
          <div className="feedback-avatar-top-section">
            <div className="feedback-avatar-top-preview-wrap">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name || "Avatar"}
                  className="feedback-avatar-top-img"
                />
              ) : (
                <div className="feedback-avatar-top-initials">
                  {getInitials(name)}
                </div>
              )}
            </div>

            <div className="feedback-avatar-top-actions">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="feedback-avatar-btn-choose"
              >
                <Camera size={15} />
                <span>
                  {uploading
                    ? (isId ? "Mengupload..." : "Uploading...")
                    : avatarUrl
                    ? (isId ? "Ganti Foto" : "Change Photo")
                    : (isId ? "Pilih Foto Profil" : "Choose Profile Photo")}
                </span>
              </button>

              {avatarUrl && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  disabled={uploading}
                  className="feedback-avatar-btn-remove"
                  title={isId ? "Hapus Foto (Gunakan Inisial)" : "Remove Photo (Use Initials)"}
                >
                  <Trash2 size={15} />
                  <span>{isId ? "Hapus" : "Remove"}</span>
                </button>
              )}

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
                accept="image/jpeg,image/png,image/webp,image/jpg"
                disabled={uploading}
              />
            </div>

            <p className="feedback-avatar-top-hint">
              {isId
                ? "Opsional. Anda dapat menggeser & memotong (crop) foto sebelum diupload. Jika tidak diisi, otomatis menggunakan inisial nama."
                : "Optional. You can zoom & crop your photo before uploading. If left empty, your initials will be used automatically."}
            </p>
          </div>

          {/* Section Divider */}
          <div className="feedback-section-divider" />

          {/* Row 1: Name & Role */}
          <div className="feedback-grid-2">
            <div>
              <label className="feedback-label">
                <User size={15} />
                <span>{isId ? "Nama Lengkap" : "Full Name"} *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isId ? "contoh: Alex Rivera" : "e.g. Alex Rivera"}
                className="feedback-input"
              />
            </div>

            <div>
              <label className="feedback-label">
                <Briefcase size={15} />
                <span>{isId ? "Role / Jabatan" : "Role / Title"} *</span>
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder={isId ? "contoh: Founder, CTO, Product Lead" : "e.g. Founder, CTO, Product Lead"}
                className="feedback-input"
              />
            </div>
          </div>

          {/* Row 2: Company */}
          <div>
            <label className="feedback-label">
              <Building2 size={15} />
              <span>{isId ? "Perusahaan / Brand (Opsional)" : "Company / Brand (Optional)"}</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={isId ? "contoh: Nexus Tech, Freelance" : "e.g. Nexus Tech, Startup"}
              className="feedback-input"
            />
          </div>

          {/* Row 3: Testimonial Quote */}
          <div>
            <label className="feedback-label">
              <MessageSquareQuote size={15} />
              <span>{isId ? "Kutipan Testimonial (Publik)" : "Testimonial Quote (Public)"} *</span>
            </label>
            <textarea
              required
              rows={4}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder={
                isId
                  ? "Ceritakan kepuasan Anda mengenai hasil kerja, komunikasi, kecepatan, dan kualitas proyek yang telah kita selesaikan bersama..."
                  : "Describe your experience regarding the quality of work, communication, delivery, and outcome of our collaboration..."
              }
              className="feedback-textarea"
            />
            <p className="feedback-hint">
              {isId
                ? "Ulasan ini akan ditampilkan di bagian Testimonials portfolio setelah disetujui."
                : "This testimonial will be featured in the portfolio Testimonials section upon approval."}
            </p>
          </div>

          {/* Row 4: Private Feedback / Kritik & Saran */}
          <div className="feedback-private-section">
            <div className="feedback-private-header">
              <label className="feedback-label" style={{ marginBottom: 0 }}>
                <Lock size={15} className="text-amber-500" />
                <span>{isId ? "Kritik & Saran (Private)" : "Private Feedback / Suggestions"}</span>
              </label>
              <span className="feedback-private-tag">
                🔒 {isId ? "Hanya untuk Azizi" : "Only for Azizi"}
              </span>
            </div>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={
                isId
                  ? "Ada hal yang perlu ditingkatkan untuk kolaborasi berikutnya? Tuliskan secara bebas di sini (tidak akan pernah dipublikasikan)."
                  : "Anything that could be improved for future collaborations? Feel free to share here (will never be published)."
              }
              className="feedback-textarea"
            />
            <p className="feedback-hint">
              {isId
                ? "Bagian ini bersifat rahasia dan hanya dapat dibaca oleh saya untuk evaluasi internal."
                : "This feedback is strictly confidential and only visible to me for internal improvement."}
            </p>
          </div>

          {/* Submit Button */}
          <div className="feedback-submit-wrap">
            <button
              type="submit"
              disabled={submitting || uploading}
              className="feedback-submit-btn"
            >
              {submitting
                ? (isId ? "Mengirim..." : "Submitting...")
                : (isId ? "Kirim Testimonial & Feedback" : "Submit Testimonial & Feedback")}
            </button>
          </div>
        </form>
      </div>

      {/* Image Crop Modal Dialog */}
      <ImageCropModal
        isOpen={cropModalOpen}
        imageSrc={rawImageSrc}
        onClose={() => setCropModalOpen(false)}
        onCropComplete={handleCropComplete}
        isId={isId}
      />
    </>
  )
}

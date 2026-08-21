"use client"

import { useState, useRef } from "react"
import { useLanguage } from "@/contexts/language-contexts"
import { CheckCircle2, Upload, MessageSquareQuote, ShieldAlert, Sparkles, Building2, User, Briefcase, Lock } from "lucide-react"

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

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Compute initials for avatar fallback preview
  const getInitials = (text: string) => {
    if (!text.trim()) return "CL"
    const parts = text.trim().split(" ")
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    if (!file.type.startsWith("image/")) {
      setErrorMessage(isId ? "Hanya file gambar yang diperbolehkan." : "Only image files are allowed.")
      return
    }

    try {
      setUploading(true)
      setErrorMessage("")

      const formData = new FormData()
      formData.append("file", file)
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
        {/* Row 1: Name & Avatar Preview */}
        <div className="feedback-avatar-row">
          <div className="feedback-avatar-preview-wrap">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name || "Avatar"} className="feedback-avatar-img" />
            ) : (
              <div className="feedback-avatar-initials">
                {getInitials(name)}
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="feedback-avatar-upload-btn"
              title={isId ? "Upload Foto Profil" : "Upload Avatar Photo"}
            >
              <Upload size={14} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
              accept="image/*"
              disabled={uploading}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label className="feedback-label">
              <User size={15} />
              <span>{isId ? "Nama Lengkap" : "Full Name"} *</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isId ? "contoh: John Doe" : "e.g. John Doe"}
              className="feedback-input"
            />
            <p className="feedback-hint">
              {uploading
                ? (isId ? "Mengupload foto..." : "Uploading photo...")
                : (isId ? "Foto profil bersifat opsional. Klik tombol panah di avatar untuk upload." : "Avatar photo is optional. Click the arrow button on the avatar to upload.")}
            </p>
          </div>
        </div>

        {/* Row 2: Role & Company */}
        <div className="feedback-grid-2">
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
              placeholder={isId ? "contoh: Founder, CTO, Product Manager" : "e.g. Founder, CTO, Product Lead"}
              className="feedback-input"
            />
          </div>

          <div>
            <label className="feedback-label">
              <Building2 size={15} />
              <span>{isId ? "Perusahaan / Brand (Opsional)" : "Company / Brand (Optional)"}</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={isId ? "contoh: Tech Corp, Freelance" : "e.g. Nexus Tech, Startup"}
              className="feedback-input"
            />
          </div>
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
              🔒 {isId ? "Hanya untuk Saya" : "Admin Only"}
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
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Edit2,
  Trash2,
  MessageSquareQuote,
  Plus,
  Copy,
  Check,
  CheckCircle,
  XCircle,
  Lock,
  Sparkles,
  UserCheck,
  Eye,
  ExternalLink
} from "lucide-react"

interface TestimonialsListProps {
  initialTestimonials: any[]
}

export default function TestimonialsList({ initialTestimonials }: TestimonialsListProps) {
  const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState<string>("")
  const [viewFeedbackItem, setViewFeedbackItem] = useState<any | null>(null)

  const [toastMsg, setToastMsg] = useState("")
  const [toastError, setToastError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null)

  const showToast = (msg: string, isError = false) => {
    setToastMsg(msg)
    setToastError(isError)
    setTimeout(() => {
      setToastMsg("")
    }, 4000)
  }

  const handleCopyFeedbackLink = () => {
    try {
      const token = process.env.NEXT_PUBLIC_FEEDBACK_TOKEN || "azz-client-feedback-key"
      const url = `${window.location.origin}/feedback?token=${token}`
      navigator.clipboard.writeText(url)
      setCopied(true)
      showToast("Link formulir feedback berhasil disalin ke clipboard!", false)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      showToast("Gagal menyalin link.", true)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      setActionLoadingId(id)
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "approve" }),
      })

      if (!res.ok) throw new Error("Gagal menyetujui testimonial")

      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "published" } : t))
      )
      showToast("Testimonial berhasil disetujui dan dipublikasikan!", false)
    } catch (err: any) {
      console.error(err)
      showToast(err.message || "Gagal menyetujui testimonial", true)
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleReject = async (id: string) => {
    try {
      setActionLoadingId(id)
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reject" }),
      })

      if (!res.ok) throw new Error("Gagal menolak testimonial")

      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "draft" } : t))
      )
      showToast("Testimonial ditolak dan disimpan sebagai draft.", false)
    } catch (err: any) {
      console.error(err)
      showToast(err.message || "Gagal menolak testimonial", true)
    } finally {
      setActionLoadingId(null)
    }
  }

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirmId(id)
    setDeleteConfirmName(name)
  }

  const executeDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Delete failed")

      setTestimonials(testimonials.filter((t) => t.id !== id))
      setDeleteConfirmId(null)
      showToast("Testimonial berhasil dihapus.", false)
    } catch (err: any) {
      console.error(err)
      showToast(err.message || "Gagal menghapus testimonial", true)
    }
  }

  const pendingCount = testimonials.filter((t) => t.status === "pending").length

  const filtered = testimonials.filter((t) => {
    const nameText = (t.name || "").toLowerCase()
    const roleText = (t.role || "").toLowerCase()
    const companyText = (t.company || "").toLowerCase()
    const quoteText = (t.quote?.en || t.quote?.id || "").toLowerCase()
    const feedbackText = (t.feedback || "").toLowerCase()
    const searchLower = search.toLowerCase()

    const matchesSearch =
      nameText.includes(searchLower) ||
      roleText.includes(searchLower) ||
      companyText.includes(searchLower) ||
      quoteText.includes(searchLower) ||
      feedbackText.includes(searchLower)

    const matchesStatus = statusFilter === "all" || t.status === statusFilter
    const matchesSource = sourceFilter === "all" || (t.source || "admin") === sourceFilter

    return matchesSearch && matchesStatus && matchesSource
  })

  return (
    <div>
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`admin-toast ${toastError ? "error" : "success"}`}>
          {toastError ? "❌" : "✅"} {toastMsg}
        </div>
      )}

      {/* Toolbar */}
      <div className="admin-toolbar" style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Cari nama, role, quote, kritik & saran..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input admin-search"
          style={{ minWidth: "240px", flex: 1 }}
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-select"
        >
          <option value="all">Semua Status</option>
          <option value="published">Published</option>
          <option value="pending">Pending Review</option>
          <option value="draft">Draft</option>
        </select>

        {/* Source Filter */}
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="admin-select"
        >
          <option value="all">Semua Sumber</option>
          <option value="client">Client Submission</option>
          <option value="admin">Admin Input</option>
        </select>

        {/* Copy Feedback Link */}
        <button
          type="button"
          onClick={handleCopyFeedbackLink}
          className="admin-btn admin-btn-secondary"
          title="Salin tautan formulir feedback publik untuk dibagikan ke client"
        >
          {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
          {copied ? "Link Tersalin!" : "Copy Feedback Link"}
        </button>

        {/* Add Testimonial */}
        <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> New Testimonial
        </Link>
      </div>

      {/* Pending Banner Alert if any */}
      {pendingCount > 0 && statusFilter !== "pending" && (
        <div
          style={{
            background: "#fffbeb",
            border: "1px solid #fde68a",
            borderRadius: "12px",
            padding: "12px 16px",
            marginBottom: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#b45309" }}>
            <Sparkles size={18} />
            <span style={{ fontSize: "14px", fontWeight: 700 }}>
              Ada {pendingCount} testimonial baru dari client yang menunggu review & persetujuan Anda!
            </span>
          </div>
          <button
            type="button"
            onClick={() => setStatusFilter("pending")}
            className="admin-btn admin-btn-sm"
            style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fcd34d" }}
          >
            Lihat Data Pending
          </button>
        </div>
      )}

      {/* Table Card */}
      <div className="admin-card">
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <MessageSquareQuote size={40} className="admin-empty-icon" />
            <p>Tidak ada testimonial yang sesuai dengan filter kriteria.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Role & Company</th>
                  <th>Sumber</th>
                  <th>Quote Testimonial</th>
                  <th>Kritik & Saran (Private)</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const quoteText = t.quote?.en || t.quote?.id || ""
                  const initial = t.name ? t.name.charAt(0).toUpperCase() : "C"
                  const isClientSource = (t.source || "admin") === "client"
                  const isPending = t.status === "pending"
                  const isLoadingThis = actionLoadingId === t.id

                  return (
                    <tr
                      key={t.id}
                      style={isPending ? { backgroundColor: "rgba(254, 243, 199, 0.25)" } : undefined}
                    >
                      {/* Client info */}
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          {t.avatar_url ? (
                            <img
                              src={t.avatar_url}
                              alt={t.name}
                              style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: isClientSource ? "linear-gradient(135deg, #3b82f6, #06b6d4)" : "#3b82f6",
                                color: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: "14px",
                              }}
                            >
                              {initial}
                            </div>
                          )}
                          <div>
                            <span style={{ fontWeight: 700, display: "block" }}>{t.name}</span>
                            {t.featured && (
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 700,
                                  background: "#fef3c7",
                                  color: "#b45309",
                                  padding: "1px 6px",
                                  borderRadius: "4px",
                                }}
                              >
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Role & Company */}
                      <td>
                        <span style={{ fontSize: "13px", color: "var(--admin-text)" }}>
                          {t.role} {t.company ? `• ${t.company}` : ""}
                        </span>
                      </td>

                      {/* Source */}
                      <td>
                        {isClientSource ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              background: "#e0f2fe",
                              color: "#0369a1",
                            }}
                          >
                            <UserCheck size={12} /> Client
                          </span>
                        ) : (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "3px 8px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              background: "#f1f5f9",
                              color: "#475569",
                            }}
                          >
                            Admin
                          </span>
                        )}
                      </td>

                      {/* Quote */}
                      <td>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "var(--admin-text-secondary)",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            maxWidth: "260px",
                          }}
                          title={quoteText}
                        >
                          &ldquo;{quoteText}&rdquo;
                        </span>
                      </td>

                      {/* Private Feedback / Kritik & Saran */}
                      <td>
                        {t.feedback ? (
                          <button
                            type="button"
                            onClick={() => setViewFeedbackItem(t)}
                            className="admin-btn-feedback"
                            title="Klik untuk membuka kritik & saran dari client"
                          >
                            <Lock size={12} />
                            <span>Lihat Kritik & Saran</span>
                          </button>
                        ) : (
                          <span style={{ fontSize: "12px", color: "#94a3b8" }}>-</span>
                        )}
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`admin-badge ${t.status}`}>
                          {t.status === "pending" ? "Pending Review" : t.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", alignItems: "center" }}>
                          {/* Quick Approve / Reject for Pending */}
                          {isPending && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApprove(t.id)}
                                disabled={isLoadingThis}
                                className="admin-btn-icon"
                                title="Approve & Publish Testimonial"
                                style={{
                                  color: "#059669",
                                  background: "#ecfdf5",
                                  border: "1px solid #a7f3d0",
                                  cursor: "pointer",
                                }}
                              >
                                <CheckCircle size={16} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleReject(t.id)}
                                disabled={isLoadingThis}
                                className="admin-btn-icon"
                                title="Reject (Keep as Draft)"
                                style={{
                                  color: "#d97706",
                                  background: "#fffbeb",
                                  border: "1px solid #fde68a",
                                  cursor: "pointer",
                                }}
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}

                          <Link
                            href={`/admin/testimonials/${t.id}`}
                            className="admin-btn-icon"
                            title="Edit Testimonial"
                            style={{ cursor: "pointer" }}
                          >
                            <Edit2 size={16} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDeleteClick(t.id, t.name)}
                            className="admin-btn-icon admin-btn-icon-danger"
                            title="Hapus Testimonial"
                            style={{ cursor: "pointer" }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Feedback Modal */}
      {viewFeedbackItem && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: "520px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#fef3c7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b45309",
                }}
              >
                <Lock size={16} />
              </div>
              <h3 className="admin-modal-title" style={{ margin: 0 }}>
                Kritik & Saran dari {viewFeedbackItem.name}
              </h3>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "14px",
                color: "#1e293b",
                lineHeight: 1.6,
                marginBottom: "16px",
                whiteSpace: "pre-wrap",
              }}
            >
              {viewFeedbackItem.feedback || "Tidak ada kritik & saran."}
            </div>

            <p style={{ fontSize: "12px", color: "#64748b", margin: 0, marginBottom: "20px" }}>
              🔒 Masukan ini bersifat rahasia (private) dan hanya bisa dilihat oleh Anda di dashboard ini.
            </p>

            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setViewFeedbackItem(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="admin-modal-title">Delete Testimonial</h3>
            <p className="admin-modal-body">
              Apakah Anda yakin ingin menghapus testimonial dari <strong>{deleteConfirmName}</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteConfirmId(null)}
              >
                Batal
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => executeDelete(deleteConfirmId)}
              >
                Hapus Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

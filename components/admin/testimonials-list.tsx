"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit2, Trash2, MessageSquareQuote, Plus, Star } from "lucide-react"

interface TestimonialsListProps {
  initialTestimonials: any[]
}

export default function TestimonialsList({ initialTestimonials }: TestimonialsListProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteConfirmName, setDeleteConfirmName] = useState<string>("")

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
    } catch (err) {
      console.error(err)
      alert("Failed to delete testimonial")
    }
  }

  const filtered = testimonials.filter((t) => {
    const nameText = (t.name || "").toLowerCase()
    const roleText = (t.role || "").toLowerCase()
    const companyText = (t.company || "").toLowerCase()
    const searchLower = search.toLowerCase()

    const matchesSearch =
      nameText.includes(searchLower) ||
      roleText.includes(searchLower) ||
      companyText.includes(searchLower)

    const matchesStatus = statusFilter === "all" || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          type="text"
          placeholder="Search by name, role, company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input admin-search"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-select"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <Link href="/admin/testimonials/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> New Testimonial
        </Link>
      </div>

      {/* Table */}
      <div className="admin-card">
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <MessageSquareQuote size={40} className="admin-empty-icon" />
            <p>No testimonials found matching your filter criteria.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Role & Company</th>
                  <th>Quote (EN)</th>
                  <th>Rating</th>
                  <th>Featured</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => {
                  const quoteEn = t.quote?.en || t.quote?.id || ""
                  const initial = t.name ? t.name.charAt(0).toUpperCase() : "T"

                  return (
                    <tr key={t.id}>
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
                                background: "#3b82f6",
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
                          <span style={{ fontWeight: 600 }}>{t.name}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "13px", color: "var(--admin-text)" }}>
                          {t.role} {t.company ? `• ${t.company}` : ""}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "13px",
                            color: "var(--admin-text-secondary)",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            maxWidth: "280px",
                          }}
                        >
                          "{quoteEn}"
                        </span>
                      </td>
                      <td>
                        {t.rating ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "2px", color: "#f59e0b" }}>
                            <Star size={14} fill="#f59e0b" />
                            <span style={{ fontSize: "12px", fontWeight: 600, marginLeft: "4px" }}>{t.rating}/5</span>
                          </div>
                        ) : (
                          <span style={{ fontSize: "12px", color: "var(--admin-text-secondary)" }}>-</span>
                        )}
                      </td>
                      <td>
                        {t.featured ? (
                          <span className="admin-badge admin-badge-success">Featured</span>
                        ) : (
                          <span className="admin-badge admin-badge-neutral">Standard</span>
                        )}
                      </td>
                      <td>
                        <span className="font-mono text-xs">{t.sort_order ?? 0}</span>
                      </td>
                      <td>
                        <span
                          className={`admin-badge ${
                            t.status === "published" ? "admin-badge-success" : "admin-badge-warning"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <Link
                            href={`/admin/testimonials/${t.id}`}
                            className="admin-icon-btn"
                            title="Edit Testimonial"
                          >
                            <Edit2 size={16} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(t.id, t.name)}
                            className="admin-icon-btn admin-icon-btn-danger"
                            title="Delete Testimonial"
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

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="admin-modal-title">Delete Testimonial</h3>
            <p className="admin-modal-body">
              Are you sure you want to delete the testimonial from <strong>{deleteConfirmName}</strong>? This action cannot be undone.
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => executeDelete(deleteConfirmId)}
              >
                Delete Testimonial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

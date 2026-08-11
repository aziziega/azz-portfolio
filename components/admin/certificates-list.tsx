"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Edit2, Trash2, Award } from "lucide-react"

interface CertificatesListProps {
  initialCertificates: any[]
}

export default function CertificatesList({ initialCertificates }: CertificatesListProps) {
  const [certificates, setCertificates] = useState(initialCertificates)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteConfirmTitle, setDeleteConfirmTitle] = useState<string>("")

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteConfirmId(id)
    setDeleteConfirmTitle(title)
  }

  const executeDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/certificates/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Delete failed")

      setCertificates(certificates.filter((c) => c.id !== id))
      setDeleteConfirmId(null)
    } catch (err) {
      console.error(err)
      alert("Failed to delete certificate")
    }
  }

  const filtered = certificates.filter((c) => {
    const titleText = (c.title || "").toLowerCase()
    const issuerText = (c.issuer || "").toLowerCase()
    const matchesSearch = titleText.includes(search.toLowerCase()) || issuerText.includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="Search by title or issuer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <Link href="/admin/certificates/new" className="admin-quick-btn primary">
          ➕ New Certificate
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📜</div>
          <h3 className="admin-empty-title">No certificates found</h3>
          <p className="admin-empty-desc">Add your professional certifications to display on the landing page!</p>
          <Link href="/admin/certificates/new" className="admin-quick-btn primary">
            Add Certificate
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Certificate</th>
                <th>Issuer & Year</th>
                <th>Status</th>
                <th>Sort Order</th>
                <th>Credential Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {c.image_url ? (
                        <img
                          src={c.image_url}
                          alt={c.title}
                          style={{
                            width: "48px",
                            height: "36px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "48px",
                            height: "36px",
                            borderRadius: "6px",
                            background: "#f1f5f9",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Award size={18} className="text-slate-400" />
                        </div>
                      )}
                      <div>
                        <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{c.title}</strong>
                        {c.featured && (
                          <span
                            style={{
                              marginLeft: "8px",
                              padding: "2px 6px",
                              fontSize: "10px",
                              fontWeight: 700,
                              background: "#fef3c7",
                              color: "#d97706",
                              borderRadius: "4px",
                            }}
                          >
                            FEATURED
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: "0.875rem", color: "#475569" }}>{c.issuer}</div>
                    <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{c.year || "-"}</div>
                  </td>
                  <td>
                    <span className={`admin-status-badge ${c.status}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "#64748b" }}>{c.sort_order}</span>
                  </td>
                  <td>
                    {c.credential_url ? (
                      <a
                        href={c.credential_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          color: "#2563eb",
                          fontSize: "0.8125rem",
                          fontWeight: 500,
                        }}
                      >
                        Verify <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span style={{ color: "#cbd5e1", fontSize: "0.8125rem" }}>-</span>
                    )}
                  </td>
                  <td>
                    <div className="admin-action-btns">
                      <Link href={`/admin/certificates/${c.id}`} className="admin-action-btn edit" title="Edit">
                        <Edit2 size={15} />
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(c.id, c.title)}
                        className="admin-action-btn delete"
                        title="Delete"
                        type="button"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="admin-modal-title">Delete Certificate</h3>
            <p className="admin-modal-body">
              Are you sure you want to delete <strong>&quot;{deleteConfirmTitle}&quot;</strong>? This action cannot be undone.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

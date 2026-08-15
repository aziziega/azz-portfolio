"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ExternalLink,
  Edit2,
  Archive,
  RotateCcw,
  Award,
  GripVertical,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

interface CertificatesListProps {
  initialCertificates: any[]
}

export default function CertificatesList({ initialCertificates }: CertificatesListProps) {
  const [certificates, setCertificates] = useState<any[]>(initialCertificates)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [archiveFilter, setArchiveFilter] = useState<"active" | "archived">("active")
  
  // Modals & Action States
  const [archiveConfirmItem, setArchiveConfirmItem] = useState<{ id: string; title: string } | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Drag-and-drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [reordering, setReordering] = useState(false)

  const showNotification = (type: "success" | "error", message: string) => {
    setFeedback({ type, message })
    setTimeout(() => {
      setFeedback(null)
    }, 4000)
  }

  // Handle Archive
  const executeArchive = async (id: string) => {
    try {
      setActionLoading(true)
      const res = await fetch(`/api/admin/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "archive" }),
      })

      if (!res.ok) throw new Error("Failed to archive certificate")

      const data = await res.json()
      setCertificates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, archived_at: new Date().toISOString() } : c))
      )
      setArchiveConfirmItem(null)
      showNotification("success", "Certificate archived successfully.")
    } catch (err: any) {
      console.error(err)
      showNotification("error", err.message || "Failed to archive certificate")
    } finally {
      setActionLoading(false)
    }
  }

  // Handle Restore
  const executeRestore = async (id: string) => {
    try {
      setActionLoading(true)
      const res = await fetch(`/api/admin/certificates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore" }),
      })

      if (!res.ok) throw new Error("Failed to restore certificate")

      setCertificates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, archived_at: null } : c))
      )
      showNotification("success", "Certificate restored to active list.")
    } catch (err: any) {
      console.error(err)
      showNotification("error", err.message || "Failed to restore certificate")
    } finally {
      setActionLoading(false)
    }
  }

  // Handle Drag & Drop
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragOverIndex !== index) {
      setDragOverIndex(index)
    }
  }

  const handleDrop = async (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const currentList = [...activeFiltered]
    const [draggedItem] = currentList.splice(draggedIndex, 1)
    currentList.splice(dropIndex, 0, draggedItem)

    // Update locally first (optimistic)
    const newOrderedIds = currentList.map((item) => item.id)
    const updatedFullList = certificates.map((c) => {
      const newPos = newOrderedIds.indexOf(c.id)
      return newPos !== -1 ? { ...c, sort_order: newPos + 1 } : c
    })

    setCertificates(updatedFullList)
    setDraggedIndex(null)
    setDragOverIndex(null)

    // Send to backend
    try {
      setReordering(true)
      const res = await fetch("/api/admin/certificates/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: newOrderedIds }),
      })

      if (!res.ok) {
        throw new Error("Failed to save new order to database")
      }
      showNotification("success", "Certificate order updated successfully.")
    } catch (err: any) {
      console.error(err)
      showNotification("error", err.message || "Failed to reorder certificates")
      // Rollback
      setCertificates(certificates)
    } finally {
      setReordering(false)
    }
  }

  // Filtering
  const filtered = certificates.filter((c) => {
    const titleText = (c.title || "").toLowerCase()
    const issuerText = (c.issuer || "").toLowerCase()
    const credIdText = (c.credential_id || "").toLowerCase()
    const searchLower = search.toLowerCase()

    const matchesSearch =
      titleText.includes(searchLower) ||
      issuerText.includes(searchLower) ||
      credIdText.includes(searchLower)

    const matchesStatus = statusFilter === "all" || c.status === statusFilter

    const isArchived = Boolean(c.archived_at)
    const matchesArchive = archiveFilter === "archived" ? isArchived : !isArchived

    return matchesSearch && matchesStatus && matchesArchive
  })

  // List used for drag-drop (active items)
  const activeFiltered = filtered

  const canDrag = archiveFilter === "active" && statusFilter === "all" && !search

  return (
    <div>
      {/* Toast Notification */}
      {feedback && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 16px",
          marginBottom: "16px",
          borderRadius: "8px",
          background: feedback.type === "success" ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${feedback.type === "success" ? "#bbf7d0" : "#fecaca"}`,
          color: feedback.type === "success" ? "#166534" : "#991b1b",
          fontSize: "14px",
          fontWeight: 500
        }}>
          {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="Search title, issuer, or credential ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        {/* Archive / Active Tabs */}
        <div className="admin-lang-tabs" style={{ margin: 0 }}>
          <button
            type="button"
            className={`admin-lang-tab ${archiveFilter === "active" ? "active" : ""}`}
            onClick={() => setArchiveFilter("active")}
          >
            Active ({certificates.filter((c) => !c.archived_at).length})
          </button>
          <button
            type="button"
            className={`admin-lang-tab ${archiveFilter === "archived" ? "active" : ""}`}
            onClick={() => setArchiveFilter("archived")}
          >
            Archived ({certificates.filter((c) => Boolean(c.archived_at)).length})
          </button>
        </div>

        <Link href="/admin/certificates/new" className="admin-quick-btn primary">
          ➕ New Certificate
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📜</div>
          <h3 className="admin-empty-title">
            {archiveFilter === "archived" ? "No archived certificates" : "No certificates found"}
          </h3>
          <p className="admin-empty-desc">
            {archiveFilter === "archived"
              ? "Archived certificates will appear here. They are hidden from the public website."
              : "Add your professional certifications to display on the landing page!"}
          </p>
          {archiveFilter === "active" && (
            <Link href="/admin/certificates/new" className="admin-quick-btn primary">
              Add Certificate
            </Link>
          )}
        </div>
      ) : (
        <div className="admin-table-wrapper">
          {reordering && (
            <div style={{ padding: "8px 16px", background: "#f0f9ff", color: "#0369a1", fontSize: "12px", fontWeight: 600 }}>
              Saving new certificate order...
            </div>
          )}
          <table className="admin-table">
            <thead>
              <tr>
                {canDrag && <th style={{ width: "40px" }}></th>}
                <th>Certificate</th>
                <th>Issuer & Date</th>
                <th>Media</th>
                <th>Status</th>
                <th>Credential</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, index) => {
                const formattedDate = c.issue_date
                  ? new Date(c.issue_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
                  : c.year
                    ? `Year ${c.year}`
                    : "-"

                const isDropTarget = dragOverIndex === index
                const isDragging = draggedIndex === index

                return (
                  <tr
                    key={c.id}
                    draggable={canDrag}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={() => handleDrop(index)}
                    style={{
                      opacity: isDragging ? 0.4 : 1,
                      backgroundColor: isDropTarget ? "#f0f9ff" : undefined,
                      borderTop: isDropTarget ? "2px solid #3b82f6" : undefined,
                      transition: "background-color 0.15s ease"
                    }}
                  >
                    {/* Drag Handle */}
                    {canDrag && (
                      <td style={{ width: "40px", cursor: "grab", textAlign: "center" }}>
                        <GripVertical size={16} className="text-slate-400 hover:text-slate-700" />
                      </td>
                    )}

                    {/* Certificate Info & Thumbnail */}
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
                              flexShrink: 0
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
                              flexShrink: 0
                            }}
                          >
                            <Award size={18} className="text-slate-400" />
                          </div>
                        )}
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                            <strong style={{ color: "#0f172a", fontSize: "0.95rem" }}>{c.title}</strong>
                            {c.featured && (
                              <span
                                style={{
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
                          {c.credential_id && (
                            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px", fontFamily: "monospace" }}>
                              ID: {c.credential_id}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Issuer & Date */}
                    <td>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "#334155" }}>{c.issuer}</div>
                      <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{formattedDate}</div>
                    </td>

                    {/* Media Badges */}
                    <td>
                      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                        {c.image_url ? (
                          <span
                            title="Image available"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px",
                              padding: "2px 6px",
                              background: "#f1f5f9",
                              color: "#475569",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: 500
                            }}
                          >
                            <ImageIcon size={12} /> IMG
                          </span>
                        ) : null}
                        {c.pdf_url ? (
                          <a
                            href={c.pdf_url}
                            target="_blank"
                            rel="noreferrer"
                            title="Open PDF"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px",
                              padding: "2px 6px",
                              background: "#fee2e2",
                              color: "#dc2626",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: 600,
                              textDecoration: "none"
                            }}
                          >
                            <FileText size={12} /> PDF
                          </a>
                        ) : null}
                        {!c.image_url && !c.pdf_url && (
                          <span style={{ fontSize: "12px", color: "#cbd5e1" }}>-</span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      {c.archived_at ? (
                        <span className="admin-status-badge" style={{ background: "#f1f5f9", color: "#64748b" }}>
                          Archived
                        </span>
                      ) : (
                        <span className={`admin-status-badge ${c.status}`}>
                          {c.status}
                        </span>
                      )}
                    </td>

                    {/* Credential Link */}
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

                    {/* Action Buttons */}
                    <td style={{ textAlign: "right" }}>
                      <div className="admin-action-btns" style={{ justifyContent: "flex-end" }}>
                        <Link href={`/admin/certificates/${c.id}`} className="admin-action-btn edit" title="Edit Certificate">
                          <Edit2 size={15} />
                        </Link>

                        {c.archived_at ? (
                          <button
                            onClick={() => executeRestore(c.id)}
                            className="admin-action-btn"
                            title="Restore Certificate"
                            type="button"
                            style={{ color: "#059669" }}
                          >
                            <RotateCcw size={15} />
                          </button>
                        ) : (
                          <button
                            onClick={() => setArchiveConfirmItem({ id: c.id, title: c.title })}
                            className="admin-action-btn"
                            title="Archive Certificate"
                            type="button"
                            style={{ color: "#d97706" }}
                          >
                            <Archive size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Archive Modal */}
      {archiveConfirmItem && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="admin-modal-title">Archive Certificate</h3>
            <p className="admin-modal-body">
              Are you sure you want to archive <strong>&quot;{archiveConfirmItem.title}&quot;</strong>?
              Archived certificates will be hidden from the public website, but their assets and metadata are safely preserved and can be restored at any time.
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setArchiveConfirmItem(null)}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn"
                style={{ background: "#d97706", color: "#ffffff" }}
                onClick={() => executeArchive(archiveConfirmItem.id)}
                disabled={actionLoading}
              >
                {actionLoading ? "Archiving..." : "Archive Certificate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

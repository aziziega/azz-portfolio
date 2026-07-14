"use client"

import { useState } from "react"

interface DBSubscriber {
  id: string
  email: string
  status: 'pending' | 'active' | 'unsubscribed' | 'bounced'
  source: string
  confirm_token?: string | null
  created_at: string
}

interface NewsletterListProps {
  initialSubscribers: DBSubscriber[]
}

export default function NewsletterList({ initialSubscribers }: NewsletterListProps) {
  const [subscribers, setSubscribers] = useState<DBSubscriber[]>(initialSubscribers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; email: string } | null>(null)
  const [toastMsg, setToastMsg] = useState("")
  const [toastError, setToastError] = useState(false)

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/newsletter/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete subscriber")
      setSubscribers(subscribers.filter(s => s.id !== id))
      setToastMsg("Subscriber deleted successfully!")
      setToastError(false)
      setTimeout(() => setToastMsg(""), 3000)
    } catch (err: any) {
      console.error(err)
      setToastMsg(err.message || "Failed to delete subscriber")
      setToastError(true)
      setTimeout(() => setToastMsg(""), 3000)
    } finally {
      setDeleteTarget(null)
    }
  }

  const handleExportCSV = () => {
    const activeEmails = subscribers
      .filter(s => s.status === "active")
      .map(s => s.email)
      .join("\n")

    // Create a download blob
    const blob = new Blob([activeEmails], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `subscribers-${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filtered = subscribers.filter(s => {
    const matchesSearch = s.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const badgeColor = (status: string) => {
    if (status === "active") return "active"
    if (status === "pending") return "pending"
    if (status === "unsubscribed") return "unsubscribed"
    return "bounced"
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="Search subscriber emails..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          className="admin-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
          <option value="bounced">Bounced</option>
        </select>

        {filtered.length > 0 && (
          <button
            type="button"
            onClick={handleExportCSV}
            className="admin-quick-btn secondary"
          >
            📥 Export Active CSV
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📧</div>
          <h3 className="admin-empty-title">No subscribers found</h3>
          <p className="admin-empty-desc">No email subscriptions match this search filter.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email Address</th>
                <th>Status</th>
                <th>Source</th>
                <th>Subscribed At</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr key={sub.id}>
                  <td style={{ fontWeight: 600 }}>{sub.email}</td>
                  <td>
                    <span className={`admin-badge ${badgeColor(sub.status)}`} style={
                      sub.status === "pending" ? { background: "#fef3c7", color: "#b45309", border: "1px solid #fcd34d" } : {}
                    }>
                      {sub.status}
                    </span>
                  </td>
                  <td style={{ color: "#64748b", fontSize: "13px" }}>{sub.source}</td>
                  <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget({ id: sub.id, email: sub.email })}
                      className="admin-btn admin-btn-danger admin-btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Toast */}
      {toastMsg && (
        <div className={`admin-toast ${toastError ? "error" : "success"}`}>
          {toastError ? "❌" : "✅"} {toastMsg}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            background: "#ffffff", padding: "24px", borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
            width: "100%", maxWidth: "400px",
            animation: "scaleIn 0.2s ease-out"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              ⚠️ Delete Subscriber?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "20px" }}>
              Are you sure you want to permanently remove <strong>{deleteTarget.email}</strong> from the subscriber list?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button type="button" className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" className="admin-btn admin-btn-danger"
                onClick={() => handleDelete(deleteTarget.id)}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  )
}

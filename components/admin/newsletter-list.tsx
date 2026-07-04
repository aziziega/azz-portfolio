"use client"

import { useState } from "react"

interface DBSubscriber {
  id: string
  email: string
  status: 'active' | 'unsubscribed' | 'bounced'
  source: string
  created_at: string
}

interface NewsletterListProps {
  initialSubscribers: DBSubscriber[]
}

export default function NewsletterList({ initialSubscribers }: NewsletterListProps) {
  const [subscribers, setSubscribers] = useState<DBSubscriber[]>(initialSubscribers)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to permanently delete subscriber: "${email}"?`)) return
    
    try {
      const response = await fetch(`/api/admin/newsletter/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error()
      
      setSubscribers(subscribers.filter(s => s.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete subscriber")
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
                    <span className={`admin-badge ${sub.status}`}>
                      {sub.status}
                    </span>
                  </td>
                  <td style={{ color: "#64748b", fontSize: "13px" }}>{sub.source}</td>
                  <td>{new Date(sub.created_at).toLocaleDateString()}</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      onClick={() => handleDelete(sub.id, sub.email)}
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
    </div>
  )
}

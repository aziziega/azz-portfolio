"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface DBWriting {
  id: string
  title: string
  platform: string
  url: string
  category: string | null
  published_date: string | null
  read_time: string | null
  featured: boolean
  sort_order: number
  status: 'draft' | 'published' | 'hidden'
  source: string
  created_at: string
}

interface WritingsListProps {
  initialWritings: DBWriting[]
}

export default function WritingsList({ initialWritings }: WritingsListProps) {
  const router = useRouter()
  const [writings, setWritings] = useState<DBWriting[]>(initialWritings)
  const [syncing, setSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState("")

  const handleSync = async () => {
    setSyncing(true)
    setSyncResult("")
    try {
      const response = await fetch("/api/admin/writing/sync", {
        method: "POST",
      })
      if (!response.ok) throw new Error("Sync failed")
      
      const result = await response.json()
      setSyncResult(`Successfully synced ${result.synced} articles! (${result.failed} failed)`)
      
      // Reload writings list
      const listResponse = await fetch("/api/admin/writing")
      if (listResponse.ok) {
        const listData = await listResponse.json()
        setWritings(listData.writings || [])
      }
    } catch (err) {
      console.error(err)
      setSyncResult("Failed to sync from Medium RSS feed.")
    } finally {
      setSyncing(false)
    }
  }

  const handleToggleVisibility = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "published" ? "hidden" : "published"
    try {
      const response = await fetch(`/api/admin/writing/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (!response.ok) throw new Error()
      
      setWritings(writings.map(w => w.id === id ? { ...w, status: nextStatus as any } : w))
    } catch (err) {
      console.error(err)
      alert("Failed to update status")
    }
  }

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/admin/writing/${id}/featured`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured }),
      })
      if (!response.ok) throw new Error()
      
      setWritings(writings.map(w => w.id === id ? { ...w, featured: !currentFeatured } : w))
    } catch (err) {
      console.error(err)
      alert("Failed to update featured status")
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete: "${title}"?`)) return
    
    try {
      const response = await fetch(`/api/admin/writing/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error()
      
      setWritings(writings.filter(w => w.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete article")
    }
  }

  return (
    <div>
      {/* Sync Control */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="admin-quick-btn primary"
        >
          {syncing ? "Syncing..." : "🔄 Sync from Medium RSS"}
        </button>
        {syncResult && (
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#0284c7" }}>
            {syncResult}
          </span>
        )}
      </div>

      {writings.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">✍️</div>
          <h3 className="admin-empty-title">No articles synced</h3>
          <p className="admin-empty-desc">Sync with Medium to load your external writings onto this portfolio.</p>
          <button type="button" onClick={handleSync} className="admin-quick-btn primary">
            Sync Now
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Platform</th>
                <th>Category</th>
                <th>Published Date</th>
                <th>Status</th>
                <th>Featured</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {writings.map((writing) => (
                <tr key={writing.id}>
                  <td style={{ fontWeight: 600, maxWidth: "300px" }}>
                    <a
                      href={writing.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {writing.title} 🔗
                    </a>
                  </td>
                  <td>{writing.platform}</td>
                  <td>{writing.category || "Article"}</td>
                  <td>{writing.published_date}</td>
                  <td>
                    <span className={`admin-badge ${writing.status}`}>
                      {writing.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(writing.id, writing.featured)}
                      style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                    >
                      {writing.featured ? "⭐" : "☆"}
                    </button>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => handleToggleVisibility(writing.id, writing.status)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        {writing.status === "published" ? "Hide" : "Show"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(writing.id, writing.title)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                      >
                        Delete
                      </button>
                    </div>
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

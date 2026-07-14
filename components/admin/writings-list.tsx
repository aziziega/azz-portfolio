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
  initialUsername: string
}

export default function WritingsList({ initialWritings, initialUsername }: WritingsListProps) {
  const router = useRouter()
  const [writings, setWritings] = useState<DBWriting[]>(initialWritings)
  const [username, setUsername] = useState(initialUsername)
  const [savingUsername, setSavingUsername] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteConfirmTitle, setDeleteConfirmTitle] = useState("")

  const handleSaveUsername = async () => {
    setSavingUsername(true)
    setSuccess("")
    setError("")
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medium_username: username.trim() }),
      })
      if (!response.ok) throw new Error("Failed to save username")
      setSuccess("Medium username saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      console.error(err)
      setError("Failed to save Medium username.")
      setTimeout(() => setError(""), 3000)
    } finally {
      setSavingUsername(false)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    setSuccess("")
    setError("")
    try {
      const response = await fetch("/api/admin/writing/sync", {
        method: "POST",
      })
      if (!response.ok) {
        const resData = await response.json()
        throw new Error(resData.message || "Sync failed")
      }
      
      const result = await response.json()
      setSuccess(`Successfully synced ${result.synced} articles! (${result.failed} failed)`)
      setTimeout(() => setSuccess(""), 4000)
      
      // Reload writings list
      const listResponse = await fetch("/api/admin/writing")
      if (listResponse.ok) {
        const listData = await listResponse.json()
        setWritings(listData.writings || [])
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to sync from Medium RSS feed.")
      setTimeout(() => setError(""), 4000)
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

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteConfirmId(id)
    setDeleteConfirmTitle(title)
  }

  const executeDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/writing/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Failed to delete article")
      
      setWritings(writings.filter(w => w.id !== id))
      setSuccess("Article deleted successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to delete article")
      setTimeout(() => setError(""), 3000)
    }
  }

  return (
    <div>
      {/* Medium Integration Settings Card */}
      <div style={{
        background: "#ffffff",
        border: "1px solid var(--admin-border)",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "24px",
        boxShadow: "var(--admin-shadow-soft)",
      }}>
        <h3 style={{ fontSize: "14px", fontWeight: 800, color: "var(--admin-text)", marginBottom: "12px" }}>
          Medium Integration Settings
        </h3>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
          <div className="admin-form-group" style={{ flex: "1", minWidth: "250px", gap: "6px" }}>
            <label className="admin-form-label" style={{ fontSize: "12px" }}>Medium Username</label>
            <input
              type="text"
              className="admin-form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. @username or username"
              style={{ padding: "10px 14px", height: "40px" }}
            />
          </div>
          
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={handleSaveUsername}
              disabled={savingUsername || !username.trim()}
              className="admin-btn admin-btn-secondary"
              style={{ height: "40px", padding: "0 18px", fontSize: "13px" }}
            >
              {savingUsername ? "Saving..." : "💾 Save Account"}
            </button>
            
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="admin-quick-btn primary"
              style={{ height: "40px", margin: 0, padding: "0 18px", fontSize: "13px" }}
            >
              {syncing ? "Syncing..." : "🔄 Sync Articles"}
            </button>
          </div>
        </div>

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
                        onClick={() => handleDeleteClick(writing.id, writing.title)}
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
      {success && <div className="admin-toast success">⚙️ {success}</div>}
      {error && <div className="admin-toast error">❌ {error}</div>}

      {deleteConfirmId && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            width: "100%",
            maxWidth: "400px",
            animation: "scaleIn 0.2s ease-out",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              ⚠️ Delete Article?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "20px" }}>
              Are you sure you want to permanently delete article <strong>"{deleteConfirmTitle}"</strong>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => {
                  setDeleteConfirmId(null)
                  setDeleteConfirmTitle("")
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={async () => {
                  const id = deleteConfirmId
                  setDeleteConfirmId(null)
                  setDeleteConfirmTitle("")
                  await executeDelete(id)
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

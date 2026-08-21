"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit2, Trash2, Layers, Plus } from "lucide-react"

interface TechStackListProps {
  initialTechStacks: any[]
}

export default function TechStackList({ initialTechStacks }: TechStackListProps) {
  const [techStacks, setTechStacks] = useState(initialTechStacks)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [deleteConfirmTitle, setDeleteConfirmTitle] = useState<string>("")

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteConfirmId(id)
    setDeleteConfirmTitle(name)
  }

  const executeDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/tech-stacks/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Delete failed")

      setTechStacks(techStacks.filter((t) => t.id !== id))
      setDeleteConfirmId(null)
    } catch (err) {
      console.error(err)
      alert("Failed to delete tech stack")
    }
  }

  const filtered = techStacks.filter((t) => {
    const nameText = (t.name || "").toLowerCase()
    const matchesSearch = nameText.includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || t.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="Search by name..."
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

        <Link href="/admin/tech-stack/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Tech Stack
        </Link>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="admin-empty">
          <Layers size={48} />
          <p>No tech stack items found.</p>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tech</th>
              <th>Order</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {t.icon_url ? (
                      <img
                        src={t.icon_url}
                        alt={t.name}
                        style={{ width: "32px", height: "32px", objectFit: "contain", borderRadius: "4px" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: t.color || "#2563eb",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "14px",
                        }}
                      >
                        {t.name ? t.name.charAt(0).toUpperCase() : "T"}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</div>
                      {t.color && (
                        <div style={{ fontSize: "11px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              background: t.color,
                            }}
                          />
                          {t.color}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>{t.sort_order ?? 0}</td>
                <td>
                  <span className={`admin-badge ${t.status}`}>
                    {t.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="admin-actions">
                    <Link
                      href={`/admin/tech-stack/${t.id}`}
                      className="admin-btn-icon"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(t.id, t.name)}
                      className="admin-btn-icon admin-btn-icon-danger"
                      title="Delete"
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="admin-modal-title">Delete Tech Stack Item</h3>
            <p className="admin-modal-body">
              Are you sure you want to delete <strong>"{deleteConfirmTitle}"</strong>? This action cannot be undone.
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

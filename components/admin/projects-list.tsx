"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ProjectsListProps {
  initialProjects: any[]
}

export default function ProjectsList({ initialProjects }: ProjectsListProps) {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleToggleFeatured = async (id: string, current: boolean) => {
    try {
      const response = await fetch(`/api/admin/projects/${id}/toggle-featured`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !current }),
      })
      if (!response.ok) throw new Error("Toggle featured failed")
      
      setProjects(
        projects.map((p) => (p.id === id ? { ...p, featured: !current } : p))
      )
    } catch (err) {
      console.error(err)
      alert("Failed to toggle featured status")
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete project: "${title}"?`)) return
    
    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Delete failed")

      setProjects(projects.filter((p) => p.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete project")
    }
  }

  const filtered = projects.filter((p) => {
    const titleText = (p.title.en || "").toLowerCase()
    const matchesSearch = titleText.includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <input
          type="text"
          className="admin-search"
          placeholder="Search by title or slug..."
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
          <option value="archived">Archived</option>
        </select>

        <Link href="/admin/projects/new" className="admin-quick-btn primary">
          ➕ New Project
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-empty">
          <div className="admin-empty-icon">📂</div>
          <h3 className="admin-empty-title">No projects found</h3>
          <p className="admin-empty-desc">Create your first project to showcase on the homepage!</p>
          <Link href="/admin/projects/new" className="admin-quick-btn primary">
            Create Project
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title (EN)</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Order</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr key={project.id}>
                  <td style={{ width: "80px" }}>
                    <div style={{ width: "60px", height: "40px", borderRadius: "8px", overflow: "hidden", background: "#f1f5f9", border: "1px solid #e2e8f0" }}>
                      {project.thumbnail_url ? (
                        <img
                          src={project.thumbnail_url}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#94a3b8" }}>
                          No image
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{project.title.en}</td>
                  <td style={{ color: "#64748b", fontSize: "13px" }}>{project.slug}</td>
                  <td>
                    <span className={`admin-badge ${project.status}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(project.id, project.featured)}
                      style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                    >
                      {project.featured ? "⭐" : "☆"}
                    </button>
                  </td>
                  <td>{project.sort_order}</td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(project.id, project.title.en)}
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

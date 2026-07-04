"use client"

import { useState } from "react"

interface DBMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  source: string
  created_at: string
}

interface MessagesViewProps {
  initialMessages: DBMessage[]
}

export default function MessagesView({ initialMessages }: MessagesViewProps) {
  const [messages, setMessages] = useState<DBMessage[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<DBMessage | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const handleSelectMessage = async (msg: DBMessage) => {
    setSelectedMessage(msg)
    
    // Mark as read automatically if it's new
    if (msg.status === "new") {
      try {
        const response = await fetch(`/api/admin/messages/${msg.id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" }),
        })
        if (!response.ok) throw new Error()
        
        // Update local state
        const updated = messages.map(m => m.id === msg.id ? { ...m, status: "read" as const } : m)
        setMessages(updated)
        setSelectedMessage({ ...msg, status: "read" })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleUpdateStatus = async (id: string, status: 'new' | 'read' | 'replied' | 'archived') => {
    try {
      const response = await fetch(`/api/admin/messages/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!response.ok) throw new Error()
      
      setMessages(messages.map(m => m.id === id ? { ...m, status } : m))
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status })
      }
    } catch (err) {
      console.error(err)
      alert("Failed to update status")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this message?")) return
    
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error()
      
      setMessages(messages.filter(m => m.id !== id))
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null)
      }
    } catch (err) {
      console.error(err)
      alert("Failed to delete message")
    }
  }

  const filtered = messages.filter(m => {
    if (statusFilter === "all") return true
    return m.status === statusFilter
  })

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", minHeight: "500px" }}>
      {/* Messages List Column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="admin-toolbar" style={{ marginBottom: 0 }}>
          <select
            className="admin-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "100%" }}
          >
            <option value="all">All Messages</option>
            <option value="new">Unread / New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">💬</div>
            <h3 className="admin-empty-title">Inbox is empty</h3>
            <p className="admin-empty-desc">No messages matching this status filter.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "600px", overflowY: "auto" }}>
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                style={{
                  padding: "16px",
                  background: selectedMessage?.id === msg.id ? "#e0f2fe" : "#ffffff",
                  border: `1px solid ${selectedMessage?.id === msg.id ? "#7dd3fc" : "#e2e8f0"}`,
                  borderRadius: "14px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  boxShadow: selectedMessage?.id === msg.id ? "0 10px 25px rgba(15, 23, 42, 0.06)" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600, fontSize: "14px" }}>{msg.name}</span>
                  <span className={`admin-badge ${msg.status}`} style={{ fontSize: "10px", padding: "2px 6px" }}>
                    {msg.status}
                  </span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 500, marginBottom: "4px" }}>{msg.subject}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Content detail Column */}
      <div>
        {selectedMessage ? (
          <div className="admin-message-detail">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "16px", fontWeight: 600 }}>{selectedMessage.subject}</h2>
              <div style={{ display: "flex", gap: "6px" }}>
                {selectedMessage.status !== "replied" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                  >
                    Mark Replied
                  </button>
                )}
                {selectedMessage.status !== "archived" ? (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, "archived")}
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                  >
                    Archive
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage.id, "read")}
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                  >
                    Unarchive
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="admin-btn admin-btn-danger admin-btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="admin-message-meta">
              <div className="admin-message-meta-item">
                <span className="admin-message-meta-label">From</span>
                <span className="admin-message-meta-value">{selectedMessage.name} ({selectedMessage.email})</span>
              </div>
              <div className="admin-message-meta-item">
                <span className="admin-message-meta-label">Date</span>
                <span className="admin-message-meta-value">{new Date(selectedMessage.created_at).toLocaleString()}</span>
              </div>
            </div>

            <div className="admin-message-body">{selectedMessage.message}</div>

            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginTop: "20px" }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                className="admin-quick-btn primary"
                onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
              >
                ✉️ Reply via Email
              </a>
            </div>
          </div>
        ) : (
          <div className="admin-empty" style={{ minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1px dashed #cbd5e1" }}>
            <div className="admin-empty-icon">📂</div>
            <h3 className="admin-empty-title">Select a message</h3>
            <p className="admin-empty-desc">Click on any message in the list to read it and send a reply.</p>
          </div>
        )}
      </div>
    </div>
  )
}

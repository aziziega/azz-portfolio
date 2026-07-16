"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { BarChart3, FileText, Home, Inbox, LayoutDashboard, LogOut, Mail, Newspaper, Settings, X } from "lucide-react"

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/site", label: "Site & Home", icon: Home },
  { href: "/admin/projects", label: "Work Projects", icon: FileText },
  { href: "/admin/writing", label: "Blog Writing", icon: Newspaper },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/messages", label: "Contact Inbox", icon: Inbox },
]

interface AdminSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const supabase = createClient()
        const { count, error } = await supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true })
          .eq("status", "new")

        if (!error && count !== null) {
          setUnreadCount(count)
        }
      } catch (err) {
        console.error("Failed to fetch unread count:", err)
      }
    }

    fetchUnreadCount()
    const interval = setInterval(fetchUnreadCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <>
      {isOpen && <button className="admin-sidebar-backdrop" aria-label="Close sidebar" onClick={onClose} />}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="url(#sgrad)" />
              <path d="M12 28L20 12L28 28H24L20 20L16 28H12Z" fill="white" />
              <defs>
                <linearGradient id="sgrad" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#10b981" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="admin-sidebar-brand-text">
            <span className="admin-sidebar-brand-name">AZZ</span>
            <span className="admin-sidebar-brand-sub">Portfolio CMS</span>
          </div>
          <button className="admin-sidebar-close" type="button" onClick={onClose} aria-label="Close sidebar">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-link ${isActive(item.href) ? "active" : ""}`}
                onClick={onClose}
              >
                <span className="admin-sidebar-link-icon"><Icon size={18} /></span>
                <span className="admin-sidebar-link-label" style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                  {item.label}
                  {item.href === "/admin/messages" && unreadCount > 0 && (
                    <span style={{
                      background: "#ef4444",
                      color: "#ffffff",
                      borderRadius: "9999px",
                      padding: "2px 6px",
                      fontSize: "11px",
                      fontWeight: 700,
                      lineHeight: 1,
                      minWidth: "16px",
                      textAlign: "center"
                    }}>
                      {unreadCount}
                    </span>
                  )}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-sidebar-link" target="_blank">
            <span className="admin-sidebar-link-icon"><BarChart3 size={18} /></span>
            <span className="admin-sidebar-link-label">View Site</span>
          </Link>
          <button onClick={() => setShowLogoutConfirm(true)} className="admin-sidebar-link admin-sidebar-logout">
            <span className="admin-sidebar-link-icon"><LogOut size={18} /></span>
            <span className="admin-sidebar-link-label">Logout</span>
          </button>
        </div>
      </aside>

      {showLogoutConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3 className="admin-modal-title">Confirm Logout</h3>
            <p className="admin-modal-body">
              Are you sure you want to log out of the Portfolio CMS?
            </p>
            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

"use client"

import { usePathname } from "next/navigation"
import { Menu, Bell } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

const pageTitles: Record<string, string> = {
  "/admin": "Overview",
  "/admin/projects": "Work Projects",
  "/admin/projects/new": "New Project",
  "/admin/messages": "Contact Inbox",
  "/admin/newsletter": "Newsletter",
  "/admin/writing": "Blog Writing",
  "/admin/site": "Site & Home",
}

interface AdminHeaderProps {
  onMenuClick?: () => void
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname()
  
  // Find the best matching title
  const title = Object.entries(pageTitles)
    .sort((a, b) => b[0].length - a[0].length)
    .find(([path]) => pathname.startsWith(path))?.[1] || "Admin"

  const now = new Date()
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening"

  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

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
    const countTimer = setInterval(fetchUnreadCount, 30000)

    return () => {
      clearInterval(timer)
      clearInterval(countTimer)
    }
  }, [])

  const formatDateTime = (date: Date) => {
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    const timeStr = date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    return `${dateStr} — ${timeStr}`
  }

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-menu-button" type="button" onClick={onMenuClick} aria-label="Open sidebar">
          <Menu size={20} />
        </button>
        <h1 className="admin-header-title">{title}</h1>
      </div>
      <div className="admin-header-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span className="admin-header-greeting">
          {greeting}, Azizi {currentTime ? `• ${formatDateTime(currentTime)}` : ""}
        </span>
        <Link 
          href="/admin/messages" 
          style={{ 
            position: "relative", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            color: "#64748b",
            transition: "color 0.15s"
          }}
          className="admin-bell-link"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              background: "#ef4444",
              color: "#ffffff",
              borderRadius: "9999px",
              width: "8px",
              height: "8px",
              boxShadow: "0 0 0 2px #ffffff"
            }} />
          )}
        </Link>
        <div className="admin-header-avatar">A</div>
      </div>
    </header>
  )
}

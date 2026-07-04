"use client"

import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"

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

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
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
      <div className="admin-header-right">
        <span className="admin-header-greeting">
          {greeting}, Azizi {currentTime ? `• ${formatDateTime(currentTime)}` : ""}
        </span>
        <div className="admin-header-avatar">A</div>
      </div>
    </header>
  )
}

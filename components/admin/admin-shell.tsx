"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { usePathname } from "next/navigation"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const isAuthPage = pathname === "/admin/login" || pathname.startsWith("/admin/auth")

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="admin-layout">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="admin-main">
        <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}

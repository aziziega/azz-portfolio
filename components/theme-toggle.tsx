"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse" />
    )
  }

  const isDark = resolvedTheme === "dark" || theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
      aria-label="Toggle Theme"
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      type="button"
      suppressHydrationWarning
    >
      {isDark ? (
        <Sun size={18} className="text-yellow-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon size={18} className="text-gray-700 dark:text-gray-300 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  )
}

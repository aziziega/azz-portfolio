"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center p-1 bg-secondary border border-border rounded-full w-[72px] h-9 animate-pulse" />
    )
  }

  const options = [
    { label: "light", icon: Sun },
    { label: "dark", icon: Moon },
  ]

  return (
    <div className="flex items-center p-1 bg-secondary/80 border border-border rounded-full relative">
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => setTheme(option.label)}
          className={cn(
            "relative z-10 flex items-center justify-center w-8 h-7 rounded-full text-muted-foreground transition-colors cursor-pointer",
            theme === option.label ? "text-foreground" : "hover:text-foreground/80"
          )}
          aria-label={`Switch to ${option.label} mode`}
          title={`${option.label.charAt(0).toUpperCase() + option.label.slice(1)} mode`}
        >
          <option.icon size={14} strokeWidth={2.5} />
          {theme === option.label && (
            <motion.div
              layoutId="theme-toggle-indicator"
              className="absolute inset-0 bg-background rounded-full shadow-xs border border-border/50"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ zIndex: -1 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

"use client"

import { useLanguage } from "@/contexts/language-contexts"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()
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
    { label: "en", title: "English" },
    { label: "id", title: "Indonesian" },
  ] as const

  return (
    <div className="flex items-center p-1 bg-secondary/80 border border-border rounded-full relative">
      {options.map((option) => (
        <button
          key={option.label}
          onClick={() => setLanguage(option.label)}
          className={cn(
            "relative z-10 flex items-center justify-center w-8 h-7 rounded-full text-xs font-bold text-muted-foreground transition-colors cursor-pointer uppercase",
            language === option.label ? "text-foreground" : "hover:text-foreground/80"
          )}
          aria-label={`Switch to ${option.title} language`}
          title={option.title}
        >
          {option.label}
          {language === option.label && (
            <motion.div
              layoutId="language-toggle-indicator"
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

"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-contexts"
import { motion } from "motion/react"
import { ArrowLeft, PenLine } from "lucide-react"

// --- Animation variants ---
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, ease: "easeOut", delay },
})

export default function BlogPageClient() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ── Canvas particle system ──────────────────────────────────────────────────
  useEffect(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return
    const canvas = canvasElement

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    const mouse = { x: 0, y: 0, radius: 150, isActive: false }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number; y: number; baseX: number; baseY: number
      size: number; vx: number; vy: number; density: number; color: string

      constructor(x: number, y: number) {
        this.x = x; this.y = y; this.baseX = x; this.baseY = y
        this.size = Math.random() * 2 + 1
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.density = Math.random() * 30 + 10
        this.color = ""
      }

      draw(isDark: boolean) {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${0.12 + this.size * 0.04})`
          : `rgba(0,0,0,${0.06 + this.size * 0.03})`
        ctx.fill()
      }

      update(isDark: boolean) {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy

        if (mouse.isActive) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius
            const dirX = dx / distance
            const dirY = dy / distance
            this.x += dirX * force * 1.5
            this.y += dirY * force * 1.5
            this.x += -dirY * force * 1.0
            this.y += dirX * force * 1.0
          }
        }
      }
    }

    const initParticles = () => {
      particles = []
      const n = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 120)
      for (let i = 0; i < n; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height))
      }
    }

    const connectParticles = (isDark: boolean) => {
      const maxDist = 120
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist && ctx) {
            const opacity = (1 - dist / maxDist) * 0.1
            ctx.strokeStyle = isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`
            ctx.lineWidth = 0.7
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      const isDark =
        document.documentElement.classList.contains("dark") ||
        (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => { p.update(isDark); p.draw(isDark) })
      connectParticles(isDark)
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX; mouse.y = e.clientY; mouse.isActive = true
    }
    const handleMouseLeave = () => { mouse.isActive = false }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 bg-white dark:bg-neutral-950">

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Subtle radial glow — neutral, not colored */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,0,0,0.04)_0%,transparent_100%)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,255,255,0.04)_0%,transparent_100%)]" />

      {/* ── Glass card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Outer border ring */}
        <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-neutral-200/80 to-neutral-100/30 dark:from-white/10 dark:to-white/0 pointer-events-none" />

        <div className="relative rounded-[28px] bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl shadow-[0_8px_48px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.5)] p-12 md:p-16 flex flex-col items-center justify-center text-center gap-6 overflow-hidden">

          {/* Subtle inner highlight at top */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent dark:via-white/10" />

          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/60 shadow-xs">
            <PenLine size={28} strokeWidth={1.5} className="text-neutral-700 dark:text-neutral-200" />
          </div>

          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-neutral-700/60 bg-neutral-50/80 dark:bg-neutral-800/60 text-[11px] font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neutral-500 dark:bg-neutral-400" />
            </span>
            {t("blog.comingSoon.badge")}
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white leading-snug">
            {t("blog.comingSoon.title")}
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-neutral-300 dark:bg-neutral-700" />

          {/* Description */}
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
            {t("blog.comingSoon.description")}
          </p>

          {/* Back button */}
          <div className="pt-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-neutral-200 dark:border-neutral-700/80 bg-neutral-50/80 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-white dark:hover:bg-neutral-800 transition-all duration-200 shadow-xs"
            >
              <ArrowLeft
                size={15}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              {t("blog.comingSoon.btnBack")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

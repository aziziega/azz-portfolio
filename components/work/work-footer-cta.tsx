"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, animate } from "motion/react"
import Link from "next/link"
import { ArrowRight, Sparkles, FolderGit2, Star, Cpu } from "lucide-react"
import { useLanguage } from "@/contexts/language-contexts"

interface WorkFooterCTAProps {
  projects: any[]
}

function CountUpNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(nodeRef, { once: true, margin: "-20px" })

  useEffect(() => {
    if (!isInView) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(end)
      return
    }

    const controls = animate(0, end, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.floor(latest))
      },
    })

    return () => controls.stop()
  }, [isInView, end])

  return (
    <span ref={nodeRef}>
      {displayValue}
      {suffix}
    </span>
  )
}

export default function WorkFooterCTA({ projects }: WorkFooterCTAProps) {
  const { t } = useLanguage()

  const projectCount = projects.length
  const featuredCount = projects.filter((p) => p.featured).length
  const techCount = new Set(projects.flatMap((p) => p.techStack || [])).size

  return (
    <section className="work-footer-cta-container">
      {/* Floating Stat Cards Container (Overlap negative margin) */}
      <div className="work-floating-stats-wrapper">
        <div className="work-floating-stats-grid">
          {/* Card 1: Total Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className="work-stat-card"
          >
            <div className="work-stat-card-icon blue">
              <FolderGit2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="work-stat-card-info">
              <span className="work-stat-card-number">
                <CountUpNumber end={projectCount} />
              </span>
              <span className="work-stat-card-label">
                {t("work.footer.stat.projects")}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="work-stat-card"
          >
            <div className="work-stat-card-icon amber">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div className="work-stat-card-info">
              <span className="work-stat-card-number">
                <CountUpNumber end={featuredCount} />
              </span>
              <span className="work-stat-card-label">
                {t("work.footer.stat.featured")}
              </span>
            </div>
          </motion.div>

          {/* Card 3: Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="work-stat-card"
          >
            <div className="work-stat-card-icon purple">
              <Cpu className="w-5 h-5 text-purple-600" />
            </div>
            <div className="work-stat-card-info">
              <span className="work-stat-card-number">
                <CountUpNumber end={techCount} suffix="+" />
              </span>
              <span className="work-stat-card-label">
                {t("work.footer.stat.tech")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dark Footer Body Section */}
      <div className="work-footer-dark-body">
        {/* Background Geometric Light Circles */}
        <div className="work-footer-geo-bg">
          <div className="work-footer-glow-1" />
          <div className="work-footer-glow-2" />
        </div>

        <div className="work-footer-content-inner">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="work-footer-pill-label"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline" />
            {t("work.footer.label")}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="work-footer-main-title"
          >
            {t("work.footer.title1")}{" "}
            <span className="work-footer-title-highlight">
              {t("work.footer.title2")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="work-footer-description"
          >
            {t("work.footer.text")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="work-footer-cta-buttons"
          >
            <Link href="/#contact" className="work-footer-btn-primary">
              <span>{t("work.footer.btn.primary")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/" className="work-footer-btn-secondary">
              {t("work.footer.btn.secondary")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

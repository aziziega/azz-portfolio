"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/language-contexts"

export default function WorkFooterCTA() {
  const { t } = useLanguage()

  return (
    <section className="work-footer-simple-container">
      <div className="work-footer-simple-inner">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="work-footer-pill-label-simple"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-blue-600" />
          {t("work.footer.label")}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
          className="work-footer-title-simple"
        >
          {t("work.footer.title1")}{" "}
          <span className="work-footer-title-highlight-blue">
            {t("work.footer.title2")}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          viewport={{ once: true }}
          className="work-footer-desc-simple"
        >
          {t("work.footer.text")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
          className="work-footer-cta-buttons"
        >
          <Link href="/#contact" className="work-footer-btn-primary">
            <span>{t("work.footer.btn.primary")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="work-footer-btn-secondary-simple">
            {t("work.footer.btn.secondary")}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

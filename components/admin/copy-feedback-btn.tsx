"use client"

import { useState } from "react"
import { Copy, Check, MessageSquareQuote } from "lucide-react"
import { toast } from "sonner"

interface CopyFeedbackBtnProps {
  token?: string
}

export default function CopyFeedbackBtn({ token = "azz-client-feedback-key" }: CopyFeedbackBtnProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // Otomatis menggunakan domain aktif (https://aziziem.xyz saat deploy, atau localhost saat dev)
      const baseUrl = typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : (process.env.NEXT_PUBLIC_SITE_URL || "https://aziziem.xyz")

      const url = `${baseUrl}/feedback?token=${token}`
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success(`Link Feedback berhasil disalin: ${url}`)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error(err)
      toast.error("Gagal menyalin link.")
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="admin-btn admin-btn-secondary"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
      }}
      title="Salin link formulir feedback untuk dikirimkan ke klien"
    >
      <MessageSquareQuote size={15} className="text-amber-500" />
      <span>{copied ? "Link Tersalin! ✅" : "Copy Feedback Link"}</span>
      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
    </button>
  )
}

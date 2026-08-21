import { Metadata } from "next"
import FeedbackForm from "@/components/feedback/feedback-form"
import { ShieldAlert, Home } from "lucide-react"
import Link from "next/link"
import "./feedback.css"

export const metadata: Metadata = {
  title: "Client Feedback & Testimonial — Azizi Egatri M.",
  description: "Share your experience and testimonial for completed collaboration projects.",
  robots: {
    index: false,
    follow: false,
  },
}

interface FeedbackPageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const params = await searchParams
  const token = params.token || ""

  const expectedToken = process.env.FEEDBACK_TOKEN || process.env.NEXT_PUBLIC_FEEDBACK_TOKEN || "azz-client-feedback-key"
  const isValidToken = Boolean(token && token === expectedToken)

  if (!isValidToken) {
    return (
      <main className="feedback-container">
        <div className="feedback-card feedback-denied-card animate-fadeIn">
          <div className="feedback-denied-icon">
            <ShieldAlert size={40} />
          </div>
          <h1 className="feedback-title" style={{ fontSize: "22px", marginBottom: "8px" }}>
            Akses Dibatasi (Access Restricted)
          </h1>
          <p className="feedback-subtitle" style={{ marginBottom: "24px" }}>
            Halaman formulir feedback ini khusus untuk client dan memerlukan tautan resmi dengan token akses yang valid.
          </p>
          <div>
            <Link href="/" className="feedback-home-btn">
              <Home size={16} style={{ marginRight: "8px", display: "inline" }} />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="feedback-container">
      <FeedbackForm token={token} />
    </main>
  )
}

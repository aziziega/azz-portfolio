"use client"

import { useEffect, useState } from "react"
import { Marquee } from "@/components/ui/marquee"
import { useLanguage } from "@/contexts/language-contexts"

export interface TestimonialItem {
  id?: string
  name: string
  username: string
  body: string
  profile: string
}

function ReviewCard({
  profile,
  name,
  username,
  body,
}: TestimonialItem) {
  const [imgError, setImgError] = useState(false)

  const getInitials = (text: string) => {
    if (!text || !text.trim()) return "CL"
    const parts = text.trim().split(" ")
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }

  return (
    <div
      style={{ padding: "24px" }}
      className="relative w-72 sm:w-80 shrink-0 cursor-pointer overflow-hidden border border-border bg-card shadow-none rounded-2xl flex flex-col gap-4 hover:border-primary/40 transition-colors"
    >
      {/* Author Header */}
      <div className="flex flex-row items-center gap-3">
        {profile && !imgError ? (
          <div className="relative size-10 rounded-full overflow-hidden shrink-0 border border-border/60">
            <img
              className="w-full h-full object-cover rounded-full aspect-square"
              alt={name}
              src={profile}
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div
            className="size-10 rounded-full shrink-0 flex items-center justify-center font-bold text-xs text-white shadow-sm"
            style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}
          >
            {getInitials(name)}
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          <p className="text-xs font-medium text-muted-foreground truncate">
            {username}
          </p>
        </div>
      </div>

      {/* Quote Body */}
      <p className="text-sm text-foreground/90 leading-relaxed font-normal">
        {body}
      </p>
    </div>
  )
}

export default function Testimonials() {
  const { language, t } = useLanguage()
  const [reviews, setReviews] = useState<TestimonialItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/testimonials?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data)) {
            const mapped: TestimonialItem[] = data.map((item: any, index: number) => {
              const roleInfo = [item.role, item.company].filter(Boolean).join(", ")
              const usernameClean = roleInfo || "Collaborator"
              return {
                id: item.id || `db-${index}`,
                name: item.name || "Anonymous",
                username: usernameClean,
                body: item.quote || "",
                profile: item.avatarUrl || "",
              }
            })
            setReviews(mapped)
          } else {
            setReviews([])
          }
        } else {
          setReviews([])
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [language])

  // If loading or no published testimonials found from DB, hide the section
  if (loading || reviews.length === 0) {
    return null
  }

  // Ensure enough items for smooth continuous marquee looping
  let extendedList = [...reviews]
  while (extendedList.length < 6) {
    extendedList = [...extendedList, ...reviews]
  }

  const mid = Math.ceil(extendedList.length / 2)
  const firstRow = extendedList.slice(0, mid)
  const secondRow = extendedList.slice(mid)

  return (
    <section className="section testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div id="testimonials" className="section-header animate-on-scroll">
          <h2 className="section-title">{t("testimonials.title")}</h2>
          <p className="section-subtitle">{t("testimonials.subtitle")}</p>
        </div>

        {/* Marquee - auto height cards, professional vertical gap between rows */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4 sm:gap-5">
          <Marquee pauseOnHover style={{ "--duration": "24s" } as React.CSSProperties} className="[--duration:24s] items-start">
            {firstRow.map((review, idx) => (
              <ReviewCard key={`${review.id || review.username}-r1-${idx}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover style={{ "--duration": "24s" } as React.CSSProperties} className="[--duration:24s] items-start">
            {secondRow.map((review, idx) => (
              <ReviewCard key={`${review.id || review.username}-r2-${idx}`} {...review} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </div>
    </section>
  )
}

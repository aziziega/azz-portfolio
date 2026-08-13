"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Marquee } from "@/components/ui/marquee"
import { useLanguage } from "@/contexts/language-contexts"

export interface TestimonialItem {
  id?: string
  name: string
  username: string
  body: string
  profile: string
}

const DEFAULT_AVATARS = [
  "https://images.shadcnspace.com/assets/profiles/rough.webp",
  "https://images.shadcnspace.com/assets/profiles/albert.webp",
  "https://images.shadcnspace.com/assets/profiles/linda.webp",
  "https://images.shadcnspace.com/assets/profiles/jessica.webp",
  "https://images.shadcnspace.com/assets/profiles/jenny.webp",
]

const PLACEHOLDER_REVIEWS: TestimonialItem[] = [
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.",
    profile: "https://images.shadcnspace.com/assets/profiles/rough.webp",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.",
    profile: "https://images.shadcnspace.com/assets/profiles/albert.webp",
  },
  {
    name: "Lirael Nassun",
    username: "@lnassun",
    body: "This is easily one of the most reliable SaaS tools we've adopted. The UI is intuitive, integrations are seamless, and it saves us countless hours every week.",
    profile: "https://images.shadcnspace.com/assets/profiles/linda.webp",
  },
  {
    name: "Jessica",
    username: "@jessica",
    body: "Switching to this platform streamlined our entire workflow. Setup was effortless, performance improved instantly, and our team now ships features faster without worrying about infrastructure.",
    profile: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "We evaluated multiple solutions, but this stood out immediately. It's fast, scalable, and thoughtfully designed for growing teams that need stability without added complexity.",
    profile: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
  },
]

function ReviewCard({
  profile,
  name,
  username,
  body,
}: TestimonialItem) {
  return (
    <div
      style={{ padding: "24px" }}
      className="relative w-72 sm:w-80 shrink-0 cursor-pointer overflow-hidden border border-border bg-card shadow-none rounded-2xl flex flex-col gap-4 hover:border-primary/40 transition-colors"
    >
      {/* Author Header */}
      <div className="flex flex-row items-center gap-3">
        <div className="relative size-10 rounded-full overflow-hidden shrink-0 border border-border/60">
          <img
            className="w-full h-full object-cover rounded-full aspect-square"
            alt={name}
            src={profile || DEFAULT_AVATARS[0]}
            onError={(e) => {
              ; (e.target as HTMLImageElement).src = DEFAULT_AVATARS[0]
            }}
          />
        </div>
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
  const [reviews, setReviews] = useState<TestimonialItem[]>(PLACEHOLDER_REVIEWS)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`/api/testimonials?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            const mapped: TestimonialItem[] = data.map((t: any, index: number) => {
              const roleInfo = [t.role, t.company].filter(Boolean).join(", ")
              const usernameClean = roleInfo || "Collaborator"
              return {
                id: t.id || `db-${index}`,
                name: t.name || "Anonymous",
                username: usernameClean,
                body: t.quote || "",
                profile: t.avatarUrl || DEFAULT_AVATARS[index % DEFAULT_AVATARS.length],
              }
            })
            setReviews(mapped)
          } else {
            setReviews(PLACEHOLDER_REVIEWS)
          }
        } else {
          setReviews(PLACEHOLDER_REVIEWS)
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err)
        setReviews(PLACEHOLDER_REVIEWS)
      }
    }

    fetchTestimonials()
  }, [language])

  const listToUse = reviews.length > 0 ? reviews : PLACEHOLDER_REVIEWS
  const extendedList =
    listToUse.length < 6 ? [...listToUse, ...listToUse] : listToUse

  const mid = Math.ceil(extendedList.length / 2)
  const firstRow = extendedList.slice(0, mid)
  const secondRow = extendedList.slice(mid)

  return (
    <section id="testimonials" className="section testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">{t("testimonials.title")}</h2>
          <p className="section-subtitle">{t("testimonials.subtitle")}</p>
        </div>

        {/* Marquee - auto height cards, professional vertical gap between rows */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4 sm:gap-5">
          <Marquee pauseOnHover style={{ "--duration": "24s" } as React.CSSProperties} className="[--duration:24s] items-start">
            {firstRow.map((review, idx) => (
              <ReviewCard key={`${review.username}-r1-${idx}`} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover style={{ "--duration": "24s" } as React.CSSProperties} className="[--duration:24s] items-start">
            {secondRow.map((review, idx) => (
              <ReviewCard key={`${review.username}-r2-${idx}`} {...review} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
      </div>
    </section>
  )
}

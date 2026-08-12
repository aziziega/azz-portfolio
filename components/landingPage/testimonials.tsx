"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLanguage } from "@/contexts/language-contexts"

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  image: string
}

function DecorIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-0 left-0 z-[1] size-3.5 shrink-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)] stroke-1 stroke-muted-foreground",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function QuoteIcon({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  )
}

function TestimonialCard({
  testimonial,
  index,
  className,
  ...props
}: React.ComponentProps<"figure"> & {
  testimonial: Testimonial
  index: number
}) {
  const { quote, name, role, company, image } = testimonial

  return (
    <figure
      className={cn(
        "group relative flex flex-col justify-between gap-6 px-8 pt-8 pb-6 shadow-xs md:translate-y-[calc(3rem*var(--t-card-index))]",
        "dark:bg-[radial-gradient(50%_80%_at_25%_0%,color-mix(in_oklab,var(--foreground)_10%,transparent),transparent)]",
        className,
      )}
      style={{ "--t-card-index": index } as React.CSSProperties}
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-border" />
      <div className="absolute -inset-y-4 -right-px w-px bg-border" />
      <div className="absolute -inset-x-4 -top-px h-px bg-border" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />
      <DecorIcon />

      <blockquote className="flex gap-4">
        <QuoteIcon
          aria-hidden="true"
          className="size-6 shrink-0 stroke-1 text-muted-foreground"
        />
        <p className="flex-1 font-normal text-base text-muted-foreground leading-relaxed">
          {quote}
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <Avatar className="size-10 rounded-full ring-2 ring-border ring-offset-2 ring-offset-background transition-shadow group-hover:ring-foreground/20">
          <AvatarImage alt={`${name}'s profile picture`} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <cite className="font-medium text-foreground text-sm not-italic">
            {name}
          </cite>
          <p className="text-muted-foreground text-xs">
            {role}
            {company && (
              <>, <span className="text-foreground/80">{company}</span></>
            )}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    quote: "Azizi delivered an outstanding fullstack application with incredible speed and clean code structure. Extremely reliable engineer!",
    name: "Alex Rivera",
    role: "Senior Product Manager",
    company: "Nexus Tech",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "Collaborating with Azizi was seamless. He translated complex design requirements into pixel-perfect, responsive React components effortlessly.",
    name: "Sarah Chen",
    role: "Lead UI/UX Designer",
    company: "Studio Vanguard",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote: "His expertise in Next.js, PostgreSQL, and Supabase saved our project timeline by weeks. Highly recommended for any serious web product!",
    name: "Budi Santoso",
    role: "CTO & Co-Founder",
    company: "Innova Digital",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
]

export default function Testimonials() {
  const { language, t } = useLanguage()
  const [testimonials, setTestimonials] = useState<Testimonial[]>(PLACEHOLDER_TESTIMONIALS)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`/api/testimonials?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          console.log("Testimonials API response:", data)
          if (Array.isArray(data) && data.length > 0) {
            const mapped: Testimonial[] = data.map((t: any) => ({
              quote: t.quote || "",
              name: t.name || "",
              role: t.role || "",
              company: t.company || "",
              image: t.avatarUrl || "",
            }))
            setTestimonials(mapped)
          } else {
            // Show placeholder data if DB is empty
            setTestimonials(PLACEHOLDER_TESTIMONIALS)
          }
        } else {
          console.error("Testimonials API error:", res.status, res.statusText)
          setTestimonials(PLACEHOLDER_TESTIMONIALS)
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err)
        setTestimonials(PLACEHOLDER_TESTIMONIALS)
      }
    }

    fetchTestimonials()
  }, [language])

  // Always render (with placeholder if needed)
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section
      id="testimonials"
      className="w-full px-6 py-16 md:py-24 bg-background text-foreground animate-on-scroll"
    >
      <div className="w-full">
        {/* Section Header — exactly matching demo.tsx structure */}
        <div className="mx-auto mb-20 max-w-xl text-center">
          <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
            Testimonials
          </p>
          <h2 className="mt-3 text-balance font-semibold text-3xl tracking-tight sm:text-4xl">
            {t("testimonials.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t("testimonials.subtitle")}
          </p>
        </div>

        {/* Cards Grid — exact copy of demo.tsx layout */}
        <div className="mx-auto -mt-10 grid w-full max-w-5xl gap-8 md:grid-cols-3 md:gap-6 pb-24">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              index={index}
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

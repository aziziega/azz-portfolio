"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-contexts"
import { type PublicTechStack } from "@/lib/cms/tech-stacks"
import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { ProgressiveBlur } from "@/components/ui/progressive-blur"

const FALLBACK_TECH_STACKS: PublicTechStack[] = [
  {
    id: "fallback-1",
    name: "Next.js",
    iconUrl: "https://cdn.simpleicons.org/nextdotjs/000000",
    color: "#000000",
    featured: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    name: "React",
    iconUrl: "https://cdn.simpleicons.org/react/000000",
    color: "#61DAFB",
    featured: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    name: "TypeScript",
    iconUrl: "https://cdn.simpleicons.org/typescript/000000",
    color: "#3178C6",
    featured: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-4",
    name: "Tailwind CSS",
    iconUrl: "https://cdn.simpleicons.org/tailwindcss/000000",
    color: "#06B6D4",
    featured: true,
    sortOrder: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-5",
    name: "Node.js",
    iconUrl: "https://cdn.simpleicons.org/nodedotjs/000000",
    color: "#339933",
    featured: true,
    sortOrder: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-6",
    name: "PostgreSQL",
    iconUrl: "https://cdn.simpleicons.org/postgresql/000000",
    color: "#4169E1",
    featured: true,
    sortOrder: 6,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-7",
    name: "Supabase",
    iconUrl: "https://cdn.simpleicons.org/supabase/000000",
    color: "#3ECF8E",
    featured: true,
    sortOrder: 7,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-8",
    name: "Git",
    iconUrl: "https://cdn.simpleicons.org/git/000000",
    color: "#F05032",
    featured: true,
    sortOrder: 8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-9",
    name: "Docker",
    iconUrl: "https://cdn.simpleicons.org/docker/000000",
    color: "#2496ED",
    featured: false,
    sortOrder: 9,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-10",
    name: "Vercel",
    iconUrl: "https://cdn.simpleicons.org/vercel/000000",
    color: "#000000",
    featured: true,
    sortOrder: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-11",
    name: "OpenAI",
    iconUrl: "https://cdn.simpleicons.org/openai/000000",
    color: "#10A37F",
    featured: true,
    sortOrder: 11,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-12",
    name: "ChatGPT",
    iconUrl: "https://cdn.simpleicons.org/chatgpt/000000",
    color: "#74AA9C",
    featured: true,
    sortOrder: 12,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-13",
    name: "Claude",
    iconUrl: "https://cdn.simpleicons.org/claude/000000",
    color: "#D97757",
    featured: true,
    sortOrder: 13,
    createdAt: new Date().toISOString(),
  },
  {
    id: "fallback-14",
    name: "Gemini",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
    color: "#8E75B2",
    featured: true,
    sortOrder: 14,
    createdAt: new Date().toISOString(),
  },
]

export default function TechStackUsed() {
  const { language, t } = useLanguage()
  const [techStacks, setTechStacks] = useState<PublicTechStack[]>(FALLBACK_TECH_STACKS)
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function fetchTechStacks() {
      try {
        const res = await fetch(`/api/tech-stacks?lang=${language}`)
        if (res.ok) {
          const data = await res.json()
          if (data.techStacks && data.techStacks.length > 0) {
            setTechStacks(data.techStacks)
          }
        }
      } catch (err) {
        console.error("TechStacks fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchTechStacks()
  }, [language])

  // Scroll observer to trigger animate-in
  useEffect(() => {
    if (loading || techStacks.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    )

    const section = document.getElementById("tech-stack-used")
    const els = section?.querySelectorAll(".animate-on-scroll")
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [loading, techStacks])

  if (!loading && techStacks.length === 0) {
    return null
  }

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  return (
    <section id="tech-stack-used" className="section tech-used-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <h2 className="section-title">{t("techUsed.title")}</h2>
          <p className="section-subtitle">{t("techUsed.subtitle")}</p>
        </div>

        {/* Infinite Slider Marquee Ticker (Image Only) */}
        {techStacks.length > 0 && (
          <div className="tech-used-marquee-wrap animate-on-scroll">
            <div className="relative py-4 overflow-hidden">
              <InfiniteSlider speed={35} speedOnHover={15} gap={56}>
                {techStacks.map((tech) => (
                  <div key={`marquee-${tech.id}`} className="tech-used-marquee-item" title={tech.name}>
                    {tech.iconUrl && !imageErrors[tech.id] ? (
                      <img
                        src={tech.iconUrl}
                        alt={tech.name}
                        className="tech-used-marquee-icon"
                        onError={() => handleImageError(tech.id)}
                      />
                    ) : (
                      <span className="tech-used-marquee-fallback">
                        {tech.name ? tech.name.charAt(0).toUpperCase() : "T"}
                      </span>
                    )}
                  </div>
                ))}
              </InfiniteSlider>

              <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-24 z-10"
                direction="left"
                blurIntensity={1}
              />
              <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-24 z-10"
                direction="right"
                blurIntensity={1}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

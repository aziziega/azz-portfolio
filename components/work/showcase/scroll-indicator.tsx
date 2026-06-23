"use client"

import { useEffect, useState } from "react"

interface ScrollIndicatorProps {
  totalProjects: number
}

export default function ScrollIndicator({ totalProjects }: ScrollIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate which project section is currently in view
      const sections = document.querySelectorAll('.showcase-section')
      let currentIndex = 0

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        // Check if section is in viewport (at least 50% visible)
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentIndex = index
        }
      })

      setActiveIndex(currentIndex)
    }

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="scroll-indicator">
      <div className="scroll-indicator-dots">
        {Array.from({ length: totalProjects }).map((_, index) => (
          <button
            key={index}
            className={`scroll-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => {
              // Scroll to corresponding section
              const sections = document.querySelectorAll('.showcase-section')
              sections[index]?.scrollIntoView({ behavior: 'smooth' })
            }}
            aria-label={`Go to project ${index + 1}`}
          >
            <span className="dot-inner"></span>
          </button>
        ))}
      </div>
    </div>
  )
}

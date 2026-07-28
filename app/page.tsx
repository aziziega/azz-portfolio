"use client"

import Blog from "@/components/landingPage/blog"
import Contact from "@/components/landingPage/contact"
import HeroSection from "@/components/landingPage/hero-section"
import LineAvailable from "@/components/landingPage/line-available"
import Newsletter from "@/components/landingPage/newletter"
import Work from "@/components/landingPage/work"
import Footer from "@/components/landingPage/footer"
import { useEffect, useState } from "react"


export default function Portfolio() {

  useEffect(() => {
    const animateText = (element: Element) => {
      const text = element.textContent || ""
      const words = text.split(" ")
      let html = ""
      let totalChars = 0

      words.forEach((word, wordIndex) => {
        const letters = word.split("")
        letters.forEach((letter) => {
          const delay = totalChars * 0.03
          html += `<span class="letter-blur" style="animation-delay: ${delay}s">${letter}</span>`
          totalChars++
        })
        if (wordIndex < words.length - 1) {
          html += " "
          totalChars++
        }
      })

      element.innerHTML = html
    }

    const textElements = document.querySelectorAll(
      ".section-title, .newsletter h2, .blog-section h2, .contact-section h2",
    )
    textElements.forEach((el) => {
      if (!el.classList.contains("animated")) {
        animateText(el)
        el.classList.add("animated")
      }
    })

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://aziziem.xyz/",
            "name": "Azizi Egatri Mu'thi",
            "alternateName": [
              "AZIZI EGATRI MU'THI",
              "Azizi Egatri Muthi",
              "azizi egatri muthi",
              "AZIZI EGATRI MUTHI",
              "Azizi Egatri M.",
              "aziziem",
            ],
            "url": "https://aziziem.xyz",
            "image": "https://aziziem.xyz/me-02.jpg",
            "email": "aziziegatrim@gmail.com",
            "jobTitle": "Software Engineer & Product Builder",
            "description":
              "Software Engineer & Product Builder based in Indonesia. Building scalable web products, innovative digital platforms, and user-centric solutions that solve real-world problems with clean code and thoughtful engineering.",
            "knowsAbout": [
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Supabase",
              "PostgreSQL",
              "Web Development",
              "UI/UX Design",
              "Product Engineering",
              "Full-Stack Development",
              "Digital Product Building",
              "Problem Solving",
              "Software Architecture",
              "CRM Systems",
              "ERP Solutions",
            ],
            "worksFor": {
              "@type": "Organization",
              "name": "Independent / Freelance",
              "url": "https://aziziem.xyz",
            },
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Jawa Tengah",
              "addressCountry": "ID",
            },
            "sameAs": [
              "https://github.com/aziziega",
              "https://www.linkedin.com/in/aziziem/",
              "https://aziziem.xyz",
            ],
          }),
        }}
      />
      <main>
        <HeroSection />
        {/* <TechStack /> */}
        <LineAvailable />
        <Work />
        <Blog />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

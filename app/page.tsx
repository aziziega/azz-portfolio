"use client"

import Blog from "@/components/landingPage/blog"
import Contact from "@/components/landingPage/contact"
import HeroSection from "@/components/landingPage/hero-section"
import LineAvailable from "@/components/landingPage/line-available"
import Newsletter from "@/components/landingPage/newletter"
import Work from "@/components/landingPage/work"
import Footer from "@/components/landingPage/footer"
import TechStack from "@/components/landingPage/tech-stack"
import Header from "@/components/landingPage/header"
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
      <main>
        <Header />
        <HeroSection />
        <LineAvailable />
        <Work />
        <TechStack />
        <Blog />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

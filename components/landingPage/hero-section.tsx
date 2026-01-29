"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-contexts"

export default function HeroSection() {
    const { t } = useLanguage()
    const [typedText, setTypedText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const fullText = "Azizi E. M."

    useEffect(() => {
        const typingSpeed = isDeleting ? 80 : 150
        const pauseDuration = 2000

        const timer = setTimeout(() => {
            if (!isDeleting && typedText.length < fullText.length) {
                setTypedText(fullText.substring(0, typedText.length + 1))
            } else if (isDeleting && typedText.length > 0) {
                setTypedText(fullText.substring(0, typedText.length - 1))
            } else if (!isDeleting && typedText.length === fullText.length) {
                setTimeout(() => setIsDeleting(true), pauseDuration)
            } else if (isDeleting && typedText.length === 0) {
                setIsDeleting(false)
            }
        }, typingSpeed)

        return () => clearTimeout(timer)
    }, [typedText, isDeleting])


    return (
        <>
            <section id="about" className="hero animate-on-scroll">
                <div className="container">
                    <div className="hero-layout">
                        <div className="hero-vertical-name">
                            {typedText}
                            <span className="typing-cursor">|</span>
                        </div>
                        <div className="hero-content-wrapper">
                            <div className="hero-image-container animate-on-scroll">
                                <div className="hero-image-bg"></div>
                                <img src="/images/azizi_photo1-rmbg.png" alt="Profile" className="hero-image" />
                            </div>
                            <div className="hero-content">
                                <span className="hero-role">Front - End Web Developer</span>
                                <div className="hero-location">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Prambanan, Klaten, Jawa Tengah Indonesia
                                </div>
                                <p className="hero-bio">
                                    {t("hero.bio")}    
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

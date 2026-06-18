"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-contexts"
import LanyardWithControls from "@/components/lanyard-with-control"

export default function HeroSection() {
    const { t } = useLanguage()
    const [typedText, setTypedText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const fullText = "Azizi E.M."

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
                                <span className="hero-role">Fullstack Web Developer</span>
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

                    {/* Interactive 3D Lanyard - Desktop only (hidden on mobile) */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
                        <div className="relative w-full h-full pointer-events-auto">
                            <LanyardWithControls
                                position={[0, 0, 20]}
                                containerClassName="absolute bottom-8 lg:bottom-12 -left-8 lg:-left-12 w-full max-w-sm lg:max-w-md h-[600px] lg:h-[700px]"
                                defaultName="Azizi E.M."
                                defaultVariant="plain"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-contexts"
import LanyardWithControls from "@/components/lanyard-with-control"
import { GlassButton } from "@/components/ui/GlassButton"

export default function HeroSection() {
    const { t, language } = useLanguage()
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
                                <div className="hero-image-badges">
                                    <div className="badge">
                                        <span>Bahasa</span>
                                    </div>
                                    <div className="badge">
                                        {/* <span className="badge-icon">{language === "en" ? "🇬🇧" : "🇮🇩"}</span> */}
                                        <span>English</span>
                                    </div>
                                </div>
                            </div>
                            {/* Language Badges - Below Profile */}
                            <div className="hero-content">
                                <span className="hero-role">Fullstack Web Developer</span>
                                <div className="hero-location">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Prambanan, Klaten, Jawa Tengah Indonesia
                                </div>
                                {/* Social Links */}
                                <div className="hero-social-links">
                                    <a href="https://github.com/aziziega" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center gap-2 px-4 py-2 !bg-black hover:!bg-gray-900 !rounded-full text-sm font-medium text-white transition-all cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                        </svg>
                                        <span>GitHub</span>
                                    </a>
                                    <a href="https://www.linkedin.com/in/aziziem/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center gap-2 px-4 py-2 !bg-black hover:!bg-gray-900 !rounded-full text-sm font-medium text-white transition-all cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href="https://x.com/AziZiega" target="_blank" rel="noopener noreferrer" aria-label="X" className="inline-flex items-center gap-2 px-4 py-2 !bg-black hover:!bg-gray-900 !rounded-full text-sm font-medium text-white transition-all cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                        <span>X</span>
                                    </a>
                                    <a href="mailto:aziziegatrim@gmail.com" aria-label="Email" className="inline-flex items-center gap-2 px-4 py-2 !bg-black hover:!bg-gray-900 !rounded-full text-sm font-medium text-white transition-all cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="4" width="20" height="16" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <span>Email</span>
                                    </a>
                                    <a href="/resume" aria-label="View Resume" className="inline-flex items-center gap-2 px-4 py-2 !bg-black hover:!bg-gray-900 !rounded-full text-sm font-medium text-white transition-all cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="16" y1="13" x2="8" y2="13" />
                                            <line x1="16" y1="17" x2="8" y2="17" />
                                            <polyline points="10 9 9 9 8 9" />
                                        </svg>
                                        <span>Resume</span>
                                    </a>
                                </div>
                                <p className="hero-bio">
                                    {t("hero.bio")}
                                </p>
                            </div>
                        </div>
                    </div>



                    {/* Interactive 3D Lanyard - Desktop only (hidden on mobile) */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none z-10">
                        <div className="relative w-full h-full">
                            <LanyardWithControls
                                position={[0, 0, 20]}
                                containerClassName="absolute top-0 lg:top-0 -left-8 lg:-left-12 w-full max-w-[16rem] lg:max-w-xs h-[500px] lg:h-[600px]"
                                defaultName="Azizi E.M."
                                defaultVariant="plain"
                            />
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-contexts"
import { Globe } from "lucide-react"

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [mounted, setMounted] = useState(false)
    const { language, setLanguage, t } = useLanguage()
    const pathname = usePathname()

    // Set mounted to true on client-side to prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    // Hide header on standalone resume pages and admin pages (placed after hooks to avoid hook order mismatch)
    if (pathname?.startsWith("/resume") || pathname?.startsWith("/admin")) return null

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "id" : "en")
    }

    // Format time for Asia/Jakarta timezone
    const formatTime = () => {
        return currentTime.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Jakarta',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
    }

    const handleLinkClick = () => {
        setMobileMenuOpen(false)
    }
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <Link href="/" className="logo">Azizi Egatri M.</Link>
                        <div className="nav-links">
                            <Link href="/">{t("nav.about")}</Link>
                            <Link href="/work">{t("nav.work")}</Link>
                            <a href="/#certificates">{t("nav.certifications")}</a>
                            <Link href="/blog">{t("nav.blog")}</Link>
                            <a href="/#testimonials">{t("nav.testimonials")}</a>
                            <a href="/#contact">{t("nav.contact")}</a>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 ml-auto md:ml-0 mr-1 sm:mr-0">
                            {/* Language Toggle with Dots */}
                            {mounted && (
                                <div className="flex flex-col items-center gap-1">
                                    <button
                                        onClick={toggleLanguage}
                                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 !bg-black hover:!bg-gray-800 !rounded-full text-xs sm:text-sm font-semibold text-white transition-all cursor-pointer"
                                        aria-label={`Switch to ${language === "en" ? "Indonesian" : "English"} language`}
                                        title={`Current language: ${language === "en" ? "English" : "Indonesian"}`}
                                    >
                                        <Globe size={16} className="text-white" />
                                        <span className="uppercase">{language.toUpperCase()}</span>
                                    </button>
                                    {/* Dot Indicators: 1 dot = EN, 2 dots = ID */}
                                    <div className="flex items-center gap-1">
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${language === "en" ? "bg-black" : "bg-gray-300"}`}></div>
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors ${language === "id" ? "bg-black" : "bg-gray-300"}`}></div>
                                    </div>
                                </div>
                            )}


                            {/* Live Clock - Asia/Jakarta */}
                            {mounted && (
                                <div className="inline-flex flex-col items-center justify-center px-2 sm:px-4 py-1.5 sm:py-2 transition-all">
                                    <span className="text-xs sm:text-sm font-mono font-semibold text-gray-900">
                                        {formatTime()}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-gray-400">
                                        Asia/Jakarta
                                    </span>
                                </div>
                            )}
                        </div>

                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {mobileMenuOpen ? (
                                    <>
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </>
                                ) : (
                                    <>
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </nav>
                </div>
                {mobileMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-menu-links">
                            <Link href="/" onClick={handleLinkClick}>
                                {t("nav.about")}
                            </Link>
                            <Link href="/work" onClick={handleLinkClick}>
                                {t("nav.work")}
                            </Link>
                            <a href="/#certificates" onClick={handleLinkClick}>
                                {t("nav.certifications")}
                            </a>
                            <Link href="/blog" onClick={handleLinkClick}>
                                {t("nav.blog")}
                            </Link>
                            <a href="/#testimonials" onClick={handleLinkClick}>
                                {t("nav.testimonials")}
                            </a>
                            <a href="/#contact" onClick={handleLinkClick}>
                                {t("nav.contact")}
                            </a>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
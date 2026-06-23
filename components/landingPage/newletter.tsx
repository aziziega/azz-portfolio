"use client"

import { useLanguage } from "@/contexts/language-contexts"
import { useEffect, useState } from "react"

export default function Newsletter() {
    const { t } = useLanguage()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <>
            <section className="newsletter animate-on-scroll py-16 md:py-24">
                <div className="container">
                    <div className="newsletter-inner max-w-2xl mx-auto">
                        <h2 className="mb-4 text-center">{t("newsletter.title")}</h2>
                        <p className="mb-8 text-center text-muted-foreground">{t("newsletter.subtitle")}</p>
                        <form className="form-group mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                            <input
                                type="email"
                                placeholder={t("newsletter.placeholder")}
                                aria-label="Email address"
                                className="flex-1 px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <button
                                type="submit"
                                className="btn-subscribe px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                            >
                                {t("newsletter.button")}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
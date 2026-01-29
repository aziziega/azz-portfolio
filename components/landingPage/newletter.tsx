"use client"

import { useLanguage } from "@/contexts/language-contexts"

export default function Newsletter() {
    const { t } = useLanguage()
    return (
        <>
            <section className="newsletter animate-on-scroll">
                <div className="container">
                    <div className="newsletter-inner">
                        <h2>{t("newsletter.title")}</h2>
                        <p>{t("newsletter.subtitle")}</p>
                        <form className="form-group">
                            <input type="email" placeholder={t("newsletter.placeholder")} aria-label="Email address" />
                            <button type="submit" className="btn-subscribe">
                                {t("newsletter.button")}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
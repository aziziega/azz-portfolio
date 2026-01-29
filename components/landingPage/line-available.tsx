"use client"

import { useLanguage } from "@/contexts/language-contexts"

export default function LineAvailable() {
    const { t } = useLanguage()

    return (
        <>
            <div className="marquee-wrapper">
                <div className="marquee-content">
                    <div className="marquee-text">
                        <span>{t("lineAvailable.available")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.services")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.cta")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.available")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.services")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.cta")}</span>
                        <span className="marquee-dot">•</span>
                    </div>
                    <div className="marquee-text" aria-hidden="true">
                        <span>{t("lineAvailable.available")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.services")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.cta")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.available")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.services")}</span>
                        <span className="marquee-dot">•</span>
                        <span>{t("lineAvailable.cta")}</span>
                        <span className="marquee-dot">•</span>
                    </div>
                </div>
            </div>
        </>
    )
}
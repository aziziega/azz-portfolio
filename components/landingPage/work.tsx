"use client"

import { LogoCloud } from "./logo-cloud";
import TechStack from "./tech-stack";
import { useLanguage } from "@/contexts/language-contexts";

export default function Work() {
    const { t } = useLanguage()
    return (
        <>
            <section id="work" className="section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">{t("work.title")}</h2>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="view-all">
                            {t("work.viewAll")}
                        </a>
                    </div>
                    <div className="grid">
                        <article className="card animate-on-scroll">
                            <img src="/modern-design-system-interface.png" alt="Project 1" className="card-image" />
                            <div className="card-content">
                                <span className="card-tag">{t("work.project1.tag")}</span>
                                <h3 className="card-title">{t("work.project1.title")}</h3>
                                <p className="card-desc">
                                    {t("work.project1.desc")}
                                </p>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <img src="/mobile-app-interface.png" alt="Project 2" className="card-image" />
                            <div className="card-content">
                                <span className="card-tag">{t("work.project2.tag")}</span>
                                <h3 className="card-title">{t("work.project2.title")}</h3>
                                <p className="card-desc">
                                    {t("work.project2.desc")}
                                </p>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <img src="/modern-ecommerce-website.png" alt="Project 3" className="card-image" />
                            <div className="card-content">
                                <span className="card-tag">{t("work.project3.tag")}</span>
                                <h3 className="card-title">{t("work.project3.title")}</h3>
                                <p className="card-desc">
                                    {t("work.project3.desc")}
                                </p>
                            </div>
                        </article>
                        {/* <TechStack /> */}
                    </div>
                    {/* <TechStack /> */}
                </div>
            </section>
        </>
    )
}
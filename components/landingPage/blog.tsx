"use client"

import { useLanguage } from "@/contexts/language-contexts"

export default function Blog() {
    const { t } = useLanguage()
    return (
        <>
            <section id="blog" className="section blog-section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">{t("blog.title")}</h2>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="view-all">
                            {t("blog.viewAll")}
                        </a>
                    </div>
                    <div className="grid">
                        <article className="card animate-on-scroll">
                            <div className="card-content">
                                <span className="card-tag">{t("blog.article1.tag")}</span>
                                <div className="blog-date">{t("blog.article1.date")}</div>
                                <h3 className="card-title">{t("blog.article1.title")}</h3>
                                <p className="card-desc">
                                    {t("blog.article1.desc")}
                                </p>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="read-more">
                                    {t("blog.readMore")}
                                </a>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <div className="card-content">
                                <span className="card-tag">{t("blog.article2.tag")}</span>
                                <div className="blog-date">{t("blog.article2.date")}</div>
                                <h3 className="card-title">{t("blog.article2.title")}</h3>
                                <p className="card-desc">
                                    {t("blog.article2.desc")}
                                </p>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="read-more">
                                    {t("blog.readMore")}
                                </a>
                            </div>
                        </article>

                        <article className="card animate-on-scroll">
                            <div className="card-content">
                                <span className="card-tag">{t("blog.article3.tag")}</span>
                                <div className="blog-date">{t("blog.article3.date")}</div>
                                <h3 className="card-title">{t("blog.article3.title")}</h3>
                                <p className="card-desc">
                                    {t("blog.article3.desc")}
                                </p>
                                <a href="#" target="_blank" rel="noopener noreferrer" className="read-more">
                                    {t("blog.readMore")}
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}
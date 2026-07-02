"use client"

import { getFeaturedExternalWriting } from "@/data/blogs"
import { useLanguage } from "@/contexts/language-contexts"

export default function Blog() {
    const { language, t } = useLanguage()
    const writings = getFeaturedExternalWriting(language, 3)

    return (
        <>
            <section id="blog" className="section blog-section">
                <div className="container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">{t("blog.title")}</h2>
                        <a href="/blog" className="view-all">
                            {t("blog.viewAll")}
                        </a>
                    </div>
                    <div className="grid">
                        {writings.map((writing) => (
                            <article key={writing.id} className="card animate-on-scroll">
                                <div className="card-content">
                                    <span className="card-tag">{writing.platform} / {writing.category}</span>
                                    <div className="blog-date">{writing.date} · {writing.readTime}</div>
                                    <h3 className="card-title">{writing.title}</h3>
                                    <p className="card-desc">{writing.excerpt}</p>
                                    <a href={writing.url} target="_blank" rel="noopener noreferrer" className="read-more">
                                        {t("blog.readMore")}
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

"use client"

import { useLanguage } from "@/contexts/language-contexts"

export default function Contact() {
    const { t } = useLanguage()
    return (
        <>
            <section id="contact" className="section contact-section">
                <div className="container">
                    <div className="contact-wrapper animate-on-scroll">
                        <div className="contact-info">
                            <h2 className="section-title">{t("contact.title")}</h2>
                            <p className="contact-desc">
                                {t("contact.subtitle")}
                            </p>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="m2 7 10 7 10-7" />
                                    </svg>
                                    <span>{t("contact.email")}</span>
                                </div>
                                <div className="contact-item">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span>{t("contact.location")}</span>
                                </div>
                            </div>
                        </div>
                        <form className="contact-form">
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="name">{t("contact.form.name")}</label>
                                    <input type="text" id="name" name="name" placeholder={t("contact.form.namePlaceholder")} required />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">{t("contact.form.email")}</label>
                                    <input type="email" id="email" name="email" placeholder={t("contact.form.emailPlaceholder")} required />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="subject">{t("contact.form.subject")}</label>
                                <input type="text" id="subject" name="subject" placeholder={t("contact.form.subjectPlaceholder")} required />
                            </div>
                            <div className="form-field">
                                <label htmlFor="message">{t("contact.form.message")}</label>
                                <textarea id="message" name="message" rows={5} placeholder={t("contact.form.messagePlaceholder")} required></textarea>
                            </div>
                            <button type="submit" className="btn-submit">
                                {t("contact.form.submit")}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
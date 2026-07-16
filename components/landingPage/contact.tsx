"use client"

import { useLanguage } from "@/contexts/language-contexts"
import { useState } from "react"

export default function Contact() {
    const { t } = useLanguage()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [nameHoney, setNameHoney] = useState("")
    
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess(false)

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message, name_honey: nameHoney }),
            })

            const data = await response.json()
            if (!response.ok) {
                if (data.errors) {
                    const errorMessages = Object.values(data.errors)
                        .map((msgs: any) => msgs.join(", "))
                        .join(", ")
                    throw new Error(errorMessages)
                }
                throw new Error(data.message || "Failed to send message")
            }

            setSuccess(true)
            setName("")
            setEmail("")
            setSubject("")
            setMessage("")
            setNameHoney("")
        } catch (err: any) {
            console.error(err)
            setError(err.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section id="contact" className="section contact-section">
                <div className="container">
                    <div className="contact-wrapper animate-on-scroll">
                        <div className="contact-info">
                            <h2 className="section-title" suppressHydrationWarning>{t("contact.title")}</h2>
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
                        <form onSubmit={handleSubmit} className="contact-form">
                            {success && (
                                <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", padding: "12px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
                                    Message sent successfully! Thank you.
                                </div>
                            )}
                            {error && (
                                <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171", padding: "12px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" }}>
                                    {error}
                                </div>
                            )}
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="name">{t("contact.form.name")}</label>
                                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.form.namePlaceholder")} required disabled={loading} />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email">{t("contact.form.email")}</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.form.emailPlaceholder")} required disabled={loading} />
                                </div>
                            </div>
                            {/* Honeypot field (hidden from real users, traps bots) */}
                            <div style={{ display: "none" }} aria-hidden="true">
                                <label htmlFor="name_honey">Leave this field blank</label>
                                <input
                                    type="text"
                                    id="name_honey"
                                    value={nameHoney}
                                    onChange={(e) => setNameHoney(e.target.value)}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="subject">{t("contact.form.subject")}</label>
                                <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={t("contact.form.subjectPlaceholder")} required disabled={loading} />
                            </div>
                            <div className="form-field">
                                <label htmlFor="message">{t("contact.form.message")}</label>
                                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder={t("contact.form.messagePlaceholder")} required disabled={loading}></textarea>
                            </div>
                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? "Sending..." : t("contact.form.submit")}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
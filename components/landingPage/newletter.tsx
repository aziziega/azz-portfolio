"use client"

import { useLanguage } from "@/contexts/language-contexts"
import { useEffect, useState } from "react"

export default function Newsletter() {
    const { t } = useLanguage()
    const [mounted, setMounted] = useState(false)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")
        setIsError(false)

        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || "Failed to subscribe")
            }

            setMessage(data.message || "Successfully subscribed!")
            setEmail("")
        } catch (err: any) {
            console.error(err)
            setMessage(err.message || "Something went wrong")
            setIsError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className="newsletter animate-on-scroll py-16 md:py-24">
                <div className="container">
                    <div className="newsletter-inner max-w-2xl mx-auto">
                        <h2 className="mb-4 text-center">{t("newsletter.title")}</h2>
                        <p className="mb-8 text-center text-muted-foreground">{t("newsletter.subtitle")}</p>
                        
                        {message && (
                            <div style={{
                                padding: "12px",
                                borderRadius: "6px",
                                background: isError ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                                border: `1px solid ${isError ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
                                color: isError ? "#f87171" : "#34d399",
                                fontSize: "14px",
                                marginBottom: "16px",
                                textAlign: "center"
                            }}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="form-group mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                            <input
                                type="email"
                                placeholder={t("newsletter.placeholder")}
                                aria-label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="flex-1 px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-subscribe px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap"
                            >
                                {loading ? "Subscribing..." : t("newsletter.button")}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
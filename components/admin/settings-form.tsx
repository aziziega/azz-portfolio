"use client"

import { useState } from "react"
import LocalizedField from "./localized-field"

interface SettingsFormProps {
  initialSettings: Record<string, any>
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Hero Copy Settings
  const [hero, setHero] = useState(
    initialSettings.hero || {
      en: { role: "", location: "", bio: "" },
      id: { role: "", location: "", bio: "" },
    }
  )

  // Social Links Settings
  const [socials, setSocials] = useState(
    initialSettings.social_links || {
      resume: "",
      github: "",
      linkedin: "",
      email: "",
    }
  )

  // Contact Info Settings
  const [contact, setContact] = useState(
    initialSettings.contact || {
      en: { email: "", location: "" },
      id: { email: "", location: "" },
    }
  )

  // SEO Home Settings
  const [seo, setSeo] = useState(
    initialSettings.seo_home || {
      en: { title: "", description: "" },
      id: { title: "", description: "" },
    }
  )

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError("")

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hero,
          social_links: socials,
          contact,
          seo_home: seo,
        }),
      })

      if (!response.ok) throw new Error("Failed to save settings")
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to save settings")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="admin-form">
      {success && <div className="admin-toast success">⚙️ Site settings saved successfully!</div>}
      {error && <div className="admin-login-error">{error}</div>}

      {/* Hero Configuration */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px" }}>
        <h3 className="admin-section-title" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
          👋 Hero & Introduction
        </h3>
        
        <LocalizedField
          label="Hero Role"
          valueEn={hero.en.role}
          valueId={hero.id.role}
          onChangeEn={(val) => setHero({ ...hero, en: { ...hero.en, role: val } })}
          onChangeId={(val) => setHero({ ...hero, id: { ...hero.id, role: val } })}
        />

        <LocalizedField
          label="Hero Location"
          valueEn={hero.en.location}
          valueId={hero.id.location}
          onChangeEn={(val) => setHero({ ...hero, en: { ...hero.en, location: val } })}
          onChangeId={(val) => setHero({ ...hero, id: { ...hero.id, location: val } })}
        />

        <LocalizedField
          label="Bilingual Bio Paragraph"
          valueEn={hero.en.bio}
          valueId={hero.id.bio}
          onChangeEn={(val) => setHero({ ...hero, en: { ...hero.en, bio: val } })}
          onChangeId={(val) => setHero({ ...hero, id: { ...hero.id, bio: val } })}
          type="textarea"
        />
      </div>

      {/* Social Links Configuration */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px" }}>
        <h3 className="admin-section-title" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
          🔗 Social Accounts & Links
        </h3>
        
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">Resume PDF link (URL or public/ path)</label>
            <input
              type="text"
              className="admin-form-input"
              value={socials.resume}
              onChange={(e) => setSocials({ ...socials, resume: e.target.value })}
              placeholder="e.g. /cv_azizi.pdf"
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">GitHub URL</label>
            <input
              type="url"
              className="admin-form-input"
              value={socials.github}
              onChange={(e) => setSocials({ ...socials, github: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-form-label">LinkedIn URL</label>
            <input
              type="url"
              className="admin-form-input"
              value={socials.linkedin}
              onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Admin Notification Email Address</label>
          <input
            type="email"
            className="admin-form-input"
            value={socials.email}
            onChange={(e) => setSocials({ ...socials, email: e.target.value })}
            placeholder="e.g. aziziegatrim@gmail.com"
          />
        </div>
      </div>

      {/* Contact Section Configuration */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px" }}>
        <h3 className="admin-section-title" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
          💬 Contact Section Details
        </h3>
        
        <div className="admin-form-row">
          <LocalizedField
            label="Inquiries Email"
            valueEn={contact.en.email}
            valueId={contact.id.email}
            onChangeEn={(val) => setContact({ ...contact, en: { ...contact.en, email: val } })}
            onChangeId={(val) => setContact({ ...contact, id: { ...contact.id, email: val } })}
            placeholderEn="aziziegatrim@gmail.com"
            placeholderId="aziziegatrim@gmail.com"
          />
          <LocalizedField
            label="Contact Location Copy"
            valueEn={contact.en.location}
            valueId={contact.id.location}
            onChangeEn={(val) => setContact({ ...contact, en: { ...contact.en, location: val } })}
            onChangeId={(val) => setContact({ ...contact, id: { ...contact.id, location: val } })}
            placeholderEn="Klaten, Central Java"
            placeholderId="Klaten, Jawa Tengah"
          />
        </div>
      </div>

      {/* SEO Configuration */}
      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px" }}>
        <h3 className="admin-section-title" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px" }}>
          🔍 Global SEO Metadata (Homepage)
        </h3>
        
        <LocalizedField
          label="Default Meta Title"
          valueEn={seo.en.title}
          valueId={seo.id.title}
          onChangeEn={(val) => setSeo({ ...seo, en: { ...seo.en, title: val } })}
          onChangeId={(val) => setSeo({ ...seo, id: { ...seo.id, title: val } })}
        />

        <LocalizedField
          label="Default Meta Description"
          valueEn={seo.en.description}
          valueId={seo.id.description}
          onChangeEn={(val) => setSeo({ ...seo, en: { ...seo.en, description: val } })}
          onChangeId={(val) => setSeo({ ...seo, id: { ...seo.id, description: val } })}
          type="textarea"
        />
      </div>

      {/* Actions */}
      <div className="admin-form-actions">
        <button
          type="submit"
          disabled={loading}
          className="admin-btn admin-btn-primary"
        >
          {loading ? "Saving Settings..." : "Save All Configuration"}
        </button>
      </div>
    </form>
  )
}

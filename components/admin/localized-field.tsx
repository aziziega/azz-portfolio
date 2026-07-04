"use client"

import { useState } from "react"

interface LocalizedFieldProps {
  label: string
  nameEn?: string
  nameId?: string
  valueEn: string
  valueId: string
  onChangeEn: (val: string) => void
  onChangeId: (val: string) => void
  type?: "text" | "textarea"
  placeholderEn?: string
  placeholderId?: string
  required?: boolean
}

export default function LocalizedField({
  label,
  nameEn,
  nameId,
  valueEn,
  valueId,
  onChangeEn,
  onChangeId,
  type = "text",
  placeholderEn = "",
  placeholderId = "",
  required = false,
}: LocalizedFieldProps) {
  const [activeTab, setActiveTab] = useState<"en" | "id">("en")

  return (
    <div className="admin-form-group">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label className="admin-form-label">
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
        
        <div className="admin-lang-tabs">
          <button
            type="button"
            className={`admin-lang-tab ${activeTab === "en" ? "active" : ""}`}
            onClick={() => setActiveTab("en")}
          >
            EN (English)
          </button>
          <button
            type="button"
            className={`admin-lang-tab ${activeTab === "id" ? "active" : ""}`}
            onClick={() => setActiveTab("id")}
          >
            ID (Indonesian)
          </button>
        </div>
      </div>

      {activeTab === "en" ? (
        type === "textarea" ? (
          <textarea
            className="admin-form-textarea"
            name={nameEn}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholderEn}
            required={required}
          />
        ) : (
          <input
            type="text"
            className="admin-form-input"
            name={nameEn}
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            placeholder={placeholderEn}
            required={required}
          />
        )
      ) : (
        type === "textarea" ? (
          <textarea
            className="admin-form-textarea"
            name={nameId}
            value={valueId}
            onChange={(e) => onChangeId(e.target.value)}
            placeholder={placeholderId}
          />
        ) : (
          <input
            type="text"
            className="admin-form-input"
            name={nameId}
            value={valueId}
            onChange={(e) => onChangeId(e.target.value)}
            placeholder={placeholderId}
          />
        )
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import LocalizedField from "./localized-field"

interface Item {
  en: string
  id: string
}

interface SortableListProps {
  label: string
  items: Item[]
  onChange: (items: Item[]) => void
  placeholderEn?: string
  placeholderId?: string
}

export default function SortableList({
  label,
  items,
  onChange,
  placeholderEn = "",
  placeholderId = "",
}: SortableListProps) {
  const handleAddItem = () => {
    onChange([...items, { en: "", id: "" }])
  }

  const [deleteIdx, setDeleteIdx] = useState<number | null>(null)

  const handleRemoveItem = (index: number) => {
    setDeleteIdx(index)
  }

  const handleUpdateItem = (index: number, lang: "en" | "id", val: string) => {
    const updated = [...items]
    updated[index] = {
      ...updated[index],
      [lang]: val,
    }
    onChange(updated)
  }

  return (
    <div className="admin-form-group">
      <label className="admin-form-label" style={{ marginBottom: "8px", display: "block" }}>
        {label}
      </label>

      <div className="admin-dynamic-list">
        {items.map((item, index) => (
          <div key={index} className="admin-dynamic-item">
            <div style={{ flex: 1 }}>
              <LocalizedField
                label={`Item #${index + 1}`}
                nameEn={`item-${index}-en`}
                nameId={`item-${index}-id`}
                valueEn={item.en}
                valueId={item.id}
                onChangeEn={(val) => handleUpdateItem(index, "en", val)}
                onChangeId={(val) => handleUpdateItem(index, "id", val)}
                type="textarea"
                placeholderEn={placeholderEn}
                placeholderId={placeholderId}
              />
            </div>
            <button
              type="button"
              className="admin-dynamic-item-remove"
              onClick={() => handleRemoveItem(index)}
              title="Remove Item"
            >
              ❌
            </button>
          </div>
        ))}

        <button
          type="button"
          className="admin-dynamic-add"
          onClick={handleAddItem}
        >
          ➕ Add New Item
        </button>
      </div>

      {deleteIdx !== null && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            background: "#ffffff",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            width: "100%",
            maxWidth: "400px",
            animation: "scaleIn 0.2s ease-out",
            textAlign: "left"
          }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
              ⚠️ Remove List Item?
            </h3>
            <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5, marginBottom: "20px" }}>
              Are you sure you want to remove item <strong>#{deleteIdx + 1}</strong> from this list?
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setDeleteIdx(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => {
                  const updated = [...items]
                  updated.splice(deleteIdx, 1)
                  onChange(updated)
                  setDeleteIdx(null)
                }}
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

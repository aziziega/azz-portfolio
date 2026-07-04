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

  const handleRemoveItem = (index: number) => {
    const updated = [...items]
    updated.splice(index, 1)
    onChange(updated)
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
    </div>
  )
}

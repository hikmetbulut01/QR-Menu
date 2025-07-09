"use client"

import { useState } from "react"

export default function AddCategoryForm({ onAdd, onCancel }) {
  const [newCategory, setNewCategory] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newCategory.trim()) {
      onAdd(newCategory)
      setNewCategory("")
    }
  }

  return (
    <div className="bg-[#312a52] p-3 rounded">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Kategori adı"
          className="w-full p-2 mb-2 rounded bg-[#3a3359] text-white"
        />
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-[#F5B93F] text-black p-2 rounded text-sm">
            Ekle
          </button>
          <button type="button" className="flex-1 bg-gray-500 text-white p-2 rounded text-sm" onClick={onCancel}>
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}

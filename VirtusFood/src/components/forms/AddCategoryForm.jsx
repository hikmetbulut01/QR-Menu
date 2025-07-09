"use client"

import { useState } from "react"
import Button from "../ui/Button"
import Input from "../ui/Input"

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
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Kategori adı"
          className="mb-2"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="primary" className="flex-1">
            Ekle
          </Button>
          <Button type="button" variant="cancel" className="flex-1" onClick={onCancel}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  )
}

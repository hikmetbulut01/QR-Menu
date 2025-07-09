"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"

export default function AddIngredientForm({ onAdd }) {
  const [newIngredient, setNewIngredient] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newIngredient.trim()) {
      onAdd(newIngredient)
      setNewIngredient("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={newIngredient}
        onChange={(e) => setNewIngredient(e.target.value)}
        placeholder="Yeni malzeme"
        className="w-full p-2 rounded bg-[#3a3359] text-white mb-2 text-sm"
      />
      <button
        type="submit"
        className="w-full bg-[#F5B93F] text-black p-2 rounded flex items-center justify-center gap-1 text-sm"
      >
        <PlusIcon className="w-4 h-4" /> Yeni Malzeme Ekle
      </button>
    </form>
  )
}

"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"
import Button from "../ui/Button"
import Input from "../ui/Input"

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
      <Input
        value={newIngredient}
        onChange={(e) => setNewIngredient(e.target.value)}
        placeholder="Yeni malzeme"
        className="mb-2"
      />
      <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-1">
        <PlusIcon className="w-4 h-4" /> Yeni Malzeme Ekle
      </Button>
    </form>
  )
}

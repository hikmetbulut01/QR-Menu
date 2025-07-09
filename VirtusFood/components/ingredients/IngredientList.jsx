"use client"

import { useState } from "react"
import { TrashIcon } from "lucide-react"
import ConfirmDialog from "../ui/ConfirmDialog"

export default function IngredientList({ ingredients, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  if (ingredients.length === 0) {
    return <p className="text-gray-400 text-sm mb-4">Henüz malzeme eklenmemiş.</p>
  }

  return (
    <ul className="mb-4">
      {ingredients.map((ingredient, idx) => (
        <li key={idx} className="flex justify-between items-center text-white py-2 border-b border-[#3a3359]">
          <span>{ingredient}</span>
          <button className="text-gray-400 hover:text-red-400" onClick={() => setShowDeleteConfirm(ingredient)}>
            <TrashIcon className="w-4 h-4" />
          </button>

          {showDeleteConfirm === ingredient && (
            <ConfirmDialog
              message="Silmek istediğinize emin misiniz?"
              onConfirm={() => {
                onDelete(ingredient)
                setShowDeleteConfirm(null)
              }}
              onCancel={() => setShowDeleteConfirm(null)}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

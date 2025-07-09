"use client"

import { XIcon } from "lucide-react"

export default function AllIngredientsSidebar({ ingredients, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="ml-auto w-[80%] max-w-[300px] bg-[#272042] h-full overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b border-[#3a3359]">
          <h2 className="text-[#F5B93F] text-lg md:text-xl font-bold">TÜM MALZEMELER</h2>
          <button className="text-white" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {ingredients.length > 0 ? (
            <ul>
              {ingredients.map((ingredient, idx) => (
                <li key={idx} className="text-white py-2 border-b border-[#3a3359]">
                  {ingredient}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-center">Henüz malzeme bulunmuyor.</p>
          )}
        </div>
      </div>
    </div>
  )
}

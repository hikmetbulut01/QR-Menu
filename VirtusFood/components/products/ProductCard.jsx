"use client"

import { EditIcon } from "lucide-react"

export default function ProductCard({ product, onEdit }) {
  return (
    <div className="bg-[#312a52] rounded-lg p-4">
      <div className="flex gap-3 md:gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#3a3359] rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-xs text-center">Görsel yok</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-medium text-sm md:text-base">{product.name}</h3>
              <p className="text-gray-300 text-xs md:text-sm mt-1">{product.description}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.ingredients.slice(0, 2).map((ingredient, idx) => (
                  <span key={idx} className="text-xs bg-[#3a3359] text-gray-300 px-1 rounded">
                    {ingredient}
                  </span>
                ))}
                {product.ingredients.length > 2 && (
                  <span className="text-xs bg-[#3a3359] text-gray-300 px-1 rounded">
                    +{product.ingredients.length - 2}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[#F5B93F] font-medium text-sm md:text-base">{product.price} ₺</span>
          </div>
          <div className="mt-2 md:mt-3 flex justify-end">
            <button
              className="bg-[#3a3359] text-white px-2 py-1 md:px-3 md:py-1 rounded text-xs md:text-sm flex items-center gap-1"
              onClick={onEdit}
            >
              <EditIcon className="w-3 h-3" /> Düzenle
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

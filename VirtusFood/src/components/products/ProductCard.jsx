"use client"

import { EditIcon, TrashIcon } from "lucide-react"

export default function ProductCard({ product, onEdit, onDelete, onSelect }) {
  return (
    <div
      className="bg-[#312a52] rounded-lg p-4 md:p-6 cursor-pointer hover:bg-[#3a3359] transition-colors w-full max-w-full overflow-hidden"
      onClick={() => onSelect(product)}
      style={{ wordBreak: 'break-word', hyphens: 'auto' }}
    >
      <div className="flex gap-4 md:gap-6 w-full">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#3a3359] rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-xs text-center">Görsel yok</span>
          )}
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="flex justify-between items-start w-full">
            <div className="flex-1 min-w-0 max-w-full">
              <h3 className="text-white font-medium text-base md:text-lg mb-2 break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>{product.name}</h3>
              <p className="text-gray-300 text-sm md:text-base mb-3 break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.ingredients.slice(0, 3).map((ingredient, idx) => (
                  <span key={idx} className="text-xs md:text-sm bg-[#3a3359] text-gray-300 px-2 py-1 rounded break-words max-w-full overflow-hidden" style={{ wordBreak: 'break-word' }}>
                    {ingredient}
                  </span>
                ))}
                {product.ingredients.length > 3 && (
                  <span className="text-xs md:text-sm bg-[#3a3359] text-gray-300 px-2 py-1 rounded">
                    +{product.ingredients.length - 3}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 flex-shrink-0 ml-2">
              <span className="text-[#F5B93F] font-bold text-lg md:text-xl whitespace-nowrap">{product.price} ₺</span>
              <div className="flex gap-2">
                <button
                  className="bg-[#3a3359] text-white px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base flex items-center gap-2 hover:bg-[#4a4369] transition-colors whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(product)
                  }}
                >
                  <EditIcon className="w-4 h-4" /> Düzenle
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 md:px-4 md:py-2 rounded text-sm md:text-base flex items-center gap-2 hover:bg-red-600 transition-colors whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(product)
                  }}
                >
                  <TrashIcon className="w-4 h-4" /> Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

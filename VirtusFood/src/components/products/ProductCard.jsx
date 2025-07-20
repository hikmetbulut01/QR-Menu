"use client"

import { EditIcon, TrashIcon } from "lucide-react"

export default function ProductCard({ product, onEdit, onDelete, onSelect }) {
  return (
    <div
      className="bg-[#312a52] rounded-lg p-3 md:p-6 cursor-pointer hover:bg-[#3a3359] transition-colors w-full max-w-full overflow-hidden"
      onClick={() => onSelect(product)}
      style={{ wordBreak: 'break-word', hyphens: 'auto' }}
    >
      <div className="flex gap-3 md:gap-6 w-full">
        <div className="w-16 h-16 md:w-24 md:h-24 bg-[#3a3359] rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-xs text-center">Görsel yok</span>
          )}
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full gap-2 md:gap-0">
            <div className="flex-1 min-w-0 max-w-full">
              <h3 className="text-white font-medium text-sm md:text-lg mb-1 md:mb-2 break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>{product.name}</h3>
              <p className="text-gray-300 text-xs md:text-base mb-2 md:mb-3 break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>{product.description}</p>
              <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
                {product.ingredients.slice(0, 2).map((ingredient, idx) => (
                  <span key={idx} className="text-xs bg-[#3a3359] text-gray-300 px-1 md:px-2 py-0.5 md:py-1 rounded break-words max-w-full overflow-hidden" style={{ wordBreak: 'break-word' }}>
                    {ingredient}
                  </span>
                ))}
                {product.ingredients.length > 2 && (
                  <span className="text-xs bg-[#3a3359] text-gray-300 px-1 md:px-2 py-0.5 md:py-1 rounded">
                    +{product.ingredients.length - 2}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-3 flex-shrink-0 min-w-[140px] md:min-w-[120px]">
              <span className="text-[#F5B93F] font-bold text-base md:text-xl whitespace-nowrap">{product.price} ₺</span>
              <div className="flex gap-1 md:gap-2 w-full justify-end">
                <button
                  className="bg-[#3a3359] text-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-base flex items-center gap-1 md:gap-2 hover:bg-[#4a4369] transition-colors whitespace-nowrap min-w-[60px] md:min-w-[90px] justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(product)
                  }}
                >
                  <EditIcon className="w-3 h-3 md:w-4 md:h-4" /> Düzenle
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-base flex items-center gap-1 md:gap-2 hover:bg-red-600 transition-colors whitespace-nowrap min-w-[50px] md:min-w-[70px] justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(product)
                  }}
                >
                  <TrashIcon className="w-3 h-3 md:w-4 md:h-4" /> Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

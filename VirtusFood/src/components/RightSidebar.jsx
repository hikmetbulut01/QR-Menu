"use client"

import { XIcon } from "lucide-react"

export default function RightSidebar({
  selectedProduct,
  setSelectedProduct,
  onClose,
  isMobile = false,
}) {
  return (
    <div
      className={`top-21 right-0 h-[calc(100%-64px)] w-[300px] bg-[#272042] border-l border-[#3a3359] z-30 ${isMobile ? 'block' : 'hidden md:block'} overflow-hidden`}
    >
      <div className="p-4 flex justify-between items-center border-b border-[#3a3359]">
        <h2 className="text-[#F5B93F] text-lg md:text-xl font-bold break-words">MALZEMELER</h2>

      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-64px)] w-full">
        {selectedProduct ? (
          <>
            <div className="mb-4 w-full">
              <h3 className="text-white text-lg font-medium mb-2 break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>{selectedProduct.name}</h3>

            </div>

            {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 ? (
              <ul className="space-y-2 w-full">
                {selectedProduct.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="text-white py-2 border-b border-[#3a3359] break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white text-center break-words">Bu ürün için henüz malzeme eklenmemiş.</p>
            )}
          </>
        ) : (
          <p className="text-white text-center break-words">Lütfen malzemeleri görmek için bir yemek seçin.</p>
        )}
      </div>
    </div>
  )
}

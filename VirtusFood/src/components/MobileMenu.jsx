"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function MobileMenu({ activeTab, setActiveTab, categories }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category)
    setActiveTab(category)
    setIsOpen(false)
  }

  console.log("MobileMenu categories:", categories)
  console.log("MobileMenu activeTab:", activeTab)

  return (
    <div className="md:hidden">
      <button
        className="flex items-center justify-center p-2 bg-[#3a3359] rounded text-white w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
        <div className="ml-2 text-left flex-1">
          <div className="text-xs text-gray-300">Seçilen Kategori:</div>
          <div className="text-sm md:text-base truncate max-w-[200px] font-medium">{activeTab || "Kategori Seç"}</div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-[#272042] z-[60] border-t border-[#3a3359] shadow-lg max-h-[60vh] overflow-y-auto">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <button
                key={category}
                className={`w-full p-3 md:p-4 text-left border-b border-[#3a3359] ${activeTab === category ? "bg-[#F26241] text-white" : "text-white"} text-sm md:text-base break-words`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-white">
              Henüz kategori eklenmemiş
            </div>
          )}
        </div>
      )}
    </div>
  )
}

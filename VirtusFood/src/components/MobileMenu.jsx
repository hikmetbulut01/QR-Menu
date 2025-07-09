"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function MobileMenu({ activeTab, setActiveTab, categories }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategoryClick = (category) => {
    setActiveTab(category)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <button
        className="flex items-center justify-center p-2 bg-[#3a3359] rounded text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
        <span className="ml-2">{activeTab}</span>
      </button>

      {isOpen && (
        <div className="absolute top-[60px] left-0 right-0 bg-[#272042] z-50 border-t border-[#3a3359] shadow-lg">
          {categories.map((category) => (
            <button
              key={category}
              className={`w-full p-4 text-left border-b border-[#3a3359] ${activeTab === category ? "bg-[#F26241] text-white" : "text-white"}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

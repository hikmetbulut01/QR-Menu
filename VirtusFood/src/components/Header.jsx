"use client"

import { ClipboardIcon, HelpCircleIcon, UserIcon } from "lucide-react"

export default function Header({ onShowAllIngredients, onShowFAQ, onShowProfile }) {
  return (
    <header className="bg-[#F26241] text-white p-3 md:p-4 flex justify-between items-center">
      <div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">VIRTUS FOOD</h1>
        <p className="text-xs md:text-sm">Lezzetin QR Menüsü</p>
      </div>
      <div className="flex gap-1 md:gap-2 lg:gap-3">
        <button className="bg-[#333] rounded-full p-1 md:p-1.5 lg:p-2" onClick={onShowAllIngredients}>
          <ClipboardIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
        <button className="bg-[#333] rounded-full p-1 md:p-1.5 lg:p-2" onClick={onShowFAQ}>
          <HelpCircleIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
        <button className="bg-[#333] rounded-full p-1 md:p-1.5 lg:p-2" onClick={onShowProfile}>
          <UserIcon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
      </div>
    </header>
  )
}

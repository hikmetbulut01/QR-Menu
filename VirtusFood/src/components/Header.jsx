"use client"

import { ClipboardIcon, HelpCircleIcon, UserIcon } from "lucide-react"

export default function Header({ onShowAllIngredients, onShowFAQ, onShowProfile }) {
  return (
    <header className="bg-[#F26241] text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl md:text-2xl font-bold">VIRTUS FOOD</h1>
        <p className="text-xs md:text-sm">Lezzetin QR Menüsü</p>
      </div>
      <div className="flex gap-2 md:gap-3">
        <button className="bg-[#333] rounded-full p-1.5 md:p-2" onClick={onShowAllIngredients}>
          <ClipboardIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button className="bg-[#333] rounded-full p-1.5 md:p-2" onClick={onShowFAQ}>
          <HelpCircleIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
        <button className="bg-[#333] rounded-full p-1.5 md:p-2" onClick={onShowProfile}>
          <UserIcon className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
    </header>
  )
}

"use client"

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="absolute z-10 left-0 right-0 bg-[#312a52] p-3 border border-[#3a3359] shadow-lg">
      <p className="text-white text-sm mb-2">{message}</p>
      <div className="flex gap-2">
        <button className="bg-red-500 text-white px-2 py-1 text-xs rounded" onClick={onConfirm}>
          Evet
        </button>
        <button className="bg-gray-500 text-white px-2 py-1 text-xs rounded" onClick={onCancel}>
          Hayır
        </button>
      </div>
    </div>
  )
}

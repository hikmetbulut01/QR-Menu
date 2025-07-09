"use client"

import { useState, useRef, useEffect } from "react"

export default function AddEditProductForm({ product, onSave, onCancel, isEditing }) {
  const [formData, setFormData] = useState({
    id: product.id || null,
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    image: product.image || null,
    ingredients: product.ingredients || [],
  })
  const [imagePreview, setImagePreview] = useState(product.image || null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    setFormData({
      id: product.id || null,
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      image: product.image || null,
      ingredients: product.ingredients || [],
    })
    setImagePreview(product.image || null)
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData({ ...formData, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim() && formData.price) {
      onSave(formData)
    }
  }

  return (
    <div className="bg-[#312a52] rounded-lg p-4 md:p-6">
      <h3 className="text-[#F5B93F] text-base md:text-lg mb-4 md:mb-6">
        {isEditing ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 md:mb-4">
          <label className="block text-white mb-1 md:mb-2 text-sm md:text-base">Ürün Adı</label>
          <input
            type="text"
            name="name"
            placeholder="Ürün adını girin"
            className="w-full p-2 md:p-3 rounded bg-[#3a3359] text-white text-sm md:text-base"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 md:mb-4">
          <label className="block text-white mb-1 md:mb-2 text-sm md:text-base">Açıklama</label>
          <textarea
            name="description"
            placeholder="Ürün açıklaması"
            className="w-full p-2 md:p-3 rounded bg-[#3a3359] text-white h-16 md:h-24 text-sm md:text-base"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3 md:mb-4">
          <label className="block text-white mb-1 md:mb-2 text-sm md:text-base">Fiyat (₺)</label>
          <input
            type="number"
            name="price"
            placeholder="Ürün fiyatı"
            className="w-full p-2 md:p-3 rounded bg-[#3a3359] text-white text-sm md:text-base"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 md:mb-6">
          <label className="block text-white mb-1 md:mb-2 text-sm md:text-base">Görsel</label>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#3a3359] rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview || "/placeholder.svg"} alt="Önizleme" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-xs text-center">Görsel önizleme</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 p-2 md:p-3 rounded bg-[#3a3359] text-white text-xs md:text-sm file:mr-2 md:file:mr-4 file:py-1 md:file:py-2 file:px-2 md:file:px-4 file:rounded file:border-0 file:bg-[#F5B93F] file:text-black file:text-xs md:file:text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 md:gap-4">
          <button type="submit" className="flex-1 bg-[#F5B93F] text-black p-2 md:p-3 rounded text-sm md:text-base">
            {isEditing ? "Güncelle" : "Ekle"}
          </button>
          <button
            type="button"
            className="flex-1 bg-[#6c7280] text-white p-2 md:p-3 rounded text-sm md:text-base"
            onClick={onCancel}
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { PlusIcon, XIcon, SearchIcon } from "lucide-react"
import Button from "../ui/Button"
import Input from "../ui/Input"
import TextArea from "../ui/TextArea"
import Card from "../ui/Card"
import { db } from "../../lib/firebase"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"

const USER_COLLECTION = "users"
const USER_DOC_ID = "wo3sXt15J6SRroEtmUxs"

export default function AddEditProductForm({ product, onSave, onCancel, isEditing, activeCategory }) {
  const [formData, setFormData] = useState({
    id: product.id || null,
    name: product.name || "",
    description: product.description || "",
    price: product.price || "",
    image: product.image || null,
    ingredients: product.ingredients || [],
  })
  const [imagePreview, setImagePreview] = useState(product.image || null)
  const [showIngredientPopup, setShowIngredientPopup] = useState(false)
  const [availableIngredients, setAvailableIngredients] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const fileInputRef = useRef(null)

  // Load available ingredients from Firestore
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
        const userSnap = await getDoc(userDocRef)
        if (userSnap.exists()) {
          const data = userSnap.data()
          setAvailableIngredients(data.ingredients || [])
        }
      } catch (error) {
        console.error("Error loading ingredients:", error)
      }
    }
    loadIngredients()
  }, [])

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
    
    // Fiyat için negatif sayı kontrolü
    if (name === 'price') {
      const numValue = parseFloat(value)
      if (numValue < 0) {
        return // Negatif değer girilirse işlemi durdur
      }
    }
    
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

  const handleAddIngredient = (ingredient) => {
    if (!formData.ingredients.includes(ingredient)) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, ingredient]
      })
    }
  }

  const handleRemoveIngredient = (ingredientToRemove) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter(ing => ing !== ingredientToRemove)
    })
  }

  const filteredIngredients = availableIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Firestore'a ürün ekle/güncelle
  const saveProductToFirebase = async (category, productData) => {
    const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
    const userSnap = await getDoc(userDocRef)
    let categories = userSnap.exists() ? (userSnap.data().categories || {}) : {}

    // Kategori yoksa oluştur
    if (!categories[category]) categories[category] = {}

    if (isEditing && productData.id) {
      // Güncelleme işlemi - mevcut ID'yi kullan
      const updatedProduct = { ...productData }
      categories[category][productData.id] = updatedProduct
    } else {
      // Yeni ürün ekleme - yeni ID oluştur
      const productId = productData.name.trim().toUpperCase()
      const newProduct = { ...productData, id: productId, name: productId }
      categories[category][productId] = newProduct
    }

    if (userSnap.exists()) {
      await updateDoc(userDocRef, { categories })
    } else {
      await setDoc(userDocRef, { categories })
    }
    return productData.id || productData.name.trim().toUpperCase()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.name.trim() && formData.price && activeCategory) {
      // Fiyat negatif mi kontrol et
      const price = parseFloat(formData.price)
      if (price < 0) {
        alert("Fiyat negatif olamaz!")
        return
      }
      
      const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
      const userSnap = await getDoc(userDocRef)
      let categories = userSnap.exists() ? (userSnap.data().categories || {}) : {}

      if (isEditing) {
        // Güncelleme işlemi - sadece aynı ID'deki ürünü güncelle
        const productId = await saveProductToFirebase(activeCategory, formData)
        onSave({ ...formData, id: productId })
      } else {
        // Yeni ürün ekleme - aynı isimde ürün var mı kontrol et
        if (categories[activeCategory] && categories[activeCategory][formData.name.trim().toUpperCase()]) {
          alert("Bu isimde bir ürün zaten mevcut!")
          return
        }
        const productId = await saveProductToFirebase(activeCategory, formData)
        onSave({ ...formData, id: productId })
      }
    }
  }

  return (
    <Card>
      <h3 className="text-[#F5B93F] text-base md:text-lg mb-4 md:mb-6 break-words">
        {isEditing ? `Ürün Düzenle: ${product.name || 'Bilinmeyen Ürün'}` : "Yeni Ürün Ekle"}
      </h3>

      <form onSubmit={handleSubmit}>
        <Input
          label="Ürün Adı"
          type="text"
          name="name"
          placeholder="Ürün adını girin"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <TextArea
          label="Açıklama"
          name="description"
          placeholder="Ürün açıklaması"
          value={formData.description}
          onChange={handleChange}
        />

        <Input
          label="Fiyat (₺)"
          type="number"
          name="price"
          placeholder="Ürün fiyatı"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />

        <div className="mb-4">
          <label className="block text-white mb-2 text-sm md:text-base">Malzemeler</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="bg-[#3a3359] text-white px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="text-red-400 hover:text-red-300"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowIngredientPopup(true)}
            className="w-full bg-[#3a3359] text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#4a4369] transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
            <span>Malzeme Ekle</span>
          </button>
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
          <Button type="submit" variant="primary" className="flex-1">
            {isEditing ? "Güncelle" : "Ekle"}
          </Button>
          <Button type="button" variant="cancel" className="flex-1" onClick={onCancel}>
            İptal
          </Button>
        </div>
      </form>

      {/* Malzeme Seçme Popup */}
      {showIngredientPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-[#272042] p-6 rounded-lg w-[90%] max-w-[400px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#F5B93F] text-xl font-bold">Malzeme Seç</h3>
              <button
                onClick={() => {
                  setShowIngredientPopup(false)
                  setSearchQuery("")
                }}
                className="text-white hover:text-gray-300"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Malzeme ara..."
                className="w-full p-2 pl-10 bg-[#3a3359] text-white rounded-md border border-[#4a4369] focus:outline-none focus:border-[#F5B93F]"
              />
              <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="space-y-2">
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((ingredient, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleAddIngredient(ingredient)
                      setShowIngredientPopup(false)
                      setSearchQuery("")
                    }}
                    className="w-full text-left bg-[#3a3359] text-white p-3 rounded-md hover:bg-[#4a4369] transition-colors"
                  >
                    {ingredient}
                  </button>
                ))
              ) : (
                <p className="text-white text-center">Malzeme bulunamadı.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

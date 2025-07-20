"use client"

import { useState, useEffect } from "react"
import { PlusIcon, TrashIcon } from "lucide-react"
import AddCategoryForm from "./forms/AddCategoryForm"
import ConfirmDialog from "./ui/ConfirmDialog"
import { db } from "../lib/firebase"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"

const USER_COLLECTION = "users"
const USER_DOC_ID = "wo3sXt15J6SRroEtmUxs"

export default function LeftSidebar({ activeTab, setActiveTab, products, setProducts, categories, setCategories }) {
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  // Kategori ekle
  const handleAddCategory = async (category) => {
    try {
      const upperCaseCategory = category.toUpperCase()
      const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
      const userSnap = await getDoc(userDocRef)
      let categoriesData = userSnap.exists() ? (userSnap.data().categories || {}) : {}

      // Check if category already exists
      if (categoriesData[upperCaseCategory]) {
        alert("Bu isimde bir kategori zaten mevcut!")
        return
      }

      categoriesData[upperCaseCategory] = {}
      if (userSnap.exists()) {
        await updateDoc(userDocRef, { categories: categoriesData })
      } else {
        await setDoc(userDocRef, { categories: categoriesData })
      }
      setCategories(Object.keys(categoriesData))
      setProducts({ ...products, [upperCaseCategory]: [] })
      setShowAddCategory(false)
    } catch (error) {
      console.error("Error adding category:", error)
    }
  }

  // Kategori sil
  const handleDeleteCategory = async (category) => {
    try {
      const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
      const userSnap = await getDoc(userDocRef)
      let categoriesData = userSnap.exists() ? (userSnap.data().categories || {}) : {}
      delete categoriesData[category]
      await updateDoc(userDocRef, { categories: categoriesData })
      const updatedProducts = { ...products }
      delete updatedProducts[category]
      setCategories(Object.keys(categoriesData))
      setProducts(updatedProducts)
      setShowDeleteConfirm(null)
      if (activeTab === category) {
        setActiveTab(Object.keys(categoriesData)[0] || "")
      }
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  return (
    <div className="w-[300px] border-r border-[#3a3359] overflow-hidden">
      <div className="p-4 text-center border-b border-[#3a3359]">
        <h2 className="text-[#F5B93F] text-xl font-bold break-words">MENÜ</h2>
      </div>
      <nav className="w-full">
        {categories.map((category) => (
          <div key={category} className="relative w-full">
                    <button
          className={`w-full p-3 md:p-4 text-left border-b border-[#3a3359] ${activeTab === category ? "bg-[#F26241] text-white" : "text-white"} break-words overflow-hidden text-sm md:text-base`}
          onClick={() => setActiveTab(category)}
          style={{ wordBreak: 'break-word' }}
        >
          {category}
        </button>
            <button
              className="absolute right-3 top-4 text-white hover:text-red-400 flex-shrink-0"
              onClick={() => setShowDeleteConfirm(category)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
            {showDeleteConfirm === category && (
              <ConfirmDialog
                message="Silmek istediğinize emin misiniz?"
                onConfirm={() => handleDeleteCategory(category)}
                onCancel={() => setShowDeleteConfirm(null)}
              />
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 w-full">
        {showAddCategory ? (
          <AddCategoryForm
            onAdd={handleAddCategory}
            onCancel={() => setShowAddCategory(false)}
          />
        ) : (
          <button
            className="w-full bg-[#F26241] text-white p-2 md:p-3 rounded flex items-center justify-center gap-1 md:gap-2 break-words text-sm md:text-base"
            onClick={() => setShowAddCategory(true)}
          >
            <PlusIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" /> <span className="break-words">YENİ KATEGORİ EKLE</span>
          </button>
        )}
      </div>
    </div>
  )
}

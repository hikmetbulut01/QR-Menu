"use client"

import { useState, useEffect } from "react"
import { PlusIcon, ListIcon, SearchIcon } from "lucide-react"
import ProductList from "./products/ProductList"
import AddEditProductForm from "./forms/AddEditProductForm"
import ConfirmDialog from "./ui/ConfirmDialog"
import { db } from "../lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

const USER_COLLECTION = "users"
const USER_DOC_ID = "wo3sXt15J6SRroEtmUxs"

async function fetchProductsFromFirebase(category) {
  const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
  const userSnap = await getDoc(userDocRef)
  if (userSnap.exists()) {
    const categories = userSnap.data().categories || {}
    const productsObj = categories[category] || {}
    // Objeyi diziye çevir
    return Object.values(productsObj)
  }
  return []
}

async function deleteProductFromFirebase(category, productId) {
  const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
  const userSnap = await getDoc(userDocRef)
  if (userSnap.exists()) {
    let categories = userSnap.data().categories || {}
    if (categories[category] && categories[category][productId]) {
      delete categories[category][productId]
      await updateDoc(userDocRef, { categories })
    }
  }
}

export default function MainContent({
  activeTab,
  products,
  setProducts,
  selectedProduct,
  setSelectedProduct,
  setShowIngredients,
  onShowMobileRightSidebar,
  setIsFormOpen,
}) {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", image: null })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Form durumunu takip et
  useEffect(() => {
    setIsFormOpen(showAddProduct || showEditForm)
  }, [showAddProduct, showEditForm, setIsFormOpen])

  // Add new product
  const handleAddProduct = async (product) => {
    // Ürün Firestore'a AddEditProductForm'da kaydediliyor, burada tekrar eklemeye gerek yok
    // Sadece Firestore'dan güncel ürünleri çek
    if (activeTab) {
      const productsArr = await fetchProductsFromFirebase(activeTab)
      setProducts((prev) => ({ ...prev, [activeTab]: productsArr }))
    }
    setShowAddProduct(false)
  }

  // Update product
  const handleUpdateProduct = async (updatedProduct) => {
    // Ürün Firestore'a AddEditProductForm'da kaydediliyor, burada tekrar güncellemeye gerek yok
    // Sadece Firestore'dan güncel ürünleri çek
    if (activeTab) {
      const productsArr = await fetchProductsFromFirebase(activeTab)
      setProducts((prev) => ({ ...prev, [activeTab]: productsArr }))
    }
    setSelectedProduct(null)
    setShowEditForm(false)
  }

  const handleDeleteProduct = async (product) => {
    if (activeTab && product.id) {
      await deleteProductFromFirebase(activeTab, product.id)
      const productsArr = await fetchProductsFromFirebase(activeTab)
      setProducts((prev) => ({ ...prev, [activeTab]: productsArr }))
      setShowDeleteConfirm(null)
    }
  }

  const handleDeleteProductConfirm = (product) => {
    setShowDeleteConfirm(product)
  }

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setShowIngredients(true)
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setShowEditForm(true)
  }

  // Filter products based on search term
  const filteredProducts = (products[activeTab] || []).filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Truncate category name to 12 characters
  const truncateCategoryName = (name) => {
    if (!name) return ""
    return name.length > 20 ? name.substring(0, 20) + "..." : name
  }

  useEffect(() => {
    async function loadProducts() {
      if (activeTab) {
        const productsArr = await fetchProductsFromFirebase(activeTab)
        setProducts((prev) => ({ ...prev, [activeTab]: productsArr }))
      }
    }
    loadProducts()
  }, [activeTab])

  return (
    <div className="flex-1 p-2 md:p0 w-full max-w-full overflow-hidden">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-[#F5B93F] text-xl font-bold mt-0 w-24 flex-shrink-0">{truncateCategoryName(activeTab)}</h2>
        <div className="flex gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[200px] bg-[#3a3359] text-white px-10 py-2 rounded-md border border-[#4a4369] focus:outline-none focus:border-[#F5B93F] placeholder-gray-400"
            />
          </div>
          {selectedProduct && (
            <button
              className="md:hidden bg-[#3a3359] text-white px-3 py-1.5 rounded flex items-center gap-1"
              onClick={onShowMobileRightSidebar}
            >
              <ListIcon className="w-4 h-4" /> Malzemeler
            </button>
          )}
          <button
            className="bg-[#F5B93F] text-black px-3 py-1.5 md:px-4 md:py-2 rounded flex items-center gap-1 md:gap-2 text-sm md:text-base"
            onClick={() => {
              setShowAddProduct(true)
              setSelectedProduct(null)
              setShowEditForm(false)
              setNewProduct({ name: "", description: "", price: "", image: null })
            }}
          >
            <PlusIcon className="w-4 h-4 md:w-5 md:h-5" /> YENİ ÜRÜN EKLE
          </button>
        </div>
      </div>

      {showAddProduct || showEditForm ? (
        <AddEditProductForm
          product={selectedProduct || newProduct}
          onSave={showEditForm ? handleUpdateProduct : handleAddProduct}
          onCancel={() => {
            setShowAddProduct(false)
            setShowEditForm(false)
            setSelectedProduct(null)
          }}
          isEditing={showEditForm}
          activeCategory={activeTab}
        />
      ) : (
        <div className="relative w-full max-w-full overflow-hidden">
          <ProductList
            products={filteredProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProductConfirm}
            onSelect={handleSelectProduct}
            activeTab={activeTab}
          />
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#312a52] p-6 rounded-lg border border-[#3a3359] shadow-lg max-w-sm mx-4">
                <p className="text-white text-lg mb-4 break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>"{showDeleteConfirm.name}" ürününü silmek istediğinize emin misiniz?</p>
                <div className="flex gap-3">
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteProduct(showDeleteConfirm)}
                  >
                    Evet, Sil
                  </button>
                  <button 
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    onClick={() => setShowDeleteConfirm(null)}
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

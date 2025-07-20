"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import LeftSidebar from "./components/LeftSidebar"
import MainContent from "./components/MainContent"
import RightSidebar from "./components/RightSidebar"
import AllIngredientsSidebar from "./components/sidebars/AllIngredientsSidebar"
import FAQSidebar from "./components/sidebars/FAQSidebar"
import ProfileSidebar from "./components/sidebars/ProfileSidebar"
import MobileMenu from "./components/MobileMenu"
import { db } from "./lib/firebase"
import { doc, getDoc } from "firebase/firestore"

const USER_COLLECTION = "users"
const USER_DOC_ID = "wo3sXt15J6SRroEtmUxs"

function App() {
  // States
  const [activeTab, setActiveTab] = useState("")
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState({})
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showIngredients, setShowIngredients] = useState(false)
  const [showAllIngredientsSidebar, setShowAllIngredientsSidebar] = useState(false)
  const [showFAQSidebar, setShowFAQSidebar] = useState(false)
  const [showProfileSidebar, setShowProfileSidebar] = useState(false)
  const [showMobileRightSidebar, setShowMobileRightSidebar] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [showCategoryChangeWarning, setShowCategoryChangeWarning] = useState(false)

  // Load categories from Firebase
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
        const userSnap = await getDoc(userDocRef)
        if (userSnap.exists()) {
          const data = userSnap.data()
          const categoryList = Object.keys(data.categories || {})
          setCategories(categoryList)
          // Set first category as active if none selected
          if (!activeTab && categoryList.length > 0) {
            setActiveTab(categoryList[0])
          }
        }
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }
    loadCategories()
  }, []) // Remove activeTab dependency to prevent infinite loop

  // Get all unique ingredients
  const getAllIngredients = () => {
    const allIngredients = new Set()

    Object.values(products).forEach((categoryProducts) => {
      categoryProducts.forEach((product) => {
        product.ingredients.forEach((ingredient) => {
          allIngredients.add(ingredient)
        })
      })
    })

    return Array.from(allIngredients).sort()
  }

  // Kategori değiştirme kontrolü
  const handleCategoryChange = (newCategory) => {
    if (isFormOpen) {
      setShowCategoryChangeWarning(true)
    } else {
      setActiveTab(newCategory)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#272042]">
      <Header
        onShowAllIngredients={() => setShowAllIngredientsSidebar(true)}
        onShowFAQ={() => setShowFAQSidebar(true)}
        onShowProfile={() => setShowProfileSidebar(true)}
      />

      <div className="flex flex-col md:flex-row flex-1">
        {/* Mobile Menu */}
        <div className="p-4 md:hidden">
          <MobileMenu activeTab={activeTab} setActiveTab={handleCategoryChange} categories={categories} />
        </div>

        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <LeftSidebar
            activeTab={activeTab}
            setActiveTab={handleCategoryChange}
            categories={categories}
            setCategories={setCategories}
            products={products}
            setProducts={setProducts}
          />
        </div>

        {/* Main Content */}
        <MainContent
          activeTab={activeTab}
          products={products}
          setProducts={setProducts}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setShowIngredients={setShowIngredients}
          onShowMobileRightSidebar={() => {
            if (selectedProduct) {
              setShowMobileRightSidebar(true)
            }
          }}
          setIsFormOpen={setIsFormOpen}
        />

        {/* Right Sidebar - Hidden on mobile unless explicitly shown */}
        <div
          className={`${showMobileRightSidebar ? "fixed inset-0 z-40 md:relative md:inset-auto" : "hidden md:block"}`}
        >
          {showMobileRightSidebar && (
            <div
              className="md:hidden absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowMobileRightSidebar(false)}
            ></div>
          )}
          <div
            className={`${showMobileRightSidebar ? "absolute right-0 top-0 bottom-0 w-[85%] max-w-[320px] md:relative md:w-[300px]" : "w-[300px]"}`}
          >
            <RightSidebar
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              showIngredients={showIngredients}
              products={products}
              setProducts={setProducts}
              activeTab={activeTab}
              onShowAllIngredients={() => setShowAllIngredientsSidebar(true)}
              onClose={() => setShowMobileRightSidebar(false)}
              isMobile={showMobileRightSidebar}
            />
          </div>
        </div>
      </div>

      <Footer />

      {showAllIngredientsSidebar && (
        <AllIngredientsSidebar ingredients={getAllIngredients()} onClose={() => setShowAllIngredientsSidebar(false)} />
      )}

      {showFAQSidebar && <FAQSidebar onClose={() => setShowFAQSidebar(false)} />}

      {showProfileSidebar && <ProfileSidebar onClose={() => setShowProfileSidebar(false)} />}

      {/* Kategori Değiştirme Uyarısı */}
      {showCategoryChangeWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#312a52] p-6 rounded-lg border border-[#3a3359] shadow-lg max-w-sm mx-4">
            <h3 className="text-[#F5B93F] text-xl font-bold mb-4">Uyarı</h3>
            <p className="text-white text-lg mb-6">Ürün eklerken kategori değiştiremezsiniz!</p>
            <div className="flex justify-end">
              <button 
                className="bg-[#F5B93F] text-black px-4 py-2 rounded hover:bg-[#e5a92f] transition-colors"
                onClick={() => setShowCategoryChangeWarning(false)}
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

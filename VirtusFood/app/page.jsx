"use client"

import { useState, useEffect } from "react"
import Header from "../src/components/Header"
import Footer from "../src/components/Footer"
import LeftSidebar from "../src/components/LeftSidebar"
import MainContent from "../src/components/MainContent"
import RightSidebar from "../src/components/RightSidebar"
import AllIngredientsSidebar from "../src/components/sidebars/AllIngredientsSidebar"
import FAQSidebar from "../src/components/sidebars/FAQSidebar"
import ProfileSidebar from "../src/components/sidebars/ProfileSidebar"
import MobileMenu from "../src/components/MobileMenu"
import { db } from "../src/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

const USER_COLLECTION = "users"
const USER_DOC_ID = "wo3sXt15J6SRroEtmUxs"

export default function VirtusFood() {
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

  // Load data from Firebase
  useEffect(() => {
    const loadData = async () => {
      try {
        const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
        const userSnap = await getDoc(userDocRef)
        
        if (userSnap.exists()) {
          const data = userSnap.data()
          const categoriesData = data.categories || {}
          const categoriesList = Object.keys(categoriesData)
          
          setCategories(categoriesList)
          setProducts(categoriesData)
          
          // Set first category as active if no active tab
          if (categoriesList.length > 0 && !activeTab) {
            setActiveTab(categoriesList[0])
          }
        }
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }
    
    loadData()
  }, [])

  // Get all unique ingredients
  const getAllIngredients = () => {
    const allIngredients = new Set()

    Object.values(products).forEach((categoryProducts) => {
      if (Array.isArray(categoryProducts)) {
        categoryProducts.forEach((product) => {
          if (product.ingredients) {
            product.ingredients.forEach((ingredient) => {
              allIngredients.add(ingredient)
            })
          }
        })
      }
    })

    return Array.from(allIngredients).sort()
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
          <MobileMenu activeTab={activeTab} setActiveTab={setActiveTab} categories={categories} />
        </div>

        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
          <LeftSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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
            className={`${showMobileRightSidebar ? "absolute right-0 top-0 bottom-0 w-[80%] max-w-[300px] md:relative md:w-[300px]" : "w-[300px]"}`}
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
    </div>
  )
}

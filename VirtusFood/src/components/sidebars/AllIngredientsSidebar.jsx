"use client"

import { useState, useEffect } from "react"
import { XIcon, PlusIcon, TrashIcon } from "lucide-react"
import { db } from "../../lib/firebase"
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore"

const USER_COLLECTION = "users"
const USER_DOC_ID = "wo3sXt15J6SRroEtmUxs"

export default function AllIngredientsSidebar({ ingredients, onClose }) {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [newIngredient, setNewIngredient] = useState("")
  const [allIngredients, setAllIngredients] = useState([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  // Load ingredients from Firestore when component mounts
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
        const userSnap = await getDoc(userDocRef)
        if (userSnap.exists()) {
          const data = userSnap.data()
          setAllIngredients(data.ingredients || [])
        }
      } catch (error) {
        console.error("Error loading ingredients:", error)
      }
    }
    loadIngredients()
  }, [])

  const handleAddIngredient = async () => {
    if (newIngredient.trim()) {
      try {
        const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
        const userSnap = await getDoc(userDocRef)
        let categories = userSnap.exists() ? (userSnap.data().categories || {}) : {}

        // Convert ingredient name to uppercase for comparison
        const upperCaseIngredient = newIngredient.trim().toUpperCase()

        // Check if ingredient already exists
        if (allIngredients.some(ing => ing.toUpperCase() === upperCaseIngredient)) {
          alert("Bu isimde bir malzeme zaten mevcut!")
          return
        }

        // Add ingredient to the list
        const updatedIngredients = [...allIngredients, upperCaseIngredient]

        if (userSnap.exists()) {
          await updateDoc(userDocRef, { ingredients: updatedIngredients })
        } else {
          await setDoc(userDocRef, { ingredients: updatedIngredients })
        }

        setAllIngredients(updatedIngredients)
        setNewIngredient("")
        setShowAddPopup(false)
      } catch (error) {
        console.error("Error adding ingredient:", error)
      }
    }
  }

  const handleDeleteIngredient = async (ingredientToDelete) => {
    try {
      const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
      const userSnap = await getDoc(userDocRef)
      let categories = userSnap.exists() ? (userSnap.data().categories || {}) : {}

      // Remove ingredient from the list
      const updatedIngredients = allIngredients.filter(ing => ing !== ingredientToDelete)

      if (userSnap.exists()) {
        await updateDoc(userDocRef, { ingredients: updatedIngredients })
      } else {
        await setDoc(userDocRef, { ingredients: updatedIngredients })
      }

      setAllIngredients(updatedIngredients)
      setShowDeleteConfirm(null)
    } catch (error) {
      console.error("Error deleting ingredient:", error)
    }
  }

  const handleDeleteIngredientConfirm = (ingredient) => {
    setShowDeleteConfirm(ingredient)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="ml-auto w-[80%] max-w-[300px] bg-[#272042] h-full overflow-y-auto overflow-x-hidden">
        <div className="p-4 flex justify-between items-center border-b border-[#3a3359]">
          <h2 className="text-[#F5B93F] text-lg md:text-xl font-bold break-words">TÜM MALZEMELER</h2>
          <button className="text-white flex-shrink-0" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 w-full">
          <button
            onClick={() => setShowAddPopup(true)}
            className="w-full mb-4 bg-[#F5B93F] text-[#272042] py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#e5a92f] transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Malzeme Ekle</span>
          </button>

          {allIngredients.length > 0 ? (
            <ul className="w-full">
              {allIngredients.map((ingredient, idx) => (
                <li key={idx} className="text-white py-2 border-b border-[#3a3359] flex justify-between items-start gap-2 w-full">
                  <span className="flex-1 break-words overflow-hidden" style={{ wordBreak: 'break-word' }}>{ingredient}</span>
                  <button
                    onClick={() => handleDeleteIngredientConfirm(ingredient)}
                    className="text-red-500 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white text-center break-words">Henüz malzeme bulunmuyor.</p>
          )}
        </div>
      </div>

      {/* Add Ingredient Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
          <div className="bg-[#272042] p-6 rounded-lg w-[90%] max-w-[400px]">
            <h3 className="text-[#F5B93F] text-xl font-bold mb-4 break-words">Yeni Malzeme Ekle</h3>
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Malzeme adını girin"
              className="w-full p-2 mb-4 bg-[#3a3359] text-white rounded-md border border-[#4a4369] focus:outline-none focus:border-[#F5B93F]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddPopup(false)}
                className="px-4 py-2 text-white bg-[#3a3359] rounded-md hover:bg-[#4a4369] transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleAddIngredient}
                className="px-4 py-2 bg-[#F5B93F] text-[#272042] rounded-md hover:bg-[#e5a92f] transition-colors"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center">
          <div className="bg-[#272042] p-6 rounded-lg w-[90%] max-w-[400px] border border-[#3a3359] shadow-lg">
            <h3 className="text-[#F5B93F] text-xl font-bold mb-4 break-words">Malzeme Sil</h3>
            <p className="text-white text-lg mb-6 break-words">"{showDeleteConfirm}" malzemesini silmek istediğinize emin misiniz?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-white bg-[#3a3359] rounded-md hover:bg-[#4a4369] transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => handleDeleteIngredient(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

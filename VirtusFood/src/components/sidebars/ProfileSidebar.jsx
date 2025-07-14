"use client"

import { useState, useRef, useEffect } from "react"
import { XIcon } from "lucide-react"
import { db } from "../../lib/firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"

const USER_COLLECTION = "users"
const USER_DOC_ID = "wo3sXt15J6SRroEtmUxs"

export default function ProfileSidebar({ onClose }) {
  const [profile, setProfile] = useState({
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "0555 123 4567",
    role: "Yönetici",
    photo: null,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "Ahmet Yılmaz",
    phone: "0555 123 4567",
  })
  const [isLoading, setIsLoading] = useState(false)

  const profilePhotoInputRef = useRef(null)

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditClick = () => {
    setEditForm({
      name: profile.name,
      phone: profile.phone,
    })
    setIsEditing(true)
  }

  // Component yüklendiğinde profil bilgilerini çek
  useEffect(() => {
    loadProfileFromFirestore()
  }, [])

  const handleSaveProfile = async () => {
    try {
      const updatedProfile = {
        ...profile,
        name: editForm.name,
        phone: editForm.phone,
      }
      
      await saveProfileToFirestore(updatedProfile)
      setProfile(updatedProfile)
      setIsEditing(false)
    } catch (error) {
      console.error("Profil kaydedilirken hata:", error)
      // Hata durumunda kullanıcıya bilgi verebilirsiniz
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Firestore'dan profil bilgilerini çek
  const loadProfileFromFirestore = async () => {
    try {
      const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
      const userSnap = await getDoc(userDocRef)
      
      if (userSnap.exists()) {
        const data = userSnap.data()
        const userData = data.userData || {}
        
        setProfile(prev => ({
          ...prev,
          name: userData.name || "Ahmet Yılmaz",
          phone: userData.phone || "0555 123 4567",
          email: "ahmet@example.com", // Frontend'de sabit
          role: "Yönetici", // Frontend'de sabit
        }))
      }
    } catch (error) {
      console.error("Profil bilgileri yüklenirken hata:", error)
    }
  }

  // Profil bilgilerini Firestore'a kaydet
  const saveProfileToFirestore = async (updatedProfile) => {
    try {
      setIsLoading(true)
      const userDocRef = doc(db, USER_COLLECTION, USER_DOC_ID)
      
      await updateDoc(userDocRef, {
        userData: {
          name: updatedProfile.name,
          phone: updatedProfile.phone,
        }
      })
      
      console.log("Profil başarıyla güncellendi")
    } catch (error) {
      console.error("Profil güncellenirken hata:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="ml-auto w-[80%] max-w-[300px] bg-[#272042] h-full overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b border-[#3a3359]">
          <h2 className="text-[#F5B93F] text-lg md:text-xl font-bold">PROFİL</h2>
          <button className="text-white" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex flex-col items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#3a3359] overflow-hidden mb-4 relative">
            {profile.photo ? (
              <img src={profile.photo || "/placeholder.svg"} alt="Profil" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-600 text-white text-xl md:text-2xl font-bold">
                {profile.name.charAt(0)}
              </div>
            )}
            <input
              ref={profilePhotoInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="hidden"
            />
            <button
              className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1"
              onClick={() => profilePhotoInputRef.current.click()}
            >
              Fotoğraf Değiştir
            </button>
          </div>

          <div className="w-full space-y-2 md:space-y-3">
            <div>
              <label className="text-gray-400 text-xs">Ad Soyad</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-[#3a3359] text-white text-sm md:text-base p-2 rounded border border-[#4a4569] focus:border-[#F5B93F] focus:outline-none"
                />
              ) : (
                <p className="text-white text-sm md:text-base">{profile.name}</p>
              )}
            </div>
            <div>
              <label className="text-gray-400 text-xs">E-posta</label>
              <p className="text-white text-sm md:text-base">{profile.email}</p>
            </div>
            <div>
              <label className="text-gray-400 text-xs">Telefon</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-[#3a3359] text-white text-sm md:text-base p-2 rounded border border-[#4a4569] focus:border-[#F5B93F] focus:outline-none"
                />
              ) : (
                <p className="text-white text-sm md:text-base">{profile.phone}</p>
              )}
            </div>
            <div>
              <label className="text-gray-400 text-xs">Rol</label>
              <p className="text-white text-sm md:text-base">{profile.role}</p>
            </div>

            <div className="pt-4 space-y-2">
              {isEditing ? (
                <>
                  <button 
                    className="w-full bg-[#F5B93F] text-black p-2 rounded text-sm disabled:opacity-50"
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                  >
                    {isLoading ? "Kaydediliyor..." : "Kaydet"}
                  </button>
                  <button 
                    className="w-full bg-[#3a3359] text-white p-2 rounded text-sm"
                    onClick={handleCancelEdit}
                  >
                    İptal
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="w-full bg-[#F5B93F] text-black p-2 rounded text-sm"
                    onClick={handleEditClick}
                  >
                    Profili Güncelle
                  </button>
                  <button className="w-full bg-[#3a3359] text-white p-2 rounded text-sm">Şifre Değiştir</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

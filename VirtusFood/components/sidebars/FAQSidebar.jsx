"use client"

import { useState } from "react"
import { XIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

// FAQ data
const faqs = [
  {
    id: 1,
    question: "Menü nasıl oluşturulur?",
    answer:
      "Yeni kategori ekle butonuna tıklayarak kategoriler oluşturabilir, ardından her kategoriye ürünler ekleyebilirsiniz.",
  },
  {
    id: 2,
    question: "Ürünlere malzeme nasıl eklenir?",
    answer: "Ürünü düzenle butonuna tıklayarak sağ tarafta açılan malzemeler kısmından yeni malzeme ekleyebilirsiniz.",
  },
  {
    id: 3,
    question: "QR kod nasıl oluşturulur?",
    answer: "Menünüz hazır olduğunda üst menüdeki QR kod simgesine tıklayarak QR kodunuzu oluşturabilirsiniz.",
  },
  {
    id: 4,
    question: "Fiyatları nasıl güncellerim?",
    answer: "Ürünü düzenle butonuna tıklayarak açılan formdan fiyat bilgisini güncelleyebilirsiniz.",
  },
]

export default function FAQSidebar({ onClose }) {
  const [expandedFAQ, setExpandedFAQ] = useState(null)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="ml-auto w-[80%] max-w-[300px] bg-[#272042] h-full overflow-y-auto">
        <div className="p-4 flex justify-between items-center border-b border-[#3a3359]">
          <h2 className="text-[#F5B93F] text-lg md:text-xl font-bold">SIKÇA SORULAN SORULAR</h2>
          <button className="text-white" onClick={onClose}>
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="mb-3 border-b border-[#3a3359] pb-3">
              <button
                className="flex justify-between items-center w-full text-white text-left text-sm md:text-base"
                onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
              >
                <span>{faq.question}</span>
                {expandedFAQ === faq.id ? (
                  <ChevronUpIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                )}
              </button>
              {expandedFAQ === faq.id && <p className="text-gray-300 text-xs md:text-sm mt-2 pl-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

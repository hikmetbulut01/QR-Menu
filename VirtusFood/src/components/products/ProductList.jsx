import ProductCard from "./ProductCard"

export default function ProductList({ products, onEdit, onDelete, onSelect, activeTab }) {
  if (!activeTab) {
    return (
      <div className="bg-[#312a52] rounded-lg p-6 text-center">
        <p className="text-white">Kategori seçiniz.</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="bg-[#312a52] rounded-lg p-6 text-center">
        <p className="text-white">Bu kategoride ürün bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

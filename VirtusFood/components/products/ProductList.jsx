import ProductCard from "./ProductCard"

export default function ProductList({ products, onEdit }) {
  if (products.length === 0) {
    return (
      <div className="bg-[#312a52] rounded-lg p-6 text-center">
        <p className="text-white">Bu kategoride henüz ürün bulunmuyor.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={() => onEdit(product)} />
      ))}
    </div>
  )
}

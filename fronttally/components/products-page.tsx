//products-page.tsx
"use client"

import { useProducts } from "@/hooks/useProducts"
import { ProductCard } from "./product-card"

export function ProductsPage() {
  const { products, getDemandForProduct } = useProducts()
    //i spam scrollbars
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Products</h1>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">All Products</span>
        </div>
      </div>
        
      <div className="max-h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} getDemandForProduct={getDemandForProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}


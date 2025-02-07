//product-card.tsx
"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Product } from "@/types/product"

//each individual product card is also a component for efficiency

//if I actually went and got a bunch of images this would be a better function
function getProductImagePath(category: string) {
    switch (category) {
      case "Hoodie":
        return "/images/logoHoodie.png"
      case "Sweatpants":
        return "/images/logoSweats.png"
      case "T-Shirt":
        return "/images/logoTee.png"
      default:
        return "/images/gildan-t-shirt-black.png"
    }
  }

interface ProductCardProps {
  product: Product
  getDemandForProduct: (productId: string, color: string, size?: string) => number
}

export function ProductCard({ product, getDemandForProduct }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color)

  const totalDemand = selectedColor ? getDemandForProduct(product.id, selectedColor) : 0

  const uniqueMaterials = Array.from(new Set(product.materials.map((m) => `${m.brand} ${m.category}`)))

  return (
    <div className="bg-white rounded-xl border border-[#dadcee] p-4 flex flex-col gap-4">
      <div className="aspect-square rounded-lg border border-[#dadcee] bg-white p-2 flex items-center justify-center">
      <img
          // category-based image for now
          src={getProductImagePath(product.category)}
          alt={product.name}
          onError={(e) => {
            // if the image is missing (won't happen with my function)
            e.currentTarget.src = "/images/gildan-t-shirt-black.png"
          }}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-[#262626]">{product.name}</h3>
        <div className="text-sm text-gray-500">Uses: {uniqueMaterials.join(", ")}</div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.color}
              onClick={() => setSelectedColor(variant.color)}
              className={cn(
                "w-6 h-6 rounded-full border",
                selectedColor === variant.color ? "ring-2 ring-[#444eaa] ring-offset-2" : "",
              )}
              style={{ backgroundColor: variant.color.toLowerCase() }}
            />
          ))}
        </div>

        {selectedColor && (
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Demand: {totalDemand}</div>
            <div className="grid grid-cols-5 gap-2">
              {product.variants
                .find((v) => v.color === selectedColor)
                ?.sizes.map((sizeData) => (
                  <div key={sizeData.size} className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs font-medium">{sizeData.size}</div>
                    <div className="text-sm text-gray-500">
                      {getDemandForProduct(product.id, selectedColor, sizeData.size)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


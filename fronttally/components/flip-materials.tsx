//flip-materials.tsx
"use client"

import type { Product } from "@/types/product"
import type React from "react" 
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface InventoryHoverDetailsProps {
  children: React.ReactNode
  products: Product[]
  totalDemand: number
}

export function InventoryHoverDetails({ children, products, totalDemand }: InventoryHoverDetailsProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Used in {products.length} products</h4>
          <div className="text-sm text-gray-500">Total demand: {totalDemand} units</div>
          <div className="space-y-1">
            {products.map((product) => (
              <div key={product.id} className="text-sm flex items-center gap-2 py-1">
                <div className="w-8 h-8 rounded border border-[#dadcee] bg-white p-1 flex items-center justify-center">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}


//useProducts.ts
"use client"

import { useState } from "react"
import type { Product, ProductDemand } from "@/types/product"

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Classic Logo Tee",
    image: "/placeholder.svg",
    category: "T-Shirt",
    brand: "Gildan",
    variants: [
      {
        color: "Black",
        sizes: [
          { size: "S", demand: 15 },
          { size: "M", demand: 25 },
          { size: "L", demand: 20 },
        ],
      },
      {
        color: "White",
        sizes: [
          { size: "S", demand: 10 },
          { size: "M", demand: 18 },
          { size: "L", demand: 12 },
        ],
      },
      {
        color: "Red",
        sizes: [
          { size: "S", demand: 8 },
          { size: "M", demand: 15 },
          { size: "L", demand: 10 },
        ],
      },
    ],
    materials: [
      { inventoryId: "3", name: "T-Shirt", brand: "Gildan", color: "Black", size: "S", category: "T-Shirt" },
      { inventoryId: "4", name: "T-Shirt", brand: "Gildan", color: "Black", size: "M", category: "T-Shirt" },
      { inventoryId: "5", name: "T-Shirt", brand: "Gildan", color: "Black", size: "L", category: "T-Shirt" },
      { inventoryId: "6", name: "T-Shirt", brand: "Gildan", color: "White", size: "S", category: "T-Shirt" },
      { inventoryId: "7", name: "T-Shirt", brand: "Gildan", color: "White", size: "M", category: "T-Shirt" },
      { inventoryId: "8", name: "T-Shirt", brand: "Gildan", color: "White", size: "L", category: "T-Shirt" },
      { inventoryId: "1", name: "T-Shirt", brand: "Gildan", color: "Red", size: "S", category: "T-Shirt" },
      { inventoryId: "2", name: "T-Shirt", brand: "Gildan", color: "Red", size: "M", category: "T-Shirt" },
      { inventoryId: "13", name: "T-Shirt", brand: "Gildan", color: "Red", size: "L", category: "T-Shirt" },
    ],
  },
  {
    id: "2",
    name: "Premium Hoodie",
    image: "/placeholder.svg",
    category: "Hoodie",
    brand: "Bella+Canvas",
    variants: [
      {
        color: "Yellow",
        sizes: [
          { size: "M", demand: 8 },
          { size: "L", demand: 15 },
          { size: "XL", demand: 10 },
        ],
      },
      {
        color: "Gray",
        sizes: [
          { size: "M", demand: 5 },
          { size: "L", demand: 10 },
          { size: "XL", demand: 7 },
        ],
      },
    ],
    materials: [
      { inventoryId: "12", name: "Hoodie", brand: "Bella+Canvas", color: "Yellow", size: "L", category: "Hoodie" },
      { inventoryId: "14", name: "Hoodie", brand: "Bella+Canvas", color: "Gray", size: "L", category: "Hoodie" },
    ],
  },
  {
    id: "3",
    name: "Vintage Logo Hoodie",
    image: "/placeholder.svg",
    category: "Hoodie",
    brand: "Hanes",
    variants: [
      {
        color: "Navy",
        sizes: [
          { size: "M", demand: 12 },
          { size: "L", demand: 18 },
          { size: "XL", demand: 15 },
        ],
      },
      {
        color: "Black",
        sizes: [
          { size: "M", demand: 8 },
          { size: "L", demand: 12 },
          { size: "XL", demand: 10 },
        ],
      },
    ],
    materials: [
      { inventoryId: "9", name: "Hoodie", brand: "Hanes", color: "Navy", size: "XL", category: "Hoodie" },
      { inventoryId: "15", name: "Hoodie", brand: "Hanes", color: "Black", size: "XL", category: "Hoodie" },
    ],
  },
  {
    id: "4",
    name: "Comfort Sweatpants",
    image: "/placeholder.svg",
    category: "Sweatpants",
    brand: "Fruit of the Loom",
    variants: [
      {
        color: "Gray",
        sizes: [
          { size: "S", demand: 10 },
          { size: "M", demand: 20 },
          { size: "L", demand: 15 },
        ],
      },
      {
        color: "Black",
        sizes: [
          { size: "S", demand: 7 },
          { size: "M", demand: 14 },
          { size: "L", demand: 10 },
        ],
      },
    ],
    materials: [
      {
        inventoryId: "10",
        name: "Sweatpants",
        brand: "Fruit of the Loom",
        color: "Gray",
        size: "M",
        category: "Sweatpants",
      },
      {
        inventoryId: "16",
        name: "Sweatpants",
        brand: "Fruit of the Loom",
        color: "Black",
        size: "M",
        category: "Sweatpants",
      },
    ],
  },
  {
    id: "5",
    name: "Eco-Friendly Tee",
    image: "/placeholder.svg",
    category: "T-Shirt",
    brand: "American Apparel",
    variants: [
      {
        color: "Green",
        sizes: [
          { size: "S", demand: 25 },
          { size: "M", demand: 30 },
          { size: "L", demand: 20 },
        ],
      },
      {
        color: "Blue",
        sizes: [
          { size: "S", demand: 18 },
          { size: "M", demand: 22 },
          { size: "L", demand: 15 },
        ],
      },
    ],
    materials: [
      { inventoryId: "11", name: "T-Shirt", brand: "American Apparel", color: "Green", size: "S", category: "T-Shirt" },
      { inventoryId: "17", name: "T-Shirt", brand: "American Apparel", color: "Blue", size: "S", category: "T-Shirt" },
    ],
  },
  {
    id: "6",
    name: "Limited Edition Tee",
    image: "/placeholder.svg",
    category: "T-Shirt",
    brand: "Gildan",
    variants: [
      {
        color: "Black",
        sizes: [
          { size: "S", demand: 10 },
          { size: "M", demand: 15 },
          { size: "L", demand: 10 },
        ],
      },
      {
        color: "White",
        sizes: [
          { size: "S", demand: 8 },
          { size: "M", demand: 12 },
          { size: "L", demand: 8 },
        ],
      },
      {
        color: "Purple",
        sizes: [
          { size: "S", demand: 5 },
          { size: "M", demand: 8 },
          { size: "L", demand: 5 },
        ],
      },
    ],
    materials: [
      { inventoryId: "3", name: "T-Shirt", brand: "Gildan", color: "Black", size: "S", category: "T-Shirt" },
      { inventoryId: "4", name: "T-Shirt", brand: "Gildan", color: "Black", size: "M", category: "T-Shirt" },
      { inventoryId: "5", name: "T-Shirt", brand: "Gildan", color: "Black", size: "L", category: "T-Shirt" },
      { inventoryId: "6", name: "T-Shirt", brand: "Gildan", color: "White", size: "S", category: "T-Shirt" },
      { inventoryId: "7", name: "T-Shirt", brand: "Gildan", color: "White", size: "M", category: "T-Shirt" },
      { inventoryId: "8", name: "T-Shirt", brand: "Gildan", color: "White", size: "L", category: "T-Shirt" },
      { inventoryId: "18", name: "T-Shirt", brand: "Gildan", color: "Purple", size: "S", category: "T-Shirt" },
      { inventoryId: "19", name: "T-Shirt", brand: "Gildan", color: "Purple", size: "M", category: "T-Shirt" },
      { inventoryId: "20", name: "T-Shirt", brand: "Gildan", color: "Purple", size: "L", category: "T-Shirt" },
    ],
  },
]

// initialize demand data based on the product variants
const initialDemand: ProductDemand[] = initialProducts.flatMap((product) =>
  product.variants.flatMap((variant) =>
    variant.sizes.map((size) => ({
      productId: product.id,
      color: variant.color,
      size: size.size,
      quantity: size.demand,
    })),
  ),
)

//resuable functions for actually determing different sub demands

export function useProducts(products = initialProducts) {
  const [productList] = useState<Product[]>(products)
  const [demand] = useState<ProductDemand[]>(initialDemand)

  const getDemandForProduct = (productId: string, color: string, size?: string) => {
    return demand
      .filter((d) => d.productId === productId && d.color === color && (size ? d.size === size : true))
      .reduce((sum, d) => sum + d.quantity, 0)
  }

  const getTotalDemandForInventoryItem = (inventoryId: string, productId?: string) => {
    return productList.reduce((totalDemand, product) => {
      if (productId && product.id !== productId) return totalDemand
      const materialUsage = product.materials.filter((m) => m.inventoryId === inventoryId)
      return (
        totalDemand +
        materialUsage.reduce((itemDemand, material) => {
          const variantDemand =
            product.variants.find((v) => v.color === material.color)?.sizes.find((s) => s.size === material.size)
              ?.demand || 0
          return itemDemand + variantDemand
        }, 0)
      )
    }, 0)
  }

  const getProductsUsingInventoryItem = (inventoryId: string) => {
    return productList.filter((product) => product.materials.some((material) => material.inventoryId === inventoryId))
  }

  return {
    products: productList,
    getDemandForProduct,
    getTotalDemandForInventoryItem,
    getProductsUsingInventoryItem,
  }
}


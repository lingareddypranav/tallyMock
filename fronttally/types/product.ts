//product.ts

import type { Size, Category, Color, Brand } from "./inventory"

export interface ProductVariant {
  color: Color
  sizes: {
    size: Size
    demand: number
  }[]
}

export interface Product {
  id: string
  name: string //prolly needs a name rather than the blanks
  image: string
  category: Category
  brand: Brand
  variants: ProductVariant[]
  materials: {
    inventoryId: string
    name: string
    brand: Brand
    color: Color
    size: Size
    category: Category
  }[]
}

export interface ProductDemand {
  productId: string
  color: Color
  size: Size
  quantity: number
}


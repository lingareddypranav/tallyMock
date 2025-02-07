// FILE: /types/inventory.ts

export type Size = "XS" | "S" | "M" | "L" | "XL"
export type Category = "T-Shirt" | "Hoodie" | "Sweatpants"
export type Color = "Red" | "Black" | "White" | "Navy" | "Gray" | "Green" | "Blue" | "Yellow" | "Purple"
export type Brand = "Gildan" | "Hanes" | "Fruit of the Loom" | "American Apparel" | "Bella+Canvas" | ""

// prolly too many options ^
export interface InventoryItem {
  id: string
  image: string
  category: Category
  size: Size
  color: Color
  brand: Brand
  quantity: number
  highlighted?: boolean
}

export interface Filter {
  category?: Category[]
  size?: Size[]
  color?: Color[]
  brand?: Brand[]
}

export type SortField = "name" | "category" | "size" | "color" | "brand" | "quantity" | "pcs"
export type SortDirection = "asc" | "desc"

export interface Sort {
  field: SortField
  direction: SortDirection
}

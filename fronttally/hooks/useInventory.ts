// FILE: /hooks/useInventory.ts
"use client"

import { useState, useMemo } from "react"
import Fuse from "fuse.js"
import type { InventoryItem, Filter, Sort, Brand, SortField } from "@/types/inventory"
import { useProducts } from "./useProducts"

// fuzzy search options with fuse.js
const fuseOptions = {
  keys: ["category", "size", "color", "brand"],
  threshold: 0.4,  // relaxed matching
  distance: 100,   // lets minor spelling mistakes go
}

export function useInventory(initialItems: InventoryItem[]) {
  const { getTotalDemandForInventoryItem } = useProducts()
  const [brands, setBrands] = useState<Brand[]>(Array.from(new Set(initialItems.map((item) => item.brand))))
  const [items, setItems] = useState(initialItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Filter>({})
  const [sort, setSort] = useState<Sort>({ field: "name", direction: "asc" })

  // 2) sorting helper
  function getSortValue(item: InventoryItem, field: SortField): string | number {
    switch (field) {
      case "pcs":
        return getTotalDemandForInventoryItem(item.id)
      case "quantity":
        return item.quantity
      case "size": {
        const sizeOrder = { XS: 0, S: 1, M: 2, L: 3, XL: 4 }
        return sizeOrder[item.size]
      }
      case "brand":
      case "category":
      case "color":
        // all are strings, so let's just return them
        return item[field] || ""
      case "name":
        // display name not saved
        return `${item.brand} ${item.category} - ${item.color} / ${item.size}`
      default:
        return 0
    }
  }

  // Initialize Fuse 
  // name isn't stored in the item, but brand/color/size +. for searching
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items])

  // fuzzy search
  const searchedItems = useMemo(() => {
    if (!searchQuery) return items
    return fuse.search(searchQuery).map((result) => result.item)
  }, [fuse, items, searchQuery])

  // filters
  const filteredItems = useMemo(() => {
    return searchedItems.filter((item) => {
      const categoryMatch = !filters.category?.length || filters.category.includes(item.category)
      const sizeMatch = !filters.size?.length || filters.size.includes(item.size)
      const colorMatch = !filters.color?.length || filters.color.includes(item.color)
      const brandMatch = !filters.brand?.length || filters.brand.includes(item.brand)
      return categoryMatch && sizeMatch && colorMatch && brandMatch
    })
  }, [searchedItems, filters])

  // sorting
  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const aVal = getSortValue(a, sort.field)
      const bVal = getSortValue(b, sort.field)

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sort.direction === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal)
      } else {
        return sort.direction === "asc" 
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number)
      }
    })
  }, [filteredItems, sort])

  // basic CRUD methods
  const addItem = (newItem: Omit<InventoryItem, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setItems((prev) => [...prev, { ...newItem, id }])

    if (!brands.includes(newItem.brand)) {
      setBrands((prev) => [...prev, newItem.brand])
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return {
    items: sortedItems,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sort,
    setSort,
    addItem,
    updateQuantity,
    removeItem,
    brands,
  }
}

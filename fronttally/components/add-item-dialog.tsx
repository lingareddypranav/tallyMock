// FILE: /components/add-item-dialog.tsx
"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Category, Size, Color, Brand, InventoryItem } from "@/types/inventory"


//everything for the +add new button
const categories: Category[] = ["T-Shirt", "Hoodie", "Sweatpants"]
const sizes: Size[] = ["XS", "S", "M", "L", "XL"]
const colors: Color[] = ["Red", "Black", "White", "Navy", "Gray", "Green", "Blue", "Yellow"]

interface AddItemDialogProps {
  onAdd: (item: Omit<InventoryItem, "id">) => void
  existingItems: InventoryItem[]
  children: React.ReactNode
}

export function AddItemDialog({ onAdd, existingItems, children }: AddItemDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    brand: "" as Brand,
    category: "T-Shirt" as Category,
    color: "White" as Color,
    size: "M" as Size,
    quantity: 0,
  })
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = React.useState(false)

  const brands = React.useMemo(() => {
    const uniqueBrands = new Set(existingItems.map((item) => item.brand))
    return Array.from(uniqueBrands)
  }, [existingItems])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // generate a display name at render time instead.
    const existingItem = existingItems.find(
      (item) =>
        item.brand === formData.brand &&
        item.category === formData.category &&
        item.color === formData.color &&
        item.size === formData.size,
    )

    if (existingItem) {
      setIsDuplicateDialogOpen(true)
      return
    }

    // formData + default image here
    onAdd({ ...formData, image: "/placeholder.svg" })
    setOpen(false)
    setFormData({ ...formData, brand: "", quantity: 0 })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="brand" className="text-sm">
                  Brand
                </label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value as Brand })}
                  list="brand-options"
                  required
                />
                <datalist id="brand-options">
                  {brands.map((brand) => (
                    <option key={brand} value={brand} />
                  ))}
                </datalist>
              </div>
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full p-2 border rounded-md"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="color" className="text-sm">
                  Color
                </label>
                <select
                  id="color"
                  className="w-full p-2 border rounded-md"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value as Color })}
                >
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="size" className="text-sm">
                  Size
                </label>
                <select
                  id="size"
                  className="w-full p-2 border rounded-md"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value as Size })}
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="quantity" className="text-sm">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Item</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDuplicateDialogOpen} onOpenChange={setIsDuplicateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Duplicate Item</DialogTitle>
          </DialogHeader>
          <p>This material is already being tracked.</p>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setIsDuplicateDialogOpen(false)}>Ok</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

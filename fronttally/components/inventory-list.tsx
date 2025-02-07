// //components/inventory-list.tsx
"use client"

import * as React from "react"
import Image from "next/image"
import { Search, ArrowUpDown } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useInventory } from "@/hooks/useInventory"
import { useProducts } from "@/hooks/useProducts"
import { FilterPopover } from "@/components/filter-popover"
import { SortPopover } from "@/components/sort-popover"
import { AddItemDialog } from "@/components/add-item-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { InventoryItem } from "@/types/inventory"
import { useState, useEffect } from "react"
import { useHoldAction } from "@/hooks/useHoldAction"

// resusable generate display name
function getItemDisplayName(item: InventoryItem) {
  return `${item.brand} ${item.category} - ${item.color} / ${item.size}`
}

// reusable image path function
function getItemImagePath(item: InventoryItem) {
    //im way too lazy rn to go and make images for all of the different colors I added so this will help for now
    const validFileNames = [
      "gildan-t-shirt-black.png",
      "gildan-t-shirt-red.png",
      "gildan-t-shirt-white.png",
    ];
  
    const fileName = `${item.brand.toLowerCase()}-${item.category.toLowerCase()}-${item.color.toLowerCase()}.png`;
  
    if (validFileNames.includes(fileName)) {
      return `/images/${fileName}`;
    } 
    else {
      return "/images/gildan-t-shirt-black.png"; 
    }
  }

//initialize a bunch to show off scroll
const initialItems: InventoryItem[] = [
  {
    id: "1",
    // "Gildan T-Shirt - Red / M"
    image: "/images/gildanRed.png",
    category: "T-Shirt",
    size: "M",
    color: "Red",
    brand: "Gildan",
    quantity: 13,
    highlighted: true,
  },
  {
    id: "2",
    image: "/images/gildanRed.png",
    category: "T-Shirt",
    size: "L",
    color: "Red",
    brand: "Gildan",
    quantity: 46,
  },
  {
    id: "3",
    image: "/images/gildanBlack.png",
    category: "T-Shirt",
    size: "S",
    color: "Black",
    brand: "Gildan",
    quantity: 21,
    highlighted: true,
  },
  {
    id: "4",
    image: "/images/gildanBlack.png",
    category: "T-Shirt",
    size: "M",
    color: "Black",
    brand: "Gildan",
    quantity: 34,
  },
  {
    id: "5",
    image: "/images/gildanBlack.png",
    category: "T-Shirt",
    size: "L",
    color: "Black",
    brand: "Gildan",
    quantity: 27,
  },
  {
    id: "6",
    image: "/images/gildanWhite.png",
    category: "T-Shirt",
    size: "S",
    color: "White",
    brand: "Gildan",
    quantity: 34,
  },
  {
    id: "7",
    image: "/images/gildanWhite.png",
    category: "T-Shirt",
    size: "M",
    color: "White",
    brand: "Gildan",
    quantity: 51,
  },
  {
    id: "8",
    image: "/images/gildanWhite.png",
    category: "T-Shirt",
    size: "L",
    color: "White",
    brand: "Gildan",
    quantity: 29,
  },
  {
    id: "9",
    image: "/images/gildanRed.png",
    category: "Hoodie",
    size: "XL",
    color: "Navy",
    brand: "Hanes",
    quantity: 15,
  },
  {
    id: "10",
    image: "/images/gildanRed.png",
    category: "Sweatpants",
    size: "M",
    color: "Gray",
    brand: "Fruit of the Loom",
    quantity: 40,
  },
  {
    id: "11",
    image: "/images/gildanRed.png",
    category: "T-Shirt",
    size: "S",
    color: "Green",
    brand: "American Apparel",
    quantity: 18,
  },
  {
    id: "12",
    image: "/images/gildanRed.png",
    category: "Hoodie",
    size: "L",
    color: "Yellow",
    brand: "Bella+Canvas",
    quantity: 22,
  },
]

export function InventoryList() {
  const {
    items,               //sorted & filtered by the hook
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    sort,
    setSort,
    addItem,
    updateQuantity,
    removeItem,
  } = useInventory(initialItems)

  const { getProductsUsingInventoryItem, getTotalDemandForInventoryItem } = useProducts()

  // delete confirmation state
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // inventory or order queue
  const [activeTab, setActiveTab] = useState<"inventory" | "queue">("inventory")

  // flipped items ("Used in X products")
  const [flippedItems, setFlippedItems] = useState<Set<string>>(new Set())

  // 1) using a nice hold-action hook for deletion
  const { startHold: startDeleteHold, cancelHold: cancelDeleteHold } = useHoldAction(() => {
    if (itemToDelete) {
      setIsDeleteDialogOpen(true)
    }
  })

  const handleDeleteStart = (id: string) => {
    setItemToDelete(id)
    startDeleteHold()
  }

  const handleDeleteEnd = () => {
    cancelDeleteHold()
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      removeItem(itemToDelete)
      setIsDeleteDialogOpen(false)
      setItemToDelete(null)
    }
  }

  // flip card logic
  const handleFlip = (id: string) => {
    setFlippedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // "Order Queue" items with quantity below demand
  const finalItems = items.filter((item) => {
    const totalDemand = getTotalDemandForInventoryItem(item.id)
    if (activeTab === "queue") {
      return item.quantity < totalDemand
    }
    return true
  })

  // CSS snippet for backface hidden
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
       .backface-hidden {
         backface-visibility: hidden;
         -webkit-backface-visibility: hidden;
       }
     `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Materials</h1>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Blanks</span>
        </div>
        <div className="inline-flex rounded-lg bg-[#e2e2e2] p-0.5">
          <button
            onClick={() => setActiveTab("inventory")}
            className={cn(
              "px-4 py-1.5 text-sm rounded-md transition-colors",
              activeTab === "inventory" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-100",
            )}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab("queue")}
            className={cn(
              "px-4 py-1.5 text-sm rounded-md transition-colors",
              activeTab === "queue" ? "bg-white shadow-sm" : "text-gray-500 hover:bg-gray-100",
            )}
          >
            Order Queue
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#dadcee]">
        {/* Search Bar Row */}
        <div className="p-3 pb-0 flex items-center gap-3">
          <div className="relative w-1/2 flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Materials"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 border border-[#dadcee] rounded-lg bg-white text-sm"
              />
            </div>
            <FilterPopover filters={filters} onChange={setFilters}>
              <button className="p-1.5 ml-2 border border-[#dadcee] rounded-lg">
                <Image src="/icons/filter.png" alt="Filter" width={16} height={16} />
              </button>
            </FilterPopover>
            <SortPopover sort={sort} onChange={setSort}>
              <button className="p-1.5 ml-2 border border-[#dadcee] rounded-lg">
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
              </button>
            </SortPopover>
          </div>
          {activeTab === "inventory" && (
            <div className="ml-auto">
              <AddItemDialog onAdd={addItem} existingItems={items}>
                <button className="px-3 py-1.5 bg-[#444eaa] text-white rounded-lg text-sm">+ Add New</button>
              </AddItemDialog>
            </div>
          )}
        </div>

        {/* Inventory List with Scroll */}
        <div className="max-h-[calc(100vh-240px)] overflow-y-auto hide-scrollbar">
          <div className="px-2 pt-2">
            {finalItems.map((item) => {
              const productsUsingItem = getProductsUsingInventoryItem(item.id)
              const totalDemand = getTotalDemandForInventoryItem(item.id)
              const deficit = Math.max(0, totalDemand - item.quantity)

              return (
                <div key={item.id} className="flex items-center justify-between p-2">
                  <motion.div
                    className="flex items-center gap-3 cursor-pointer relative w-full h-auto min-h-[40px]"
                    onClick={() => handleFlip(item.id)}
                    initial={false}
                    animate={{ rotateY: flippedItems.has(item.id) ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="w-10 h-10 rounded-lg border border-[#dadcee] bg-white p-1 flex items-center justify-center absolute left-0">
                      <img
                        src={getItemImagePath(item) || "/placeholder.svg"}
                        alt=""
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div
                      className="absolute inset-0 backface-hidden flex items-center"
                      style={{ transform: "rotateY(0deg)" }}
                    >
                      <span className="text-[#262626] text-sm font-medium ml-12">
                        {getItemDisplayName(item)}
                      </span>
                    </div>
                    <div
                      className="absolute inset-0 backface-hidden flex items-center justify-start bg-white rounded-lg border border-[#dadcee] p-2 overflow-hidden"
                      style={{ transform: "rotateY(180deg)" }}
                    >
                      <div className="text-sm text-left w-full whitespace-nowrap overflow-x-auto">
                        <span className="font-medium">Used in {productsUsingItem.length} product(s):</span>
                        {productsUsingItem.map((p, index) => (
                          <span key={p.id} className="ml-2">
                            {p.name} ({getTotalDemandForInventoryItem(item.id, p.id)} PCS)
                            {index < productsUsingItem.length - 1 ? "," : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {activeTab === "inventory" ? (
                    <div className="flex items-center">
                      <button
                        // Use hold logic
                        onMouseDown={() => handleDeleteStart(item.id)}
                        onMouseUp={handleDeleteEnd}
                        onMouseLeave={handleDeleteEnd}
                        onTouchStart={() => handleDeleteStart(item.id)}
                        onTouchEnd={handleDeleteEnd}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-[52px] flex items-center justify-center border border-[#dadcee] text-gray-400 text-lg"
                      >
                        -
                      </button>
                      <div className="flex flex-col w-20">
                        <div
                          className={cn(
                            "h-8 flex items-center justify-center border-y border-x border-[#dadcee] text-base font-medium",
                            item.quantity < totalDemand ? "bg-[#faf2e3]" : "bg-white",
                          )}
                        >
                          {item.quantity}
                        </div>
                        <div
                          className={cn(
                            "h-[20px] text-xs flex items-center justify-center border-x border-b border-[#dadcee]",
                            item.quantity < totalDemand ? "bg-[#c19a4d] text-white" : "bg-gray-50 text-gray-500",
                          )}
                        >
                          {totalDemand} PCS
                        </div>
                      </div>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-[52px] flex items-center justify-center border border-[#dadcee] text-gray-400 text-lg"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    // Order Queue View
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col w-20">
                        <div className="h-8 flex items-center justify-center border-y border-x border-[#dadcee] text-base font-medium">
                          {item.quantity}
                        </div>
                        <div className="h-[20px] text-xs flex items-center justify-center border-x border-b border-[#dadcee] bg-gray-50 text-gray-500">
                          {totalDemand} PCS
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-red-100 rounded-lg text-sm font-medium text-red-800">
                        {deficit}
                      </div>
                      <button
                        className="px-3 py-1.5 bg-[#444eaa] text-white rounded-lg text-sm ml-auto"
                        onClick={() => {
                          // Placeholder for order functionality
                          console.log(`Ordering ${deficit} of ${getItemDisplayName(item)}`)
                        }}
                      >
                        Order
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

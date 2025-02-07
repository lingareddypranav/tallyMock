//sort-popover.tsx

import type * as React from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Sort, SortField } from "@/types/inventory"

//everything with the sort button

const sortOptions: { label: string; value: SortField }[] = [
  { label: "Brand", value: "brand" },
  { label: "Category", value: "category" },
  { label: "Size", value: "size" },
  { label: "Color", value: "color" },
  { label: "Quantity", value: "quantity" },
  { label: "PCS", value: "pcs" },
]

interface SortPopoverProps {
  sort: Sort
  onChange: (sort: Sort) => void
  children: React.ReactNode
}

export function SortPopover({ sort, onChange, children }: SortPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className="flex items-center justify-between w-full px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md"
            onClick={() =>
              onChange({
                field: option.value,
                direction: sort.field === option.value && sort.direction === "asc" ? "desc" : "asc",
              })
            }
          >
            {option.label}
            {sort.field === option.value &&
              (sort.direction === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />)}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}


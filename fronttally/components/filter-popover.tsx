//filter-popover.tsx
import type * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import type { Category, Size, Color, Brand, Filter } from "@/types/inventory"

//everything with the filter button
const categories: Category[] = ["T-Shirt", "Hoodie", "Sweatpants"]
const sizes: Size[] = ["XS", "S", "M", "L", "XL"]
const colors: Color[] = ["Red", "Black", "White", "Navy", "Gray", "Green", "Blue", "Yellow"]
const brands: Brand[] = ["Gildan", "Hanes", "Fruit of the Loom", "American Apparel", "Bella+Canvas"]

interface FilterPopoverProps {
  filters: Filter
  onChange: (filters: Filter) => void
  children: React.ReactNode
}

export function FilterPopover({ filters, onChange, children }: FilterPopoverProps) {
  const toggleFilter = (key: keyof Filter, value: string) => {
    onChange({
      ...filters,
      [key]: filters[key]?.includes(value as never)
        ? filters[key]?.filter((v) => v !== value).length
          ? filters[key]?.filter((v) => v !== value)
          : undefined
        : [...(filters[key] || []), value],
    })
  }

  const clearAllFilters = () => {
    onChange({
      category: undefined,
      size: undefined,
      color: undefined,
      brand: undefined,
    })
  }

  const FilterSection = ({
    title,
    items,
    filterKey,
  }: {
    title: string
    items: string[]
    filterKey: keyof Filter
  }) => (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-medium">{title}</h3>
      <div className="space-y-1">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters[filterKey]?.includes(item as never) || false}
              onChange={() => toggleFilter(filterKey, item)}
              className="rounded border-gray-300"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  )

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-96 p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <FilterSection title="Category" items={categories} filterKey="category" />
          </div>
          <div className="flex-1">
            <FilterSection title="Size" items={sizes} filterKey="size" />
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <FilterSection title="Color" items={colors} filterKey="color" />
          </div>
          <div className="flex-1">
            <FilterSection title="Brand" items={brands} filterKey="brand" />
          </div>
        </div>
        <Button onClick={clearAllFilters} variant="outline" className="w-full mt-4">
          Clear All Filters
        </Button>
      </PopoverContent>
    </Popover>
  )
}


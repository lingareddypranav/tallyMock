import { AppSidebar } from "@/components/app-sidebar"
import { ProductsPage as ProductsPageComponent } from "@/components/products-page"

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen bg-[#f3f4fc]">
      <AppSidebar />
      <div className="flex-1 pl-14">
        <div className="max-w-[1000px] mx-auto px-6 py-6">
          <ProductsPageComponent />
        </div>
      </div>
    </div>
  )
}
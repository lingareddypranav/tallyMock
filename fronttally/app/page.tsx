import { AppSidebar } from "@/components/app-sidebar"
import { InventoryList } from "@/components/inventory-list"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#f3f4fc]">
      <audio src="/audio/background.mp3" autoPlay loop />
      <AppSidebar />
      <div className="flex-1 pl-14">
        <div className="max-w-[1000px] mx-auto px-6 py-6">
          <InventoryList />
        </div>
      </div>
    </div>
  )
}
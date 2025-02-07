//app-sidebar.tsx
"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React from "react"

export function AppSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Materials", icon: "/icons/materialsIcon.png", href: "/" },
    { name: "Products", icon: "/icons/productsIcon.png", href: "/products" },
    { name: "Fulfillment", icon: "/icons/fulfillmentIcon.png", href: "/fulfillment" },
    { name: "Integrations", icon: "/icons/integrationsIcon.png", href: "/integrations" },
  ]

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-white border-r transition-all duration-300 z-50",
        isExpanded ? "w-60" : "w-14",
        "hover:w-60",
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={cn("flex items-center gap-3 h-14", isExpanded ? "px-4" : "justify-center")}>
        <div className="flex items-center justify-center w-10 h-10 ml-3">
          <Image src="/icons/tallyicon.svg" alt="Tally" width={24} height={24} className="min-w-[24px]" />
        </div>
        <span
          className={cn(
            "text-lg font-medium text-[#444eaa] whitespace-nowrap transition-opacity",
            isExpanded ? "opacity-100" : "opacity-0 w-0",
          )}
        >
          Tally
        </span>
      </div>

      <div className="flex flex-col gap-2 px-2">
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm transition-colors",
                pathname === item.href ? "bg-[#F5F5FF] text-[#444eaa]" : "text-gray-600 hover:bg-gray-50",
                isExpanded ? "px-3 py-2" : "w-10 h-10 mx-auto justify-center",
              )}
            >
              <div className="flex items-center justify-center w-10 h-10 ml-3">
                <Image
                  src={item.icon || "/placeholder.svg"}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="min-w-[24px]"
                />
              </div>
              <span
                className={cn("whitespace-nowrap transition-opacity", isExpanded ? "opacity-100" : "opacity-0 w-0")}
              >
                {item.name}
              </span>
            </Link>
            {index === 2 && (
              <div className={cn("mx-auto my-2 border-t transition-all", isExpanded ? "w-[calc(100%-48px)]" : "w-6")} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white">
        <div className={cn("flex flex-col items-center pb-4", isExpanded ? "px-4 pt-20" : "px-2 pt-4")}>
          
          <button
            className={cn(
            "flex items-center gap-1 text-red-600 text-sm rounded-lg transition-colors w-full",
            isExpanded 
                ? "px-3 py-2 mt-30 mb-4" // Move it down slightly when expanded
                : "w-10 h-10 mx-auto justify-center hover:bg-gray-50",
            )}
          >
            <div className="flex items-center justify-center w-10 h-10 ml-1">
              <Image src="/icons/logout.png" alt="Logout" width={40} height={40} className="min-w-[40px]" />
            </div>
            <span className={cn("whitespace-nowrap", isExpanded ? "block -ml-1" : "hidden")}>Logout</span>
          </button>
          <div
             className={cn(
                "flex items-center gap-3",
                isExpanded ? "w-full pl-4" : "justify-center"
            )}
          >
            <Avatar className="h-8 w-8">

              <AvatarImage src="/images/foltPFP.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className={cn(isExpanded ? "block" : "hidden")}>
              <p className="text-sm font-medium truncate">Carol Folt</p>
              <p className="text-xs text-gray-500 truncate">Woman</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


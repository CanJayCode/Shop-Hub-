"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

export default function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          ShopHub
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-foreground/80 hover:text-foreground">
            Home
          </Link>
          <Link href="/products" className="text-foreground/80 hover:text-foreground">
            Products
          </Link>
          <Link href="/admin" className="text-foreground/80 hover:text-foreground">
            Admin
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

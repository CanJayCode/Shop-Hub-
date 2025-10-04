"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  product: {
    _id: string
    title: string
    price: number
    imageUrl: string
    stock: number
    category: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking button
    addItem({
      _id: product._id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock,
    })
  }

  return (
    <Link href={`/products/${product._id}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 p-4">
          <div className="w-full">
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h3 className="line-clamp-1 font-semibold">{product.title}</h3>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </div>
          <Button onClick={handleAddToCart} className="w-full" size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

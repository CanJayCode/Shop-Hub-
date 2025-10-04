import Link from "next/link"
import { Button } from "@/components/ui/button"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import ProductCard from "@/components/ProductCard"

async function getFeaturedProducts() {
  try {
    await connectDB()
    const products = await Product.find({}).limit(4).lean()
    return JSON.parse(JSON.stringify(products))
  } catch (error) {
    console.error("Failed to fetch products:", error)
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight">Welcome to ShopHub</h1>
          <p className="mb-8 text-pretty text-xl text-muted-foreground">
            Discover amazing products at unbeatable prices
          </p>
          <Link href="/products">
            <Button size="lg">Shop Now</Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-3xl font-bold">Featured Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

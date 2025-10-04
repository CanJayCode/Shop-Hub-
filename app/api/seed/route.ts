import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

const sampleProducts = [
  {
    title: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 99.99,
    stock: 50,
    imageUrl: "/wireless-headphones.png",
    category: "Electronics",
  },
  {
    title: "Smart Watch",
    description: "Feature-packed smartwatch with fitness tracking, heart rate monitor, and smartphone notifications.",
    price: 199.99,
    stock: 30,
    imageUrl: "/smartwatch-lifestyle.png",
    category: "Electronics",
  },
  {
    title: "Running Shoes",
    description: "Comfortable and durable running shoes with excellent cushioning and breathable material.",
    price: 79.99,
    stock: 100,
    imageUrl: "/running-shoes.jpg",
    category: "Sports",
  },
  {
    title: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe. Brew up to 12 cups of delicious coffee.",
    price: 49.99,
    stock: 45,
    imageUrl: "/modern-coffee-maker.png",
    category: "Home",
  },
  {
    title: "Backpack",
    description: "Spacious and durable backpack with laptop compartment. Perfect for travel and daily use.",
    price: 39.99,
    stock: 75,
    imageUrl: "/colorful-backpack-on-wooden-table.png",
    category: "Other",
  },
  {
    title: "Yoga Mat",
    description: "Non-slip yoga mat with extra cushioning. Includes carrying strap for easy transport.",
    price: 29.99,
    stock: 60,
    imageUrl: "/rolled-yoga-mat.png",
    category: "Sports",
  },
  {
    title: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness and color temperature. USB charging port included.",
    price: 34.99,
    stock: 40,
    imageUrl: "/modern-desk-lamp.png",
    category: "Home",
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    price: 59.99,
    stock: 55,
    imageUrl: "/bluetooth-speaker.jpg",
    category: "Electronics",
  },
]

export async function GET() {
  try {
    await connectDB()

    // Clear existing products
    await Product.deleteMany({})

    // Insert sample products
    const products = await Product.insertMany(sampleProducts)

    return NextResponse.json({
      success: true,
      message: `${products.length} products seeded successfully`,
      data: products,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

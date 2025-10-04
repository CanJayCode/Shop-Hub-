import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

// GET all products
export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let query = {}
    if (category && category !== "all") {
      query = { category }
    }

    const products = await Product.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: products })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST create new product (for admin)
export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const product = await Product.create(body)

    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

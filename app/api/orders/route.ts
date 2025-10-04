import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"

// GET all orders (for admin)
export async function GET() {
  try {
    await connectDB()

    const orders = await Order.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

// POST create new order (checkout)
export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const order = await Order.create(body)

    return NextResponse.json({ success: true, data: order }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

import mongoose, { Schema, type Document, type Model } from "mongoose"

interface IOrderItem {
  productId: string
  title: string
  price: number
  quantity: number
  imageUrl: string
}

export interface IOrder extends Document {
  items: IOrderItem[]
  total: number
  customerName: string
  customerEmail: string
  customerAddress: string
  customerPhone: string
  status: string
  createdAt: Date
}

const OrderSchema: Schema = new Schema({
  items: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      imageUrl: { type: String, required: true },
    },
  ],
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  customerName: {
    type: String,
    required: [true, "Please provide customer name"],
  },
  customerEmail: {
    type: String,
    required: [true, "Please provide customer email"],
  },
  customerAddress: {
    type: String,
    required: [true, "Please provide customer address"],
  },
  customerPhone: {
    type: String,
    required: [true, "Please provide customer phone"],
  },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)

export default Order

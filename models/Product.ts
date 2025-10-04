import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IProduct extends Document {
  title: string
  description: string
  price: number
  stock: number
  imageUrl: string
  category: string
  createdAt: Date
}

const ProductSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a product title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
    min: [0, "Price cannot be negative"],
  },
  stock: {
    type: Number,
    required: [true, "Please provide stock quantity"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  category: {
    type: String,
    required: [true, "Please provide a category"],
    enum: ["Electronics", "Clothing", "Books", "Home", "Sports", "Other"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)

export default Product

// product.model.ts
import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

// Define the Product schema
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    featured: {
      type: Boolean,
    },
    isDeleted: { type: Boolean, default: false },
    discount: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const Product = model<TProduct>("Product", productSchema);

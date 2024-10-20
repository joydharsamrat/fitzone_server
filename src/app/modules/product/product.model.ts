// product.model.ts
import { Schema, model } from "mongoose";

// Define the Product schema
const productSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export const Product = model("Product", productSchema);

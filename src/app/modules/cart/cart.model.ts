// product.model.ts
import { Schema, model } from "mongoose";
import { TCart } from "./cart.interface";

const cartSchema = new Schema<TCart>(
  {
    user: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
    product: {
      type: Schema.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Cart = model("Cart", cartSchema);

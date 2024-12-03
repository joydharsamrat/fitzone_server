import { model, Schema } from "mongoose";
import { TCustomerDetails, TOrder, TProductData } from "./order.interface";

// CustomerDetails schema
const CustomerDetailsSchema = new Schema<TCustomerDetails>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

// Product schema
const ProductSchema = new Schema<TProductData>({
  productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  image: { type: String, required: true },
});

const OrderDataSchema = new Schema<TOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    transactionId: { type: String, required: true },
    customerDetails: { type: CustomerDetailsSchema, required: true },
    products: { type: [ProductSchema], required: true },
    shippingCharge: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "canceled", "returned"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = model<TOrder>("Order", OrderDataSchema);

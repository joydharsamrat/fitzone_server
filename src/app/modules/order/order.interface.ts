import { Types } from "mongoose";

export type TCustomerDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type TProductData = {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
};

export type TOrder = {
  user: Types.ObjectId;
  transactionId: string;
  customerDetails: TCustomerDetails;
  products: TProductData[];
  shippingCharge: number;
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" | "canceled" | "returned";
};

import { z } from "zod";

const CustomerDetailsSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

const ProductSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(1, "Product name is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  subtotal: z.number().positive("Subtotal must be a positive number"),
  image: z.string().min(1, "Product image is required"),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    transactionId: z.string().min(1, "Transaction ID is required"),
    customerDetails: CustomerDetailsSchema,
    products: z.array(ProductSchema),
    shippingCharge: z.number(),
    totalPrice: z.number().positive("Total price must be a positive number"),
  }),
});

export const orderValidationSchemas = { createOrderValidationSchema };

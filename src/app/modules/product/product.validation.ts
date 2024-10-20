import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Product name is required" })
      .max(100, "Product name must be less than 100 characters"),
    price: z
      .number({ required_error: "Price is required" })
      .positive("Price must be a positive number"),
    quantity: z
      .number({ required_error: "Quantity is required" })
      .int("Quantity must be an integer")
      .nonnegative("Quantity cannot be negative"),
    description: z
      .string({ required_error: "Description is required" })
      .max(1000, "Description must be less than 1000 characters"),
    images: z.array(z.string().url("Each image must be a valid URL"), {
      required_error: "Images are required",
    }),
    category: z
      .string({ required_error: "Category is required" })
      .regex(/^[a-fA-F0-9]{24}$/, "Category must be a valid ObjectId"),
    featured: z
      .string({ required_error: "Category is required" })
      .regex(/^[a-fA-F0-9]{24}$/, "Category must be a valid ObjectId"),
  }),
});

export const productValidationSchemas = {
  createProductValidationSchema,
};

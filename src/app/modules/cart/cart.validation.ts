import { z } from "zod";

const createCartValidationSchema = z.object({
  body: z.object({
    product: z.string({ required_error: "Product is required" }),
    quantity: z.number({ required_error: "Quantity is required" }),
  }),
});

export const cartValidationSchemas = {
  createCartValidationSchema,
};

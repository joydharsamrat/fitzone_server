import { z } from "zod";

const createUserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" }),
  password: z.string({ required_error: "Password is required" }),
  phone: z.string({ required_error: "Phone is required" }),
  role: z.enum(["user", "admin"]).optional(),
});

const updateUserValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" })
    .optional(),
  password: z.string({ required_error: "Password is required" }).optional(),
  phone: z.string({ required_error: "Phone is required" }).optional(),
  role: z.enum(["user", "admin"]).optional().optional(),
  address: z.string({ required_error: "Address is required" }).optional(),
});
export const userValidationSchemas = {
  createUserValidationSchema,
  updateUserValidationSchema,
};

import { z } from "zod";

const userSignUpValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" }),
  password: z.string({ required_error: "Password is required" }),
  phone: z.string({ required_error: "Phone is required" }),
  role: z.enum(["user", "admin"]).optional(),
  address: z.string({ required_error: "Address is required" }),
});

const userLoginValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" }),
  password: z.string({ required_error: "Password is required" }),
});

const refreshTokenValidationSchema = z.object({
  refreshToken: z.string({
    required_error: "Refresh token is required!",
  }),
});
const changePasswordValidationSchema = z.object({
  oldPassword: z
    .string({
      required_error: "Refresh token is required!",
    })
    .min(6, "Password must be at least 6 characters"),
  newPassword: z
    .string({
      required_error: "Refresh token is required!",
    })
    .min(6, "Password must be at least 6 characters"),
});

const forgotPasswordValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email address must be valid !" }),
});

const resetPasswordValidationSchema = z.object({
  password: z.string({ required_error: "Password is required" }),
});
export const authValidationSchemas = {
  userSignUpValidationSchema,
  userLoginValidationSchema,
  refreshTokenValidationSchema,
  changePasswordValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
};

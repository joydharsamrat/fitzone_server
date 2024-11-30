import express from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidationSchemas } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/signup",

  validateRequest(authValidationSchemas.userSignUpValidationSchema),
  authControllers.handleUserSignUp
);

router.post(
  "/login",
  validateRequest(authValidationSchemas.userLoginValidationSchema),
  authControllers.handleUserLogin
);

router.post(
  "/access-token",

  validateRequest(authValidationSchemas.refreshTokenValidationSchema),
  authControllers.handleGetAccessToken
);

router.post(
  "/change-password",
  auth("admin", "user"),
  validateRequest(authValidationSchemas.changePasswordValidationSchema),
  authControllers.handleChangePassword
);

router.post(
  "/forgot-password",
  validateRequest(authValidationSchemas.forgotPasswordValidationSchema),
  authControllers.handleForgotPassword
);

router.post(
  "/reset-password",
  auth("admin", "user"),
  validateRequest(authValidationSchemas.resetPasswordValidationSchema),
  authControllers.handleResetPassword
);

export const authRoutes = router;

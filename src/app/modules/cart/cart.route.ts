import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { cartValidationSchemas } from "./cart.validation";
import { cartControllers } from "./cart.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-cart",
  auth("user"),
  validateRequest(cartValidationSchemas.createCartValidationSchema),
  cartControllers.handleCreateCartItem
);
router.get("/user", auth("user"), cartControllers.handleGetCartItemsByUser);
router.put(
  "/user/:id",

  auth("user"),
  cartControllers.handleUpdateCartItemsQuantity
);

router.delete("/user/:id", auth("user"), cartControllers.handleDeleteCartItem);

export const cartRoutes = router;

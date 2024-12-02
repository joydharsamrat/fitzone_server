import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidationSchemas } from "./order.validation";
import { orderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/create-order",

  auth("user"),
  validateRequest(orderValidationSchemas.createOrderValidationSchema),
  orderControllers.handleCreateOrder
);

export const orderRoutes = router;

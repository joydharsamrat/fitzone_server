import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { productValidationSchemas } from "./product.validation";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post(
  "/create-product",
  validateRequest(productValidationSchemas.createProductValidationSchema),
  productControllers.handleCreateProduct
);

router.get("/", productControllers.handleGetAllProducts);
router.get("/featured", productControllers.handleGetFeaturedProducts);
router.get("/:id", productControllers.handleGetProductById);

export const productRoutes = router;

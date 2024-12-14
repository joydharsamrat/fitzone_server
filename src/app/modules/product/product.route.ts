import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { productValidationSchemas } from "./product.validation";
import { productControllers } from "./product.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-product",
  auth("admin"),
  validateRequest(productValidationSchemas.createProductValidationSchema),
  productControllers.handleCreateProduct
);

router.get("/", productControllers.handleGetAllProducts);
router.get("/featured", productControllers.handleGetFeaturedProducts);
router.get(
  "/low-stock",
  auth("admin"),
  productControllers.handleGetLowStockProducts
);
router.get("/:id", productControllers.handleGetProductById);
router.put("/:id", productControllers.handleUpdateProduct);

router.post("/stock", productControllers.handleGetProductStock);
router.delete("/:id", productControllers.handleDeleteProduct);

export const productRoutes = router;

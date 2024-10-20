import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidationSchemas } from "./category.validation";
import { categoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "/create-category",
  validateRequest(categoryValidationSchemas.categoryValidationSchema),
  categoryControllers.handleCreateCategory
);

router.get("/", categoryControllers.handleGetAllCategories);

export const categoryRoutes = router;

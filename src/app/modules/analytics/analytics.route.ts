import express from "express";
import { analyticsControllers } from "./analytics.controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/stats", auth("admin"), analyticsControllers.handleGetStats);
router.get(
  "/revenue",
  auth("admin"),
  analyticsControllers.handleGetRevenueData
);
router.get(
  "/order-status",
  // auth("admin"),
  analyticsControllers.handleGetOrderStatusStats
);

export const analyticsRoutes = router;

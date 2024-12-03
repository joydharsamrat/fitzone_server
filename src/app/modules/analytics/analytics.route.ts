import express from "express";
import { analyticsControllers } from "./analytics.controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/stats", auth("admin"), analyticsControllers.handleGetStats);

export const analyticsRoutes = router;

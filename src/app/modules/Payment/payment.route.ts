import express from "express";
import { paymentControllers } from "./payment.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth("user"), paymentControllers.handleInitiatePayment);

export const paymentRoutes = router;

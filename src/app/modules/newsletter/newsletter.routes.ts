import express from "express";
import { newsletterControllers } from "./newsletter.controllers";

const router = express.Router();

router.post("/subscribe", newsletterControllers.handleNewsletterSubscription);

export const newsletterRoutes = router;

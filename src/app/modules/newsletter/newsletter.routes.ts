import express from "express";
import { newsletterControllers } from "./newsletter.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { newsletterValidationSchemas } from "./newsletter.validation";

const router = express.Router();

router.post(
  "/subscribe",
  validateRequest(newsletterValidationSchemas.NewsletterValidationSchema),
  newsletterControllers.handleNewsletterSubscription
);

export const newsletterRoutes = router;

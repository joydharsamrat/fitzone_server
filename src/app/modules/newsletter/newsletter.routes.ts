import express from "express";
import { newsletterControllers } from "./newsletter.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { newsletterValidationSchemas } from "./newsletter.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/subscribe",
  validateRequest(newsletterValidationSchemas.NewsletterValidationSchema),
  newsletterControllers.handleNewsletterSubscription
);
router.get(
  "/subscribers",
  auth("admin"),
  newsletterControllers.handleGetSubscribers
);

export const newsletterRoutes = router;

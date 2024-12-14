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

router.put("/unsubscribe", newsletterControllers.handleUnsubscribe);
router.put(
  "/cancel-subscription",
  auth("admin"),
  newsletterControllers.handleCancelSubscriptionByAdmin
);

export const newsletterRoutes = router;

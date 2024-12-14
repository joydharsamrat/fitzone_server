import express from "express";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { imageRoutes } from "../modules/imageGallery/images.route";
import { testimonialRoutes } from "../modules/testimonials/testimonials.route";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { cartRoutes } from "../modules/cart/cart.route";
import { paymentRoutes } from "../modules/Payment/payment.route";
import { orderRoutes } from "../modules/order/order.route";
import { analyticsRoutes } from "../modules/analytics/analytics.route";
import { newsletterRoutes } from "../modules/newsletter/newsletter.routes";

const router = express.Router();

const moduleRoutes = [
  { path: "/categories", route: categoryRoutes },
  { path: "/products", route: productRoutes },
  { path: "/images", route: imageRoutes },
  { path: "/testimonials", route: testimonialRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/users", route: userRoutes },
  { path: "/cart", route: cartRoutes },
  { path: "/payment", route: paymentRoutes },
  { path: "/orders", route: orderRoutes },
  { path: "/analytics", route: analyticsRoutes },
  { path: "/newsletter", route: newsletterRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

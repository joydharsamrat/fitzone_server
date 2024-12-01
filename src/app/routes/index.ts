import express from "express";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { imageRoutes } from "../modules/imageGallery/images.route";
import { testimonialRoutes } from "../modules/testimonials/testimonials.route";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { cartRoutes } from "../modules/cart/cart.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/categories", route: categoryRoutes },
  { path: "/products", route: productRoutes },
  { path: "/images", route: imageRoutes },
  { path: "/testimonials", route: testimonialRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/user", route: userRoutes },
  { path: "/cart", route: cartRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

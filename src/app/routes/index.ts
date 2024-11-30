import express from "express";
import { categoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { imageRoutes } from "../modules/imageGallery/images.route";
import { testimonialRoutes } from "../modules/testimonials/testimonials.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/categories", route: categoryRoutes },
  { path: "/products", route: productRoutes },
  { path: "/images", route: imageRoutes },
  { path: "/testimonials", route: testimonialRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

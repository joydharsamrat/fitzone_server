import express from "express";
import { testimonialControllers } from "./testimonials.controllers";

const router = express.Router();

router.get("/", testimonialControllers.handleGetAllTestimonials);

export const testimonialRoutes = router;

import express from "express";
import { imageControllers } from "./images.controllers";

const router = express.Router();

router.get("/", imageControllers.handleGetAllImages);

export const imageRoutes = router;

import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth("admin"), userControllers.handleGetUsers);
router.get("/user", auth("user"), userControllers.handleGetUserById);

router.put("/make-admin", auth("admin"), userControllers.handleMakeAdmin);

router.put("/", auth("user"), userControllers.handleUpdateUser);

export const userRoutes = router;

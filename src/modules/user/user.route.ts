
import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post("/register", userController.createUserC)

export const userRoutes = router;
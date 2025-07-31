
import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post("/register", userController.createUserC)
router.get("/all_users", userController.getAllUsersC)

export const userRoutes = router;
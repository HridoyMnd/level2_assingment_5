
import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema, UpdateUserZodSchema } from "./user.validation";

const router = Router();
router.post("/register", validateRequest(createUserZodSchema), userController.createUserC)
router.get("/all_users", userController.getAllUsersC)
router.patch("/:id", validateRequest(UpdateUserZodSchema), userController.updateUserC)

export const userRoutes = router;
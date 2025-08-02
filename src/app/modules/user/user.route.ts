import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema, UpdateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";
const router = Router();


router.post("/register", validateRequest(createUserZodSchema), userController.createUserC)
router.get("/all_users", checkAuth(UserRole.ADMIN), userController.getAllUsersC)
router.patch("/:id", checkAuth(...Object.values(UserRole)), validateRequest(UpdateUserZodSchema), userController.updateUserC)

export const userRoutes = router;
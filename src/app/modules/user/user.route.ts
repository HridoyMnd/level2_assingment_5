
import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();



router.post("/register", validateRequest(createUserZodSchema), userController.createUserC)
router.get("/all_users", checkAuth(), userController.getAllUsersC)
// router.patch("/:id", validateRequest(UpdateUserZodSchema), userController.updateUserC)

export const userRoutes = router;
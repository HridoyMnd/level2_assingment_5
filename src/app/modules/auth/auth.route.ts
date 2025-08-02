import { Router } from "express";
import { authController } from "./auth.controller";
const router = Router();


// auth route apis endpoint
router.post("/login", authController.credentialLoginC);
router.post("/refresh-token", authController.getAccessTokenC); 


// route named export
export const authRoutes = router;
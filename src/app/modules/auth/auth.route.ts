import { Router } from "express";
import { authController } from "./auth.controller";


const router = Router()

// auth route apis endpoint
router.post("/login", authController.credentialLoginC)


// route named export
export const authRoutes = router;
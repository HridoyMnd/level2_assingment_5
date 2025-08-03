import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import passport from "passport";
const router = Router();

 
// auth route apis endpoint
router.post("/login", authController.credentialLoginC);
router.post("/refresh-token", authController.getAccessTokenC); 
router.post("/logout", authController.logoutUserC);  
router.post("/reset_password", checkAuth(...Object.values(UserRole)), authController.resetPasswordC);   
router.get("/google", async(req:Request, res:Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", {scope: ["profile", "email"], state: redirect as string})(req, res, next);
});
router.get("/google/callback", passport.authenticate("google", {failureRedirect:'/login'}), authController.googleCallBackC);



// route named export
export const authRoutes = router;

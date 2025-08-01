import { NextFunction, Request, Response } from "express";
import { AppError } from "../ErrorHelper/AppError";
import { jwtController } from "../utils/jwt";
import { envVars } from "../config";
import { UserRole } from "../modules/user/user.interface";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = () => (req: Request, res: Response, next: NextFunction) => {
try {
    const access_token =  req.headers.authorization;
    if(!access_token){
        throw new AppError(400, "token not fcound")
    }
    const verify_token = jwtController.verifyToken(access_token, envVars.JWT_ACCESS_SECRET)
    if((verify_token as JwtPayload).role !== UserRole.ADMIN){
        throw new AppError(400, "you are not authorized")
    }

    console.log(verify_token);

    next()
} catch (error) {
    next(error)
}
}

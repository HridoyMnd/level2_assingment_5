import { NextFunction, Request, Response } from "express";
import { AppError } from "../ErrorHelper/AppError";
import { jwtController } from "../utils/jwt";
import { envVars } from "../config";
import { IsActive } from "../modules/user/user.interface";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
import { User } from "../modules/user/user.model";

// checkauth higher order function
export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.headers.authorization;
      if (!access_token) {
        throw new AppError(httpStatus.NOT_FOUND, "token not found");
      }
      const verify_token = jwtController.verifyToken(
        access_token,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: verify_token.email });
      if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
      }
      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is Blocked");
      }
      if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
      }
      if (!authRoles.includes(verify_token.role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          "You have not Permit to access this route"
        );
      }

      req.user_r = verify_token;
      next();
    } catch (error) {
      next(error);
    }
  };

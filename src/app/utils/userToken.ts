import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config";
import { IsActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { jwtController } from "./jwt";
import { AppError } from "../ErrorHelper/AppError";
import httpStatus from "http-status-codes";

// create user tokens
export const createUserToken = (user: Partial<IUser>) => {
  // jwt payload
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtController.generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRESIN
  );
  const refreshToken = jwtController.generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRESIN
  );

  return {
    accessToken,
    refreshToken,
  };
};

// new accesToken with refresh token
export const createAccTokenWithRfsToken = async (refreshToken: string) => {
  const verifyRefreshToken = jwtController.verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;
  const isUserExist = await User.findOne({ email: verifyRefreshToken.email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not exist");
  }
  if (
    isUserExist.isActive === IsActive.BLOCKED ||
    isUserExist.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is blocked");
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is Deleted");
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accestoken = jwtController.generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRESIN
  );
  return accestoken;
};

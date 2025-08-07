import { AppError } from "../../ErrorHelper/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { createAccTokenWithRfsToken } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config";


//get access token 
const getNewAccessTokenS = async (refreshToken:string) => {
const accessToken = await createAccTokenWithRfsToken(refreshToken);

  return {
    accessToken: accessToken
  };
};

//get access token 
const resetPasswordS = async (newPassword:string, oldPassword:string, decodedToken:JwtPayload ) => {
  const user = await User.findById(decodedToken.userId);
  if(!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const isOldPasswordMathced = await bcryptjs.compare(oldPassword, user.password as string);
  if(!isOldPasswordMathced){
    throw new AppError(httpStatus.BAD_REQUEST, "Old password not mathced");
  }

  user.password = await bcryptjs.hash(newPassword, envVars.BCRYPT_SALT_ROUND);
  user.save();

};

// auth service controller 
export const authServiceController = {
    getNewAccessTokenS,
    resetPasswordS
};
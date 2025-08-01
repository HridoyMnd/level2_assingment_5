import { AppError } from "../../ErrorHelper/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { IUser } from "../user/user.interface";
import jwt from 'jsonwebtoken';
import { jwtController } from "../../utils/jwt";
import { envVars } from "../../config";


// credentials login
const credentialLoginS = async (payload: Partial<IUser>) => { 
  const { email, password } = payload;
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Does not exist");
  }
  const isPasswordMatched =await bcryptjs.compare(password as string, isUserExist.password as string);
  if(!isPasswordMatched){
    throw new AppError(httpStatus.BAD_REQUEST, "password does not matched");
  }

  // jwt payload
  const jwtPayload= {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role
  }

 const accessToken = jwtController.generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRESIN)

  
return {
    email: isUserExist.email,
     acess:accessToken
};
}; 

// auth service controller 
export const authServiceController = {
    credentialLoginS
};
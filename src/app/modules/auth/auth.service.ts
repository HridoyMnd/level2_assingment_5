import { AppError } from "../../ErrorHelper/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { IUser } from "../user/user.interface";


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


return {
    email: isUserExist.email
};
};

// auth service controller 
export const authServiceController = {
    credentialLoginS
};
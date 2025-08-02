import { AppError } from "../../ErrorHelper/AppError";
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { IUser } from "../user/user.interface"; 
import { createAccTokenWithRfsToken, createUserToken } from "../../utils/userToken";



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

const userToken =  createUserToken(isUserExist);  
const {password: pass, ...rest} = isUserExist.toObject();

return {
  accessToken: userToken.accessToken ,
  refreshToken: userToken.refreshToken,
  user: rest,
};
}; 


//get access token 
const getNewAccessTokenS = async (refreshToken:string) => {
const accessToken = await createAccTokenWithRfsToken(refreshToken)

  return {
    accessToken: accessToken
  };
};


// auth service controller 
export const authServiceController = {
    credentialLoginS,
    getNewAccessTokenS
};
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config";
import { AppError } from "../../ErrorHelper/AppError";
import { IAuthProvider, IUser, UserRole } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from 'bcryptjs';
import httpStatus from "http-status-codes";


// create user
const createUserS = async (payload: Partial<IUser>) => {
  const { email, password, ...rest} = payload;
  const isUserExist = await User.findOne({email})
  if (isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User already Exist here");
  }

  const hassPassword = await bcryptjs.hash(password as string, envVars.BCRYPT_SALT_ROUND);
  const authProviders:IAuthProvider = {provider: "credentials", providerId:email as string};

  const user = await User.create({
    email, 
     password: hassPassword,
    ...rest,
    auths: [authProviders]
  });
  return user;
};


// get all users
const getAllUsersS = async () => {
  const users = await User.find({});

  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};


// update user api
const updateUserS = async(userId: string, payload:Partial<IUser>, decodedTokenn:JwtPayload) => {

const isUserExist = await User.findById (userId);
if(!isUserExist) {
  throw new AppError(httpStatus.NOT_FOUND, "User not Found");
}

  if(payload.role) {
    if(decodedTokenn.role ===UserRole.USER || decodedTokenn.role === UserRole.AGENT) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not Authorized"); 
    }
  }
  if(payload.isActive || payload.isDeleted || payload.isVerified) {
    if(decodedTokenn.role === UserRole.USER || decodedTokenn.role === UserRole.AGENT){
      throw new AppError(httpStatus.FORBIDDEN, "You are not Authorized");
    }
  }
  if(payload.password) {
    payload.password = await bcryptjs.hash(payload.password, envVars.BCRYPT_SALT_ROUND);
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {new:true, runValidators:true});
  return newUpdatedUser;
};



// user service controller
export const ServiceController = {
  createUserS,
  getAllUsersS,
  updateUserS,
};

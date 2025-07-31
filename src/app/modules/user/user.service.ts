import { AppError } from "../../ErrorHelper/AppError";
import { IUser } from "./user.interface"
import { User } from "./user.model";
import httpStatus from "http-status-codes";

// create user
const createUserS = async (payload: Partial<IUser> ) => {
    const data= payload; 
    const user = await User.create(data);
    return user
}


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
const updateUserS = async(userId: string, payload:Partial<IUser>) => {
const isUserExist = await User.findById (userId);
if(!isUserExist) {
  throw new AppError(httpStatus.NOT_FOUND, "User not Found");
}

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {new:true, runValidators:true});
  return newUpdatedUser;
};




// user service controller
export const ServiceController = { 
    createUserS,
    getAllUsersS,
    updateUserS
}
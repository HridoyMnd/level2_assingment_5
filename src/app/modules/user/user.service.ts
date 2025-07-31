import { IUser } from "./user.interface"
import { User } from "./user.model";

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


// user service controller
export const ServiceController = { 
    createUserS,
    getAllUsersS
}
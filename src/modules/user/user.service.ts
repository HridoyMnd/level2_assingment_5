import { IUser } from "./user.interface"
import { User } from "./user.model";

// create user
const createUserS = async (payload: Partial<IUser> ) => {
    const data= payload; 
    const user = await User.create(data);
    return user
}

// user service controller
export const ServiceController = { 
    createUserS
}


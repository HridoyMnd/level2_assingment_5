import { envVars } from "../config";
import { IAuthProvider, UserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from 'bcryptjs';


// seed admin with default
export const seedAdmin = async () => {
    try {
        const isAdminExist = await User.findOne({email: envVars.ADMIN_EMAIL});
        if(isAdminExist){
            return; 
        }

        const authProvider: IAuthProvider = {provider: "credentials", providerId: envVars.ADMIN_EMAIL};
        const hashPassword = await bcryptjs.hash(envVars.ADMIN_PASSWORD, envVars.BCRYPT_SALT_ROUND);

        const payload = {
            name: "Admin",
            role: UserRole.ADMIN,
            email: envVars.ADMIN_EMAIL,
            isVerified:true,
            auths:[authProvider],
            password: hashPassword
        };

        await User.create(payload);

    } catch (error) {
        
    }
};
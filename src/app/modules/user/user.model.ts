
import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, IUser, UserRole } from "./user.interface";


// auth provider schema
const authProviderSchema = new Schema<IAuthProvider>({
    provider: {type:String, required:true},
    providerId: {type:String, required:true}
}, {
    versionKey: false,
    _id: false
});


// user model
const userSchema = new Schema<IUser>({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String},
    phone: {type: String},
    picture: {type: String},
    address: {type:String},
    isDeleted: {type:Boolean, default: false},
    isVerified: {type:Boolean, default: false},
    isActive:{type: String, enum: Object.values(IsActive), default: IsActive.ACTIVE},
    role: {type:String, enum: Object.values(UserRole), default: UserRole.USER},
    wallet: {type:Schema.Types.ObjectId, ref: "Wallet"},
    auths: [authProviderSchema],
}, {
    versionKey:false,
    timestamps: true
});


export const User = model<IUser>("User", userSchema);
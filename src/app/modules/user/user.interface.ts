
import { Types } from "mongoose";

// IAuthProvider interface
export interface IAuthProvider {
    provider: "google" | "credentials",
    providerId: string
}

// user status
export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED"
}

// user role
export enum UserRole {
  USER = "USER",
  AGENT = "AGENT",
  ADMIN = "ADMIN"
}


export interface IUser {
  _id?:Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?:string,
  address?: string;
  isDeleted?:boolean;
  isVerified?:boolean;
  isActive?:IsActive;
  role?: UserRole;
  auths: IAuthProvider[];
  wallet?:Types.ObjectId;

}

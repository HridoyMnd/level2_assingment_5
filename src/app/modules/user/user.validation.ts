import { z } from "zod";
import { IsActive, UserRole } from "./user.interface";

 export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short, Minimum 2 charactar need"})
    .max(50, { message: "Name too long, Maximum 50 caractar" }),
  email: z.string({invalid_type_error: "Email must be string"}).email("Incorrect Email address"),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least 1 lowercase",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special charactar",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1  number",
    }).optional(),
  phone: z
    .string({ invalid_type_error: "Phone Number must be string" })
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number",
    })
    .optional(),
    pictue: z.string().optional(),
  address: z
    .string({ invalid_type_error: "Address must be string" })
    .min(200, { message: "Address cannot exceed 200 character" })
    .optional(),
});


// userZodUpdateSchema
export const UpdateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short, Minimum 2 charactar long" })
    .max(50, { message: "Name too long, Maximum 50 caractar" }).optional(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])/, {
      message: "Password must contain at least 1 lowercase",
    })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special charactar",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1  number",
    }),
  phone: z
    .string({ invalid_type_error: "Phone Number must be string" })
    .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number",
    })
    .optional(),
    pictue: z.string().optional(),
    role: z.enum(Object.values(UserRole) as [string]).optional(),
    isActive:z.enum(Object.values(IsActive) as [string]).optional(),
    isDeleted: z.boolean({invalid_type_error:"IsDeleted must be true or false"}).optional(),
     isVarified: z.boolean({invalid_type_error:"IsVarified must be true of false"}).optional(),
  address: z
    .string({ invalid_type_error: "Address must be string" })
    .min(200, { message: "Address cannot exceed 200 character" })
    .optional(),
});
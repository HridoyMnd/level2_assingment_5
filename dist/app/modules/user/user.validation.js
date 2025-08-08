"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
// userCreate zodschema
exports.createUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name too short, Minimum 2 charactar need" })
        .max(50, { message: "Name too long, Maximum 50 caractar" }),
    email: zod_1.z.string({ invalid_type_error: "Email must be string" }).email("Incorrect Email address"),
    password: zod_1.z
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
    phone: zod_1.z
        .string({ invalid_type_error: "Phone Number must be string" })
        .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
        message: "Invalid Bangladeshi phone number",
    })
        .optional(),
    pictue: zod_1.z.string().optional(),
    address: zod_1.z
        .string({ invalid_type_error: "Address must be string" })
        .min(200, { message: "Address cannot exceed 200 character" })
        .optional(),
});
// userZodUpdateSchema
exports.UpdateUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ invalid_type_error: "Name must be string" })
        .min(2, { message: "Name too short, Minimum 2 charactar long" })
        .max(50, { message: "Name too long, Maximum 50 caractar" }).optional(),
    password: zod_1.z
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
    phone: zod_1.z
        .string({ invalid_type_error: "Phone Number must be string" })
        .regex(/^(?:\+8801|8801|01)[3-9]\d{8}$/, {
        message: "Invalid Bangladeshi phone number",
    })
        .optional(),
    pictue: zod_1.z.string().optional(),
    role: zod_1.z.enum(Object.values(user_interface_1.UserRole)).optional(),
    isActive: zod_1.z.enum(Object.values(user_interface_1.IsActive)).optional(),
    isDeleted: zod_1.z.boolean({ invalid_type_error: "IsDeleted must be true or false" }).optional(),
    isVarified: zod_1.z.boolean({ invalid_type_error: "IsVarified must be true of false" }).optional(),
    address: zod_1.z
        .string({ invalid_type_error: "Address must be string" })
        .min(200, { message: "Address cannot exceed 200 character" })
        .optional(),
});

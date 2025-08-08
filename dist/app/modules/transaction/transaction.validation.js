"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTransactionZodSchema = exports.createTransactionZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
// Mongoose ObjectId validation 
const objectIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});
// Transaction create Zod Schema
exports.createTransactionZodSchema = zod_1.z.object({
    transaction_type: zod_1.z.enum(Object.values(transaction_interface_1.TType)),
    amount: zod_1.z.number().positive(),
    currency: zod_1.z.string().min(1).optional(),
    status: zod_1.z.enum(Object.values(transaction_interface_1.TStatus)).optional(),
    paymentMethod: zod_1.z.string().optional(),
    fromWallet: objectIdSchema,
    toWallet: objectIdSchema,
    initiatedBy: objectIdSchema,
    approvedBy: objectIdSchema.optional(),
    userId: zod_1.z.string().min(1),
    transaction_fee: zod_1.z.number().nonnegative().optional(),
    balanceBefore: zod_1.z.number().optional(),
    balanceAfter: zod_1.z.number().optional(),
    deviceInfo: zod_1.z.string().optional(),
});
// Transaction update Zod Schema
exports.updateTransactionZodSchema = zod_1.z.object({
    status: zod_1.z.enum(Object.values(transaction_interface_1.TStatus)).optional(),
    paymentMethod: zod_1.z.string().optional(),
    approvedBy: objectIdSchema.optional(),
});

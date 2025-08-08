"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletZodSchema = exports.transactionLimitZodSchema = exports.linkedBankAccountZodSchema = void 0;
const zod_1 = require("zod");
const wallet_interface_1 = require("./wallet.interface");
// linkedBankAccount validation
exports.linkedBankAccountZodSchema = zod_1.z.object({
    bankName: zod_1.z.string().min(1, "Bank name is required"),
    accountNumber: zod_1.z.number().int().positive("Account number must be a positive integer"),
});
// transactionLimit validation
exports.transactionLimitZodSchema = zod_1.z.object({
    dailyAmount: zod_1.z.number().nonnegative("Daily amount cannot be negative"),
    monthlyAmount: zod_1.z.number().nonnegative("Monthly amount cannot be negative"),
});
// wallet validation
exports.updateWalletZodSchema = zod_1.z.object({
    IsActive: zod_1.z.enum(Object.values(wallet_interface_1.WalletStatus)).optional(),
    IsVerified: zod_1.z.boolean().optional(),
    transactionLimit: exports.transactionLimitZodSchema.optional(),
    linkedBankAccount: exports.linkedBankAccountZodSchema.optional(),
    securityPin: zod_1.z
        .string()
        .min(8)
        .regex(/^(?=.*[a-z])/, {
        message: "securityPin must contain at least 1 lowercase",
    })
        .regex(/^(?=.*[A-Z])/, {
        message: "securityPin must contain at least 1 uppercase",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "securityPin must contain at least 1 special charactar",
    })
        .regex(/^(?=.*\d)/, {
        message: "securityPin must contain at least 1  number",
    }).optional(),
    isPrimary: zod_1.z.boolean().optional(),
});

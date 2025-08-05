import { z } from "zod";
import { WalletStatus } from "./wallet.interface";

// linkedBankAccount validation
export const linkedBankAccountZodSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.number().int().positive("Account number must be a positive integer"),
});

// transactionLimit validation
export const transactionLimitZodSchema = z.object({
  dailyAmount: z.number().nonnegative("Daily amount cannot be negative"),
  monthlyAmount: z.number().nonnegative("Monthly amount cannot be negative"),
});


// wallet validation
export const updateWalletZodSchema = z.object({
  IsActive: z.enum(Object.values(WalletStatus) as [string]).optional(),
  IsVerified: z.boolean().optional(),
  transactionLimit: transactionLimitZodSchema.optional(),
  linkedBankAccount: linkedBankAccountZodSchema.optional(),
  securityPin:  z
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
  isPrimary: z.boolean().optional(),
});

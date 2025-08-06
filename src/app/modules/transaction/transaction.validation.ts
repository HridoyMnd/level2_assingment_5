import { z } from "zod";
import { Types } from "mongoose";

// Enum validations
export const TTypeEnum = z.enum([
  "CASH_IN",
  "CASH_OUT",
  "SEND_MONEY",
  "ADD_MONEY",
  "WITHDRAW_MONEY",
]);

export const TStatusEnum = z.enum(["PENDING", "SUCCESS", "FAILED"]);

// Mongoose ObjectId validation using regex or custom refinement
const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

// Transaction Zod Schema
export const createTransactionZodSchema = z.object({
  transaction_type: TTypeEnum,
  amount: z.number().positive(),
  currency: z.string().min(1).optional(),
  status: TStatusEnum.optional(),
  paymentMethod: z.string().optional(),
  fromWallet: objectIdSchema.optional(),
  toWallet: objectIdSchema.optional(),
  initiatedBy: objectIdSchema,
  approvedBy: objectIdSchema.optional(),
  userId: z.string().min(1),
  transaction_fee: z.number().nonnegative().optional(),
  balanceBefore: z.number().optional(),
  balanceAfter: z.number().optional(),
  deviceInfo: z.string().optional(),
});
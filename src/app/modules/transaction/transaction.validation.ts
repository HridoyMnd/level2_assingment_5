import { z } from "zod";
import { Types } from "mongoose";
import { TStatus, TType } from "./transaction.interface";

// Mongoose ObjectId validation using regex or custom refinement
const objectIdSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });
  
   
  // Transaction create Zod Schema
  export const createTransactionZodSchema = z.object({
    transaction_type: z.enum(Object.values(TType) as [string]),
    amount: z.number().positive(),
  currency: z.string().min(1).optional(),
  status: z.enum(Object.values(TStatus) as [string]).optional(),
  paymentMethod: z.string().optional(),
  fromWallet: objectIdSchema,
  toWallet: objectIdSchema,
  initiatedBy: objectIdSchema,
  approvedBy: objectIdSchema.optional(),
  userId: z.string().min(1),
  transaction_fee: z.number().nonnegative().optional(),
  balanceBefore: z.number().optional(),
  balanceAfter: z.number().optional(),
  deviceInfo: z.string().optional(),
});


// Transaction update Zod Schema
  export const updateTransactionZodSchema = z.object({
    status: z.enum(Object.values(TStatus) as [string]).optional(),
    paymentMethod: z.string().optional(),
    approvedBy: objectIdSchema.optional(),
  });
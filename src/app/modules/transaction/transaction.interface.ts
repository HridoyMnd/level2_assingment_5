import { Types } from "mongoose";

// transaction type 
export enum TType {
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT",
    SEND_MONEY = "SEND_MONEY",
    ADD_MONEY = "ADD_MONEY",
    WITHDRAW_MONEY = "WITHDRAW_MONEY"
}

// transaction status
export enum TStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}

//transaction interfce
export interface ITransaction {
  transaction_type: TType;
  amount: number;
  currency?: string;
  status?: TStatus;
  paymentMethod?: string;
  fromWallet?: Types.ObjectId; 
  toWallet?: Types.ObjectId;
  initiatedBy: Types.ObjectId; 
  approvedBy?: Types.ObjectId;
  userId: string;
  transaction_fee?: number;
  balanceBefore?: number;
  balanceAfter?: number;
  deviceInfo?: string;
}
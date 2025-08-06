import { Types } from "mongoose";

// wallet status enum
export enum WalletStatus {
  ACTIVE = "ACTIVE",
  SUSPENND = "SUSPENND",
  CLOSED = "CLOSED",
}

// linkedBankAccout interface
export interface IlinkedBankAccount {
  bankName: string;
  accountNumber: number;
}

//transaction limit interface
export interface ItransactionLimit {
  dailyAmount: number;
  monthlyAmount: number;
}

// wallet interfce
export interface IWallet {
  userId: Types.ObjectId;
  balance: number;
  currency: string,
  IsActive: WalletStatus;
  IsVerified?: boolean;
  transactionLimit?: ItransactionLimit;
  linkedBankAccount?: IlinkedBankAccount;
  securityPin?: string;
  isPrimary?: boolean;
}

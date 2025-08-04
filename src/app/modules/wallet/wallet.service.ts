import { Types } from "mongoose";

export interface IWallet {
  user: Types.ObjectId; // Linked User ID
  balance: number; // Current balance (in smallest unit)
  currency: 'BDT' | 'USD';
  status: 'active' | 'suspended';
  walletId?: string; // Optional unique identifier like 'WAL-2025001'
  kycVerified?: boolean;
  lastTransactionDate?: Date;
  transactionLimit?: {
    daily?: number;
    monthly?: number;
  };
  linkedPhoneNumber?: string;
  linkedNID?: string;
  linkedBankAccount?: {
    bankName: string;
    accountNumber: string;
  };
  securityPin?: string; // hashed pin
  isFrozen?: boolean;
  isPrimary?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
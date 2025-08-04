
import { model, Schema } from "mongoose";
import {
  IlinkedBankAccount,
  ItransactionLimit,
  IWallet,
  WalletStatus,
} from "./wallet.interface";


// transactionLimitSchema 
const transactionLimitSchema = new Schema<ItransactionLimit>(
  {
    dailyAmount: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
  }
);


// linkedBankAccountSchema
const linkedBankAccountSchema = new Schema<IlinkedBankAccount>(
  {
    bankName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
  }
);


// wallletSchema 
const walletSchema = new Schema<IWallet>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: { type: Number, required: true, default: 0 },
    IsVerified: { type: Boolean, default: false },
    currency: { type: String, required: true, default: "BDT" },
    securityPin: { type: String, required: false },
    isPrimary: { type: Boolean, default: false },
    transactionLimit: { type: transactionLimitSchema, required: false },
    linkedBankAccount: { type: linkedBankAccountSchema, required: false },
    IsActive: {
      type: String,
      enum: Object.values(WalletStatus),
      required: true,
      default: WalletStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


// wallet model
export const Wallet = model<IWallet>("Wallet", walletSchema)
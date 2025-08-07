/* eslint-disable no-console */
import { Types } from "mongoose";
import { Wallet } from "../modules/wallet/wallet.model";
import { IWallet, WalletStatus } from "../modules/wallet/wallet.interface";
import { AppError } from "../ErrorHelper/AppError";
import httpStauts from "http-status-codes";

// seed admin with default
export const createWallet = async (user_id: Types.ObjectId) => {
  try {
    const isWalletExist = await Wallet.findById(user_id);
    if (isWalletExist) {
      throw new AppError(httpStauts.BAD_REQUEST, "Wallet Already Exist");
    }

    const payload: IWallet = {
      userId: user_id,
      balance: 50,
      currency: "BDT",
      IsActive: WalletStatus.ACTIVE,
      IsVerified: false,
      transactionLimit: {
        dailyAmount: 10000,
        monthlyAmount: 300000,
      },
      linkedBankAccount: {
        bankName: "Dutch Bangla Bank",
        accountNumber: 1234567890,
      },
      securityPin: "",
      isPrimary: true,
    };

    await Wallet.create(payload);
  } catch (error) {
    console.log(error);
  }
};

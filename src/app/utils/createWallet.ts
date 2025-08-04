import { Types } from "mongoose";
import { Wallet } from "../modules/wallet/wallet.model";
import { WalletStatus } from "../modules/wallet/wallet.interface";


// seed admin with default
export const createWallet = async (user_id: Types.ObjectId) => {
try {
      const isWalletExist = await Wallet.findById(user_id);
  if (isWalletExist) {
    console.log(user_id, " ai id ache");
    return
  }

  const payload = {
    userId: user_id, 
    balance: 50,
    currency: "BDT",
    IsActive: WalletStatus.ACTIVE,
    IsVerified: true,
    transactionLimit: {
      dailyAmount: 10000,
      monthlyAmount: 300000,
    },
    linkedBankAccount: {
      bankName: "Dutch Bangla Bank",
      accountNumber: 1234567890,
    },
    securityPin: "1234",
    isPrimary: true,
  };

  await Wallet.create(payload);
} catch (error) {
    console.log(error);
}
};

import { Wallet } from "./wallet.model";

// get all users
const getAllWalletS = async () => {
  const users = await Wallet.find({});

  const totalUsers = await Wallet.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};


// user service controller
export const WalletServiceController = {
 getAllWalletS,

};

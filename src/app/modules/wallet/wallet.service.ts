import { JwtPayload } from "jsonwebtoken";
import { IWallet } from "./wallet.interface";
import { Wallet } from "./wallet.model";
import { AppError } from "../../ErrorHelper/AppError";
import httpStatus from "http-status-codes";
import { UserRole } from "../user/user.interface";
import bcryptjs from "bcryptjs";
import { envVars } from "../../config";
import { Types } from "mongoose";

// get all wallet
const getAllWalletS = async () => {
  const wallets = await Wallet.find({});

  const totalWallet = await Wallet.countDocuments();
  return {
    data: wallets,
    meta: {
      total: totalWallet,
    },
  };
};

// get my wallet
const getMyWalletS = async (userId: Types.ObjectId) => {
  const wallet = await Wallet.findOne({ userId: userId });
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }

  const totalWallet = await Wallet.countDocuments();
  return {
    data: wallet,
    meta: {
      total: totalWallet,
    },
  };
};

// update user api
const updateWalletS = async (walletId: string, payload: Partial<IWallet>, decodedTokenn: JwtPayload) => {
  const isWalletExist = await Wallet.findById(walletId);
  const walletOwner = isWalletExist?.userId.toString();

  if (!isWalletExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not Found");
  }
  if (decodedTokenn.role !== UserRole.ADMIN && decodedTokenn.userId !== walletOwner) {
    throw new AppError(httpStatus.FORBIDDEN,"You have no permit to acces this" );
  }
  if (payload.IsActive || payload.IsVerified || payload.transactionLimit) {
    if (decodedTokenn.role !== UserRole.ADMIN) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not Authorized");
    }
  }
  if (payload.securityPin) {
    payload.securityPin = await bcryptjs.hash(
      payload.securityPin,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const newUpdatedWallet = await Wallet.findByIdAndUpdate(walletId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedWallet;
};

// get all users
const deleteWalletS = async (walletId: string) => {
  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Wallet not found");
  }

  await Wallet.findByIdAndDelete(walletId);
  return null;
};

// user service controller
export const WalletServiceController = {
  getAllWalletS,
  getMyWalletS,
  updateWalletS,
  deleteWalletS,
};

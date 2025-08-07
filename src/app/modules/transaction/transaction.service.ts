import { JwtPayload } from "jsonwebtoken";
import { ITransaction, TType } from "./transaction.interface";
import { Transaction } from "./transaction.model";
import { UserRole } from "../user/user.interface";
import { AppError } from "../../ErrorHelper/AppError";
import httpStatus from "http-status-codes";
import { Wallet } from "../wallet/wallet.model";
import { WalletStatus } from "../wallet/wallet.interface";
import mongoose from "mongoose";

// create transaction
const createTransactionS = async (payload: Partial<ITransaction>, decodedInfo: JwtPayload) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const transaction_type = payload?.transaction_type;
  const user_role = decodedInfo?.role;
  const from_wallet_id = payload?.fromWallet;
  const to_wallet_id = payload?.toWallet;
  const amount = payload?.amount as number;
  const from_wallet = await Wallet?.findById(from_wallet_id).session(session);
  const to_wallet = await Wallet?.findById(to_wallet_id).session(session);

  //  agent transaction condition check
  if (user_role === UserRole.AGENT) {
    if (transaction_type !== TType.CASH_IN && transaction_type !== TType.CASH_OUT){
        throw new AppError(httpStatus.FORBIDDEN, `You are ${user_role}. You can't do ${transaction_type}`);
    }
  }

  // user transaction condition check
 if (user_role === UserRole.USER) {
    if (transaction_type === TType.CASH_IN || transaction_type === TType.CASH_OUT) { 
      throw new AppError( httpStatus.FORBIDDEN,`You are ${user_role}. You can't do ${transaction_type}` );
    }
  }


// from wallet conditon check
  if (!from_wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Sender Wallet is not Found");
  }
  if (from_wallet.IsActive !== WalletStatus.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "Sender Wallet is not Active");
  }
  if ((from_wallet.balance ?? 0) < amount) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Sender have no sufficient balance"
    );
  }

  // to wallet condition check
  if (!to_wallet) {
    throw new AppError(httpStatus.NOT_FOUND, "Reciever Wallet is not Found");
  }
  if (to_wallet.IsActive !== WalletStatus.ACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, "Receiver Wallet is not Active");
  }

    // Update balances
  from_wallet.balance = (from_wallet.balance ?? 0) - amount;
  to_wallet.balance = (to_wallet.balance ?? 0) + amount;

  await from_wallet.save({ session });
  await to_wallet.save({ session });
  const transaction = await Transaction.create([payload], { session });
  return { transaction: transaction[0], session };
};


// get all transaction
const getAllTransactionS = async () => {
  const transactions = await Transaction.find({});
  const totalTransactoin = await Transaction.countDocuments();
  return {
    data: transactions,
    meta: {
      total: totalTransactoin,
    },
  };
};


// get my transaction
const getMyTransactionS = async (userId:string) => {
    const transaction = await Transaction.find({userId:userId});
  if (transaction.length === 0 ) {
    throw new AppError(httpStatus.NOT_FOUND, "Transaction not found");
  }


  const totalTransactoin = await Transaction.countDocuments();
  return {
    data: transaction,
    meta: {
      total: totalTransactoin,
    },
  };
};


// transaction update
const updateTransactionS = async (transactionId: string, payload: Partial<ITransaction>, ) => {
  const isTransactionExist = await Transaction.findById(transactionId);

  if (!isTransactionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Transactoin not Found");
  }
  const newUpdatedTransaction = await Transaction.findByIdAndUpdate(transactionId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdatedTransaction;
};

// delete transaction
const deleteTransactionS = async (transactionId: string) => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new AppError(httpStatus.NOT_FOUND, "Transaction not found");
  }

  await Transaction.findByIdAndDelete(transactionId);
  return null;
};


// transaction service controller
export const transactionServiceController = {
  createTransactionS,
  getAllTransactionS,
  getMyTransactionS,
  updateTransactionS,
  deleteTransactionS
};

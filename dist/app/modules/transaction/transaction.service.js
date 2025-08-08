"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionServiceController = void 0;
const transaction_interface_1 = require("./transaction.interface");
const transaction_model_1 = require("./transaction.model");
const user_interface_1 = require("../user/user.interface");
const AppError_1 = require("../../ErrorHelper/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const wallet_model_1 = require("../wallet/wallet.model");
const wallet_interface_1 = require("../wallet/wallet.interface");
const mongoose_1 = __importDefault(require("mongoose"));
// create transaction
const createTransactionS = (payload, decodedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const transaction_type = payload === null || payload === void 0 ? void 0 : payload.transaction_type;
    const user_role = decodedInfo === null || decodedInfo === void 0 ? void 0 : decodedInfo.role;
    const from_wallet_id = payload === null || payload === void 0 ? void 0 : payload.fromWallet;
    const to_wallet_id = payload === null || payload === void 0 ? void 0 : payload.toWallet;
    const amount = payload === null || payload === void 0 ? void 0 : payload.amount;
    const from_wallet = yield (wallet_model_1.Wallet === null || wallet_model_1.Wallet === void 0 ? void 0 : wallet_model_1.Wallet.findById(from_wallet_id).session(session));
    const to_wallet = yield (wallet_model_1.Wallet === null || wallet_model_1.Wallet === void 0 ? void 0 : wallet_model_1.Wallet.findById(to_wallet_id).session(session));
    //  agent transaction condition check
    if (user_role === user_interface_1.UserRole.AGENT) {
        if (transaction_type !== transaction_interface_1.TType.CASH_IN &&
            transaction_type !== transaction_interface_1.TType.CASH_OUT) {
            throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, `You are ${user_role}. You can't do ${transaction_type}`);
        }
    }
    // user transaction condition check
    if (user_role === user_interface_1.UserRole.USER) {
        if (transaction_type === transaction_interface_1.TType.CASH_IN ||
            transaction_type === transaction_interface_1.TType.CASH_OUT) {
            throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, `You are ${user_role}. You can't do ${transaction_type}`);
        }
    }
    // from wallet conditon check
    if (!from_wallet) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Sender Wallet is not Found");
    }
    if (from_wallet.IsActive !== wallet_interface_1.WalletStatus.ACTIVE) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Sender Wallet is not Active");
    }
    if (((_a = from_wallet.balance) !== null && _a !== void 0 ? _a : 0) < amount) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Sender have no sufficient balance");
    }
    // to wallet condition check
    if (!to_wallet) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Reciever Wallet is not Found");
    }
    if (to_wallet.IsActive !== wallet_interface_1.WalletStatus.ACTIVE) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Receiver Wallet is not Active");
    }
    // Update balances
    from_wallet.balance = ((_b = from_wallet.balance) !== null && _b !== void 0 ? _b : 0) - amount;
    to_wallet.balance = ((_c = to_wallet.balance) !== null && _c !== void 0 ? _c : 0) + amount;
    yield from_wallet.save({ session });
    yield to_wallet.save({ session });
    const transaction = yield transaction_model_1.Transaction.create([payload], { session });
    return { transaction: transaction[0], session };
});
// get all transaction
const getAllTransactionS = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find({});
    const totalTransactoin = yield transaction_model_1.Transaction.countDocuments();
    return {
        data: transactions,
        meta: {
            total: totalTransactoin,
        },
    };
});
// get my transaction
const getMyTransactionS = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.Transaction.find({ userId: userId });
    if (transaction.length === 0) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Transaction not found");
    }
    const totalTransactoin = yield transaction_model_1.Transaction.countDocuments();
    return {
        data: transaction,
        meta: {
            total: totalTransactoin,
        },
    };
});
// transaction update
const updateTransactionS = (transactionId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isTransactionExist = yield transaction_model_1.Transaction.findById(transactionId);
    if (!isTransactionExist) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Transactoin not Found");
    }
    const newUpdatedTransaction = yield transaction_model_1.Transaction.findByIdAndUpdate(transactionId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedTransaction;
});
// delete transaction
const deleteTransactionS = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.Transaction.findById(transactionId);
    if (!transaction) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Transaction not found");
    }
    yield transaction_model_1.Transaction.findByIdAndDelete(transactionId);
    return null;
});
// transaction service controller
exports.transactionServiceController = {
    createTransactionS,
    getAllTransactionS,
    getMyTransactionS,
    updateTransactionS,
    deleteTransactionS,
};

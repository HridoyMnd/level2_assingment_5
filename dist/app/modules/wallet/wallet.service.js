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
exports.WalletServiceController = void 0;
const wallet_model_1 = require("./wallet.model");
const AppError_1 = require("../../ErrorHelper/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_interface_1 = require("../user/user.interface");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../../config");
// get all wallet
const getAllWalletS = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallets = yield wallet_model_1.Wallet.find({});
    const totalWallet = yield wallet_model_1.Wallet.countDocuments();
    return {
        data: wallets,
        meta: {
            total: totalWallet,
        },
    };
});
// get my wallet
const getMyWalletS = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ userId: userId });
    if (!wallet) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Wallet not found");
    }
    const totalWallet = yield wallet_model_1.Wallet.countDocuments();
    return {
        data: wallet,
        meta: {
            total: totalWallet,
        },
    };
});
// update user api
const updateWalletS = (walletId, payload, decodedTokenn) => __awaiter(void 0, void 0, void 0, function* () {
    const isWalletExist = yield wallet_model_1.Wallet.findById(walletId);
    const walletOwner = isWalletExist === null || isWalletExist === void 0 ? void 0 : isWalletExist.userId.toString();
    if (!isWalletExist) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Wallet not Found");
    }
    if (decodedTokenn.role !== user_interface_1.UserRole.ADMIN &&
        decodedTokenn.userId !== walletOwner) {
        throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, "You have no permit to acces this");
    }
    if (payload.IsActive || payload.IsVerified || payload.transactionLimit) {
        if (decodedTokenn.role !== user_interface_1.UserRole.ADMIN) {
            throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, "You are not Authorized");
        }
    }
    if (payload.securityPin) {
        payload.securityPin = yield bcryptjs_1.default.hash(payload.securityPin, config_1.envVars.BCRYPT_SALT_ROUND);
    }
    const newUpdatedWallet = yield wallet_model_1.Wallet.findByIdAndUpdate(walletId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedWallet;
});
// get all users
const deleteWalletS = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findById(walletId);
    if (!wallet) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "Wallet not found");
    }
    yield wallet_model_1.Wallet.findByIdAndDelete(walletId);
    return null;
});
// user service controller
exports.WalletServiceController = {
    getAllWalletS,
    getMyWalletS,
    updateWalletS,
    deleteWalletS,
};

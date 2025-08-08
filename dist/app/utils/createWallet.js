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
exports.createWallet = void 0;
const wallet_model_1 = require("../modules/wallet/wallet.model");
const wallet_interface_1 = require("../modules/wallet/wallet.interface");
const AppError_1 = require("../ErrorHelper/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// seed admin with default
const createWallet = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isWalletExist = yield wallet_model_1.Wallet.findById(user_id);
        if (isWalletExist) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "Wallet Already Exist");
        }
        const payload = {
            userId: user_id,
            balance: 50,
            currency: "BDT",
            IsActive: wallet_interface_1.WalletStatus.ACTIVE,
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
        yield wallet_model_1.Wallet.create(payload);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createWallet = createWallet;

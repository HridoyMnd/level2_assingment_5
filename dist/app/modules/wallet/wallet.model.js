"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const wallet_interface_1 = require("./wallet.interface");
// transactionLimitSchema 
const transactionLimitSchema = new mongoose_1.Schema({
    dailyAmount: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
}, {
    versionKey: false,
    timestamps: false,
    _id: false,
});
// linkedBankAccountSchema
const linkedBankAccountSchema = new mongoose_1.Schema({
    bankName: { type: String, required: true },
    accountNumber: { type: Number, required: true },
}, {
    versionKey: false,
    timestamps: false,
    _id: false,
});
// wallletSchema 
const walletSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(wallet_interface_1.WalletStatus),
        required: true,
        default: wallet_interface_1.WalletStatus.ACTIVE,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// wallet model
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);

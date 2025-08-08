"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
//  transaction schema
const transactionSchmma = new mongoose_1.Schema({
    transaction_type: { type: String, enum: Object.values(transaction_interface_1.TType), required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "BDT" },
    status: { type: String, enum: Object.values(transaction_interface_1.TStatus), default: transaction_interface_1.TStatus.PENDING },
    paymentMethod: { type: String },
    fromWallet: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet", required: true },
    toWallet: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet", required: true },
    initiatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    userId: { type: String, required: true },
    transaction_fee: { type: Number, default: 0 },
    balanceBefore: { type: Number },
    balanceAfter: { type: Number },
    deviceInfo: { type: String }
}, {
    timestamps: true,
    versionKey: false
});
// transaction model 
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchmma);

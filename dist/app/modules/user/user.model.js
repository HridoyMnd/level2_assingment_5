"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
// auth provider schema
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
});
// user model
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isActive: { type: String, enum: Object.values(user_interface_1.IsActive), default: user_interface_1.IsActive.ACTIVE },
    role: { type: String, enum: Object.values(user_interface_1.UserRole), default: user_interface_1.UserRole.USER },
    wallet: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet" },
    auths: [authProviderSchema],
}, {
    versionKey: false,
    timestamps: true
});
exports.User = (0, mongoose_1.model)("User", userSchema);

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const config_1 = require("../../config");
const AppError_1 = require("../../ErrorHelper/AppError");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createWallet_1 = require("../../utils/createWallet");
// create user
const createUserS = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User already Exist");
    }
    const hassPassword = yield bcryptjs_1.default.hash(password, config_1.envVars.BCRYPT_SALT_ROUND);
    const authProviders = {
        provider: "credentials",
        providerId: email,
    };
    const user = yield user_model_1.User.create(Object.assign(Object.assign({ email, password: hassPassword }, rest), { auths: [authProviders] }));
    yield (0, createWallet_1.createWallet)(user._id);
    return user;
});
// get all users
const getAllUsersS = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({});
    const totalUsers = yield user_model_1.User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUsers,
        },
    };
});
// get my wallet
const getUserS = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ _id: userId });
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
// delete a user
const deleteUserC = (userId, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const user_role = decodedToken.role;
    const user = yield user_model_1.User.findOne({ _id: userId });
    if (!user) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (user_role !== user_interface_1.UserRole.ADMIN) {
        if (user_role === user_interface_1.UserRole.USER || user_role === user_interface_1.UserRole.AGENT) {
            if (decodedToken.userId !== userId) {
                throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "You can't delete this user");
            }
        }
    }
    yield user_model_1.User.findByIdAndDelete(userId);
    return null;
});
// update user api
const updateUserS = (userId, payload, decodedTokenn) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_model_1.User.findById(userId);
    if (!isUserExist) {
        throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "User not Found");
    }
    if (payload === null || payload === void 0 ? void 0 : payload.role) {
        if ((decodedTokenn === null || decodedTokenn === void 0 ? void 0 : decodedTokenn.role) !== (user_interface_1.UserRole === null || user_interface_1.UserRole === void 0 ? void 0 : user_interface_1.UserRole.ADMIN)) {
            throw new AppError_1.AppError(http_status_codes_1.default === null || http_status_codes_1.default === void 0 ? void 0 : http_status_codes_1.default.FORBIDDEN, "You are not Authorized");
        }
    }
    if ((payload === null || payload === void 0 ? void 0 : payload.isActive) || (payload === null || payload === void 0 ? void 0 : payload.isDeleted) || (payload === null || payload === void 0 ? void 0 : payload.isVerified)) {
        if ((decodedTokenn === null || decodedTokenn === void 0 ? void 0 : decodedTokenn.role) !== (user_interface_1.UserRole === null || user_interface_1.UserRole === void 0 ? void 0 : user_interface_1.UserRole.ADMIN)) {
            throw new AppError_1.AppError(http_status_codes_1.default === null || http_status_codes_1.default === void 0 ? void 0 : http_status_codes_1.default.FORBIDDEN, "You are not Authorized");
        }
    }
    if (payload === null || payload === void 0 ? void 0 : payload.password) {
        payload.password = yield bcryptjs_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.password, config_1.envVars.BCRYPT_SALT_ROUND);
    }
    const newUpdatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
// user service controller
exports.ServiceController = {
    createUserS,
    getAllUsersS,
    getUserS,
    updateUserS,
    deleteUserC
};

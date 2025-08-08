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
exports.WalletController = void 0;
const sendResponse_1 = require("../../utils/sendResponse");
const wallet_service_1 = require("./wallet.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
// get all wallets
const getAllWalletC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const wallets = yield wallet_service_1.WalletServiceController.getAllWalletS();
    // response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All Wallet Retrived Successfully",
        data: wallets.data,
        meta: wallets.meta
    });
}));
// get my wallet
const getMyWalletC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (req.user_r.userId);
    const wallet = yield wallet_service_1.WalletServiceController.getMyWalletS(userId);
    // response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Wallet Retrived successfully",
        data: wallet.data,
        meta: wallet.meta
    });
}));
// update wallet
const updateWalletC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    const verifiedToken = req.user_r;
    const payload = req.body;
    const wallet = yield wallet_service_1.WalletServiceController.updateWalletS(walletId, payload, verifiedToken);
    //response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Wallet updated Successfully",
        data: wallet
    });
}));
// delete wallet
const deleteWalletC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const walletId = req.params.id;
    const wallet = yield wallet_service_1.WalletServiceController.deleteWalletS(walletId);
    //response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Wallet updated Successfully",
        data: wallet
    });
}));
//  controller
exports.WalletController = {
    getAllWalletC,
    getMyWalletC,
    updateWalletC,
    deleteWalletC
};

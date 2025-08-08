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
exports.transactionController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const transaction_service_1 = require("./transaction.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// create transaction
const createTransactionC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedInfo = req.user_r;
    const payload = req.body;
    const { transaction, session } = yield transaction_service_1.transactionServiceController.createTransactionS(payload, decodedInfo);
    try {
        yield session.commitTransaction();
        session.endSession();
        //response send
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.default.CREATED,
            message: "Transaction created Successfully",
            data: transaction
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        next(error);
    }
}));
// get all transaction
const getAllTransactionC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_service_1.transactionServiceController.getAllTransactionS();
    // response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All Transaction Retrived Successfully",
        data: transactions.data,
        meta: transactions.meta
    });
}));
// get my transaction
const getMyTransactionC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (req.user_r.userId);
    const transaction = yield transaction_service_1.transactionServiceController.getMyTransactionS(userId);
    // response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "All Transaction Retrived Successfully",
        data: transaction.data,
        meta: transaction.meta
    });
}));
// update transaction
const updateTransactionC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.id;
    const payload = req.body;
    const transaction = yield transaction_service_1.transactionServiceController.updateTransactionS(transactionId, payload);
    //response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Transaction updated Successfully",
        data: transaction
    });
}));
// delete transaction
const deleteTransactionC = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = req.params.id;
    const transaction = yield transaction_service_1.transactionServiceController.deleteTransactionS(transactionId);
    //response send
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.CREATED,
        message: "Transaction Deleted Successfully",
        data: transaction
    });
}));
// transaction controller
exports.transactionController = {
    createTransactionC,
    getAllTransactionC,
    getMyTransactionC,
    updateTransactionC,
    deleteTransactionC
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TStatus = exports.TType = void 0;
// transaction type 
var TType;
(function (TType) {
    TType["CASH_IN"] = "CASH_IN";
    TType["CASH_OUT"] = "CASH_OUT";
    TType["SEND_MONEY"] = "SEND_MONEY";
    TType["ADD_MONEY"] = "ADD_MONEY";
    TType["WITHDRAW_MONEY"] = "WITHDRAW_MONEY";
})(TType || (exports.TType = TType = {}));
// transaction status
var TStatus;
(function (TStatus) {
    TStatus["PENDING"] = "PENDING";
    TStatus["SUCCESS"] = "SUCCESS";
    TStatus["FAILED"] = "FAILED";
})(TStatus || (exports.TStatus = TStatus = {}));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
// create send response
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        StatusCodes: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: data.data
    });
};
exports.sendResponse = sendResponse;

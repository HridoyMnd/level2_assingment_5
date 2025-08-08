"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CastErrorHandle = void 0;
// Cast error handle 
const CastErrorHandle = (err) => {
    return {
        statusCode: 400,
        message: `Invalid MongoDB ObjectId, ${err}`,
    };
};
exports.CastErrorHandle = CastErrorHandle;

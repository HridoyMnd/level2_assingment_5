"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateErrorHandle = void 0;
// Duplicate Error handle
const DuplicateErrorHandle = (err) => {
    const matchedArr = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArr[1]} is already exist`
    };
};
exports.DuplicateErrorHandle = DuplicateErrorHandle;

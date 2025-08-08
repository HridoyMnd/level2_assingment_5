"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodErrorHandle = void 0;
// handle zod error 
const ZodErrorHandle = (err) => {
    const errorSources = [];
    err.issues.forEach((issue) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        });
    });
    return {
        statusCode: 400,
        message: `Zod Error Occured`,
        errorSources
    };
};
exports.ZodErrorHandle = ZodErrorHandle;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = require("../config");
const AppError_1 = require("../ErrorHelper/AppError");
const duplicateError_1 = require("../helpers/duplicateError");
const castError_1 = require("../helpers/castError");
const validationError_1 = require("../helpers/validationError");
const zodError_1 = require("../helpers/zodError");
let errorSource = [];
// global error hanlder function
exports.globalErrorHandler = ((err, req, res, next) => {
    let statusCode = 500;
    let message = `Something is wrong, ${err.message}`;
    // duplicate email handle
    if (err.code === 11000) {
        const simplifyDubError = (0, duplicateError_1.DuplicateErrorHandle)(err);
        statusCode = simplifyDubError.statusCode;
        message = simplifyDubError.message;
    }
    // Cast error/ ObjectId error
    else if (err.name === "CastError") {
        const simplifyCastError = (0, castError_1.CastErrorHandle)(err);
        statusCode = simplifyCastError.statusCode;
        message = simplifyCastError.message;
    }
    //validation error handle
    else if (err.name === "ValidationError") {
        const simlifyValiDationErr = (0, validationError_1.ValidationErrorHandle)(err);
        statusCode = simlifyValiDationErr.statusCode;
        errorSource = simlifyValiDationErr.errorSources;
        message = simlifyValiDationErr.message;
    }
    // ZodError
    else if (err.name === "ZodError") {
        const simlifyZodError = (0, zodError_1.ZodErrorHandle)(err);
        statusCode = simlifyZodError.statusCode;
        message = simlifyZodError.message;
        errorSource = simlifyZodError.errorSources;
    }
    if (err instanceof AppError_1.AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }
    // send response
    res.status(statusCode).json({
        success: false,
        message: message,
        errorSource,
        err: config_1.envVars.NODE_ENV === "development" ? err : null,
        stack: config_1.envVars.NODE_ENV === "development" ? err.stack : null
    });
});

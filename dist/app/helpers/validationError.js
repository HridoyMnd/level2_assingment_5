"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorHandle = void 0;
// Validation error handle
const ValidationErrorHandle = (err) => {
    const errorSources = [];
    const errors = Object.values(err.errors);
    errors.forEach((error) => errorSources.push({
        path: error.path,
        message: error.message
    }));
    return {
        statusCode: 400,
        message: `Validation Error Occured`,
        errorSources
    };
};
exports.ValidationErrorHandle = ValidationErrorHandle;

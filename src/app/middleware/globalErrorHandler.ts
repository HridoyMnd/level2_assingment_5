/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { envVars } from '../config';
import { AppError } from '../ErrorHelper/AppError';
import { TErrorSources } from '../interfaces/errorTypes';
import { DuplicateErrorHandle } from '../helpers/duplicateError';
import { CastErrorHandle } from '../helpers/castError';
import { ValidationErrorHandle } from '../helpers/validationError';
import { ZodErrorHandle } from '../helpers/zodError';


let errorSource: TErrorSources[] = [];

// global error hanlder function
export const globalErrorHandler =((err:any, req:Request, res:Response, next: NextFunction) => {
let statusCode = 500;
let message = `Something is wrong, ${err.message}`;


    // duplicate email handle
    if(err.code === 11000){
        const simplifyDubError = DuplicateErrorHandle(err);
        statusCode = simplifyDubError.statusCode;
        message = simplifyDubError.message;
    }

    // Cast error/ ObjectId error
    else if(err.name === "CastError") {
        const simplifyCastError = CastErrorHandle(err);
        statusCode = simplifyCastError.statusCode;
        message = simplifyCastError.message;
    }

    //validation error handle
    else if(err.name === "ValidationError") {
        const simlifyValiDationErr = ValidationErrorHandle(err);
         statusCode = simlifyValiDationErr.statusCode;
         errorSource = simlifyValiDationErr.errorSources as TErrorSources[] ;
         message = simlifyValiDationErr.message;
    }

    // ZodError
    else if(err.name === "ZodError") {
    const simlifyZodError = ZodErrorHandle(err);
        statusCode = simlifyZodError.statusCode;
        message = simlifyZodError.message;

        errorSource = simlifyZodError.errorSources as TErrorSources[];
    }


if(err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
}else if(err instanceof Error){
    statusCode = 500;
    message = err.message;
}

// send response
res.status(statusCode).json({
    success: false, 
    message: message,
    errorSource,
    err:envVars.NODE_ENV === "development"? err: null,
    stack: envVars.NODE_ENV === "development"? err.stack: null
});

});
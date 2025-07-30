
import { NextFunction, Request, Response } from 'express';
export const globalErrorHandler =((err:any, req:Request, res:Response, next: NextFunction) => {

const statusCode = 500;
const message = `Something is wrong, ${err.message}`


res.status(statusCode).json({
    success: false, 
    message: message,
    err,
    stack: err.stack 
})

})
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { transactionServiceController } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';


// create transaction
const createTransactionC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await transactionServiceController.createTransactionS(req.body);

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "Transaction created Successfully",
      data: user
    });
});


// get all transactions
const getAllTransactionC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const transactions = await transactionServiceController.getAllTransactionS();

    // response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.OK,  
      message: "All Transaction Retrived Successfully",
      data: transactions.data,
      meta: transactions.meta
    });
});



// transaction controller
export const transactionController = {
    createTransactionC,
    getAllTransactionC
}
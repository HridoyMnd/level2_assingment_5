import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { transactionServiceController } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';


// create transaction
const createTransactionC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const decodedInfo = req.user_r
  const payload = req.body;
  const { transaction, session }= await transactionServiceController.createTransactionS(payload, decodedInfo);
try {

      await session.commitTransaction();
      session.endSession();

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "Transaction created Successfully",
      data: transaction
    });
} catch (error) {
        await session.abortTransaction();
      session.endSession();
      next(error)
}
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
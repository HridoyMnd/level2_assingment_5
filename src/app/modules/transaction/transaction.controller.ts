import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { transactionServiceController } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { JwtPayload } from "jsonwebtoken";


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


// get all transaction
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

// get my transaction
const getMyTransactionC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req.user_r.userId)
    const transaction = await transactionServiceController.getMyTransactionS(userId);

    // response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.OK,  
      message: "All Transaction Retrived Successfully",
      data: transaction.data,
      meta: transaction.meta
    });
});


// update transaction
const updateTransactionC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const  transactionId = req.params.id;
    const payload = req.body;
    const transaction = await transactionServiceController.updateTransactionS(transactionId, payload);

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "Transaction updated Successfully",
      data: transaction
    });
});


// delete transaction
const deleteTransactionC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const  transactionId = req.params.id;
    const transaction = await transactionServiceController.deleteTransactionS(transactionId);

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "Transaction updated Successfully",
      data: transaction
    });
});

// transaction controller
export const transactionController = {
    createTransactionC,
    getAllTransactionC,
    getMyTransactionC,
    updateTransactionC,
    deleteTransactionC
}
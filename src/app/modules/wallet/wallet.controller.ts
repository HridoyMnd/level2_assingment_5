import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { WalletServiceController } from "./wallet.service";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";


// get all users
const getAllWalletC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await WalletServiceController.getAllWalletS();

    // response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.OK,  
      message: "AllUser Retrived Successfully",
      data: users.data,
      meta: users.meta
    });
});


//  controller
export const WalletController = {

  getAllWalletC,

};

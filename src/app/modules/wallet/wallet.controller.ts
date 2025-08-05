import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { WalletServiceController } from "./wallet.service";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";


// get all wallets
const getAllWalletC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const wallets = await WalletServiceController.getAllWalletS();

    // response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.OK,  
      message: "All Wallet Retrived Successfully",
      data: wallets.data,
      meta: wallets.meta
    });
});

// get my wallet
const getMyWalletC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req.user_r.userId)
  const wallet = await WalletServiceController.getMyWalletS(userId);

    // response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.OK,  
      message: "Wallet Retrived successfully",
      data: wallet.data,
      meta: wallet.meta
    });
});


// update user
const updateWalletC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const  walletId = req.params.id;
    const verifiedToken = req.user_r;
    const payload = req.body;
    const user = await WalletServiceController.updateWalletS(walletId, payload, verifiedToken as JwtPayload);

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "Wallet updated Successfully",
      data: user
    });
});


// delete wallet
const deleteWalletC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const  walletId = req.params.id;
    const verifiedToken = req.user_r;
    const user = await WalletServiceController.deleteWalletS(walletId, verifiedToken as JwtPayload);

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "Wallet updated Successfully",
      data: user
    });
});


//  controller
export const WalletController = {
  getAllWalletC,
  getMyWalletC,
  updateWalletC,
  deleteWalletC
};

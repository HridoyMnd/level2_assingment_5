import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { authServiceController } from "./auth.service";


// credentials login
const credentialLoginC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await authServiceController.credentialLoginS(req.body);

     //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "User Login Successfully",
      data : loginInfo
});
});


//auth controller
export const authController ={
    credentialLoginC
};
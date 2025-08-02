import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { authServiceController } from "./auth.service";
import { setCookie } from "../../utils/setCookie";


// credentials login
const credentialLoginC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await authServiceController.credentialLoginS(req.body);
    
    //set cookie and response send
    setCookie(res, loginInfo)
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "User Login Successfully",
      data : loginInfo
});
});


// get access token
const getAccessTokenC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const refToken = req.cookies.refreshToken;
const tokenInfo = await authServiceController.getNewAccessTokenS(refToken as string);

    // set cookies and send response
    setCookie(res, tokenInfo)
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,
      message: "User Login Successfully",
      data: tokenInfo
    });
});


//auth controller
export const authController ={
    credentialLoginC,
    getAccessTokenC
};
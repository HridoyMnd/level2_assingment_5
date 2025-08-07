/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { authServiceController } from "./auth.service";
import { setCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../ErrorHelper/AppError";
import { createUserToken } from "../../utils/userToken";
import { envVars } from "../../config";
import passport from "passport";


// credentials login
const credentialLoginC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local",  async(err:any, user: any, info: any ) => {
      if(err) {
          return next(new AppError(httpStatus.BAD_REQUEST, err));
      }
      if(!user){
        return next(new AppError(httpStatus.BAD_REQUEST, err));
      }

       const userTokens =  createUserToken(user);
       const {password: pass, ...rest} = user.toObject();

   //set cookie and response send
    setCookie(res, userTokens);
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "User Login Successfully",
      data: {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
      }
    });
    })(req, res, next);
});


// get access token
const getAccessTokenC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
const refToken = req.cookies.refreshToken;
const tokenInfo = await authServiceController.getNewAccessTokenS(refToken as string);

    // set cookies and send response
    setCookie(res, tokenInfo);
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,
      message: "User Login Successfully",
      data: tokenInfo
    });
});

// user logout
const logoutUserC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  // clear access token 
res.clearCookie("accessToken", {
  httpOnly:true,
  secure:false,
  sameSite: "lax"
});

// clear refresh token
res.clearCookie("refreshToken", {
  httpOnly:true,
  secure:false,
  sameSite: "lax"
});

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,
      message: "User Login Successfully",
      data: null
    });
});

// reset password
const resetPasswordC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;
  const decodedToken = req.user_r;
  await authServiceController.resetPasswordS(newPassword, oldPassword, decodedToken as JwtPayload);

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,
      message: "password change Successfully",
      data: null
    });
});

// reset password
const googleCallBackC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let redirectTo = req.query.state? req.query.state as string:"" ;

  if(redirectTo) {
    redirectTo = redirectTo.slice(1);
  }

  const user = req.user;
  if(!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not Found");
  }
  const tokenInfo = createUserToken(user);
  setCookie(res, tokenInfo);

  res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);


});

//auth controller
export const authController ={
    credentialLoginC,
    getAccessTokenC,
    logoutUserC,
    resetPasswordC,
    googleCallBackC
};
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { ServiceController } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


// create user 
const createUserC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await ServiceController.createUserS(req.body);

    //response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.CREATED,  
      message: "User created Successfully",
      data: user
    });

})

// get all users
const getAllUsersC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await ServiceController.getAllUsersS();

    // response send
    sendResponse(res, {
      success: true, 
      statusCode: httpStatus.OK,  
      message: "AllUser Retrived Successfully",
      data: users.data,
      meta: users.meta
    });
})


//  controller
export const userController = {
  createUserC,
  getAllUsersC
};

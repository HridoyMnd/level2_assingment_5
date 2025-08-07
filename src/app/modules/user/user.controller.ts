/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { ServiceController } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

// create user
const createUserC = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await ServiceController.createUserS(req.body);

    //response send
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created Successfully",
      data: user,
    });
  }
);

// get all users
const getAllUsersC = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await ServiceController.getAllUsersS();

    // response send
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "AllUser Retrived Successfully",
      data: users.data,
      meta: users.meta,
    });
  }
);

// get a user
const getUserC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user_r.userId;
    const user = await ServiceController.getUserS(userId);

    // response send
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Retrived Successfully",
      data: user
    });
  }
);

// update user
const updateUserC = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const verifiedToken = req.user_r;
    const payload = req.body;
    const user = await ServiceController.updateUserS(
      userId,
      payload,
      verifiedToken as JwtPayload
    );

    //response send
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User updated Successfully",
      data: user,
    });
  }
);

// delete a user
const deleteUserC = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user_r;
    const userId = req.params.id; 
    const user = await ServiceController.deleteUserC(userId, decodedToken);

    // response send
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Deleted Successfully",
      data: user
    });
  }
);



//  controller
export const userController = {
  createUserC,
  getAllUsersC,
  getUserC,
  updateUserC,
  deleteUserC
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { ServiceController } from "./user.service";

// create user
const createUserC = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await ServiceController.createUserS(req.body);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: `User created Successfylly`,
      data: user,
    });
  } catch (error) {
    next(error)
    // res.status(httpStatus.BAD_REQUEST).json({
    //   success: false,
    //   message: `User created Failed`,
    // });
  }
};


//  controller
export const userController = {
  createUserC,
};

import mongoose from "mongoose"
import { TGenericErrorResponse } from "../interfaces/errorTypes"

// Cast error handle 
export const CastErrorHandle = (err:mongoose.Error.CastError): TGenericErrorResponse => {
    return {
        statusCode: 400,
        message: `Invalid MongoDB ObjectId`
    }
}
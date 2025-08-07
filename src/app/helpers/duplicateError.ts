/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from "../interfaces/errorTypes";

// Duplicate Error handle
export const DuplicateErrorHandle = (err: any): TGenericErrorResponse => {
const matchedArr = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArr[1]} is already exist`
    };
};

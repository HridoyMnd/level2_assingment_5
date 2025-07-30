
import express, { NextFunction, Request, Response } from 'express'
import httpStatus from "http-status-codes";
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { router } from './app/routes';
import { notFound } from './app/middleware/notFound';
export const app = express();

app.use(express.json());
app.use("/api/v1", router)

app.get("/", (req: Request, res:Response) => {
    res.status(httpStatus.OK).json({
        succss:true,
        message: `Server is doing all right`
    })
})

//global error hanlder
app.use(globalErrorHandler);
app.use(notFound)

import express, { Request, Response } from 'express'
import httpStatus from "http-status-codes";
import { router } from './routes';
export const app = express();

app.use(express.json());
app.use("/api/v1", router)

app.get("/", (req: Request, res:Response) => {
    res.status(httpStatus.OK).json({
        succss:true,
        message: `Server is doing all right`
    })
})
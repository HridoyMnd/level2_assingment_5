import express, { Request, Response } from 'express'
import httpStatus from "http-status-codes";
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { router } from './app/routes';
import { notFound } from './app/middleware/notFound';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { envVars } from './app/config';
import passport from 'passport';
import expressSession  from 'express-session';
import "./app/config/passport";
export const app = express();

app.use(expressSession({
  secret: envVars.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())
app.use(cors())
app.use(express.json());
app.use("/api/v1", router)


// get route testing
app.get("/", (req: Request, res:Response) => {
    res.status(httpStatus.OK).json({
        succss:true,
        message: `Server is doing all right`
    })
})


//global error hanlder
app.use(globalErrorHandler);
app.use(notFound)
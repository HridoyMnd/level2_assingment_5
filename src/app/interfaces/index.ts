/* eslint-disable @typescript-eslint/no-namespace */
import { JwtPayload } from "jsonwebtoken";


// custom express object create
declare global {
    namespace Express {
        interface Request {
            user_r: JwtPayload
        }
    }
}
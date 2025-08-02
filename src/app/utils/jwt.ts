import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from 'jsonwebtoken';


// generate jwttoken
const generateToken = (jwtPayload:JwtPayload, secret: string, expiresIn:string) => {
    const token =  jwt.sign(jwtPayload, secret, {
        expiresIn
    } as SignOptions)

    return token;
}


// verify jwt token
const verifyToken = (token: string, secret:string) => {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
}


// export jwt controller
export const jwtController = {
    generateToken,
    verifyToken
}   
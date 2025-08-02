import { Response } from "express";

// auth tokens interface
export interface authTokens {
    accessToken? : string
    refreshToken? : string
}

// set auth cookies
export const setCookie = (res: Response, tokenInfo: authTokens) => {
// set accesstokne to cookie
if(tokenInfo.accessToken){
    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false
    });
}   

// set refresh to cookie
if(tokenInfo.refreshToken){
    res.cookie("refreshToken", tokenInfo.refreshToken, {
        httpOnly: true,
        secure: false
    });
}   
};
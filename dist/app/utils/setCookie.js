"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
// set auth cookies
const setCookie = (res, tokenInfo) => {
    // set accesstokne to cookie
    if (tokenInfo.accessToken) {
        res.cookie("accessToken", tokenInfo.accessToken, {
            httpOnly: true,
            secure: false
        });
    }
    // set refresh to cookie
    if (tokenInfo.refreshToken) {
        res.cookie("refreshToken", tokenInfo.refreshToken, {
            httpOnly: true,
            secure: false
        });
    }
};
exports.setCookie = setCookie;

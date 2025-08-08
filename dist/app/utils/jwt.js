"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// generate jwttoken
const generateToken = (jwtPayload, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(jwtPayload, secret, {
        expiresIn
    });
    return token;
};
// verify jwt token
const verifyToken = (token, secret) => {
    const verifiedToken = jsonwebtoken_1.default.verify(token, secret);
    return verifiedToken;
};
// export jwt controller
exports.jwtController = {
    generateToken,
    verifyToken
};

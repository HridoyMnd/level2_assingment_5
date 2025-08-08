"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// env vars loading 
const loadEnvVariables = () => {
    const requrementVariables = [
        "PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "JWT_REFRESH_EXPIRESIN", "JWT_ACCESS_EXPIRESIN", "BCRYPT_SALT_ROUND", "ADMIN_EMAIL", "ADMIN_PASSWORD", "CLIENT_SECRET", "CLIENT_ID", "GOOGLE_CALLBACK_URL", "EXPRESS_SESSION_SECRET", "FRONTEND_URL"
    ];
    // check env vars 
    requrementVariables.map((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing require Variable ${key}`);
        }
    });
    // return env vars
    return {
        PORT: process.env.PORT,
        DB_URL: process.env.DB_URL,
        NODE_ENV: process.env.NODE_ENV,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRESIN: process.env.JWT_REFRESH_EXPIRESIN,
        JWT_ACCESS_EXPIRESIN: process.env.JWT_ACCESS_EXPIRESIN,
        BCRYPT_SALT_ROUND: parseInt(process.env.BCRYPT_SALT_ROUND, 10),
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        CLIENT_SECRET: process.env.CLIENT_SECRET,
        CLIENT_ID: process.env.CLIENT_ID,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET,
        FRONTEND_URL: process.env.FRONTEND_URL
    };
};
exports.envVars = loadEnvVariables();

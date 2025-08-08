"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccTokenWithRfsToken = exports.createUserToken = void 0;
const config_1 = require("../config");
const user_interface_1 = require("../modules/user/user.interface");
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("./jwt");
const AppError_1 = require("../ErrorHelper/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// create user tokens
const createUserToken = (user) => {
    // jwt payload
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = jwt_1.jwtController.generateToken(jwtPayload, config_1.envVars.JWT_ACCESS_SECRET, config_1.envVars.JWT_ACCESS_EXPIRESIN);
    const refreshToken = jwt_1.jwtController.generateToken(jwtPayload, config_1.envVars.JWT_REFRESH_SECRET, config_1.envVars.JWT_REFRESH_EXPIRESIN);
    return {
        accessToken,
        refreshToken,
    };
};
exports.createUserToken = createUserToken;
// new accesToken with refresh token
const createAccTokenWithRfsToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyRefreshToken = jwt_1.jwtController.verifyToken(refreshToken, config_1.envVars.JWT_REFRESH_SECRET);
    const isUserExist = yield user_model_1.User.findOne({ email: verifyRefreshToken.email });
    if (!isUserExist) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User Does not exist");
    }
    if (isUserExist.isActive === user_interface_1.IsActive.BLOCKED ||
        isUserExist.isActive === user_interface_1.IsActive.INACTIVE) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User is blocked");
    }
    if (isUserExist.isDeleted) {
        throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User is Deleted");
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role,
    };
    const accestoken = jwt_1.jwtController.generateToken(jwtPayload, config_1.envVars.JWT_ACCESS_SECRET, config_1.envVars.JWT_ACCESS_EXPIRESIN);
    return accestoken;
});
exports.createAccTokenWithRfsToken = createAccTokenWithRfsToken;

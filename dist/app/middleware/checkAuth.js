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
exports.checkAuth = void 0;
const AppError_1 = require("../ErrorHelper/AppError");
const jwt_1 = require("../utils/jwt");
const config_1 = require("../config");
const user_interface_1 = require("../modules/user/user.interface");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_model_1 = require("../modules/user/user.model");
// checkauth higher order function
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const access_token = req.headers.authorization;
        if (!access_token) {
            throw new AppError_1.AppError(http_status_codes_1.default.NOT_FOUND, "token not found");
        }
        const verify_token = jwt_1.jwtController.verifyToken(access_token, config_1.envVars.JWT_ACCESS_SECRET);
        const isUserExist = yield user_model_1.User.findOne({ email: verify_token.email });
        if (!isUserExist) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User does not exist");
        }
        if (isUserExist.isActive === user_interface_1.IsActive.BLOCKED ||
            isUserExist.isActive === user_interface_1.IsActive.INACTIVE) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User is Blocked");
        }
        if (isUserExist.isDeleted) {
            throw new AppError_1.AppError(http_status_codes_1.default.BAD_REQUEST, "User is Deleted");
        }
        if (!authRoles.includes(verify_token.role)) {
            throw new AppError_1.AppError(http_status_codes_1.default.FORBIDDEN, "You have not Permit to access this route");
        }
        req.user_r = verify_token;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;

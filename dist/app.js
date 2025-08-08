"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const routes_1 = require("./app/routes");
const notFound_1 = require("./app/middleware/notFound");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./app/config");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
require("./app/config/passport");
exports.app = (0, express_1.default)();
exports.app.use((0, express_session_1.default)({
    secret: config_1.envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
exports.app.use(passport_1.default.initialize());
exports.app.use(passport_1.default.session());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use("/api/v1", routes_1.router);
// get route testing
exports.app.get("/", (req, res) => {
    res.status(http_status_codes_1.default.OK).json({
        succss: true,
        message: `Server is doing all right`
    });
});
//global error hanlder
exports.app.use(globalErrorHandler_1.globalErrorHandler);
exports.app.use(notFound_1.notFound);

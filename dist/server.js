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
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./app/config");
const app_1 = require("./app");
const seedAdmin_1 = require("./app/utils/seedAdmin");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.envVars.DB_URL);
        console.log("conneced successful to DB");
        // listening
        server = app_1.app.listen(config_1.envVars.PORT, () => {
            console.log(`Server is listening on ${config_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
// server call and auto seed admin
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield startServer();
    yield (0, seedAdmin_1.seedAdmin)();
}))();
// unhandle rejection 
process.on("unhandledRejection", () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    ;
    process.exit(1);
});
// uncaught acception
process.on("uncaughtException", () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    ;
    process.exit(1);
});
// sigterm 
process.on("SIGTERM", () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    ;
    process.exit(1);
});

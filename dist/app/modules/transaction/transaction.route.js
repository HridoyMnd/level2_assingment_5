"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const transaction_validation_1 = require("./transaction.validation");
const checkAuth_1 = require("../../middleware/checkAuth");
const user_interface_1 = require("../user/user.interface");
const router = (0, express_1.Router)();
router.post("/create_transaction", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.USER, user_interface_1.UserRole.AGENT), (0, validateRequest_1.validateRequest)(transaction_validation_1.createTransactionZodSchema), transaction_controller_1.transactionController.createTransactionC);
router.get("/all_transaction", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), transaction_controller_1.transactionController.getAllTransactionC);
router.get("/my_transaction", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.USER, user_interface_1.UserRole.AGENT), transaction_controller_1.transactionController.getMyTransactionC);
router.patch("/update/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(transaction_validation_1.updateTransactionZodSchema), transaction_controller_1.transactionController.updateTransactionC);
router.delete("/delete/:id", (0, checkAuth_1.checkAuth)(user_interface_1.UserRole.ADMIN), transaction_controller_1.transactionController.deleteTransactionC);
// export router
exports.transactionRoutes = router;

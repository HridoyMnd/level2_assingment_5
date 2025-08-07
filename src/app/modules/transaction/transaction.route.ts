import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createTransactionZodSchema, updateTransactionZodSchema } from "./transaction.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";


const router = Router();
router.post("/create_transaction", checkAuth(UserRole.USER, UserRole.AGENT), validateRequest(createTransactionZodSchema), transactionController.createTransactionC);
router.get("/all_transaction", checkAuth(UserRole.ADMIN), transactionController.getAllTransactionC);
router.get("/my_transaction", checkAuth(UserRole.USER, UserRole.AGENT), transactionController.getMyTransactionC);
router.post("/transaction_update/:id", checkAuth(UserRole.ADMIN), validateRequest(updateTransactionZodSchema), transactionController.updateTransactionC);




// export router
export const transactionRoutes = router;
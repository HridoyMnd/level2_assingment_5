import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createTransactionZodSchema } from "./transaction.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";


const router = Router();
router.post("/create_transaction", checkAuth(UserRole.USER, UserRole.AGENT), validateRequest(createTransactionZodSchema), transactionController.createTransactionC)



// export router
export const transactionRoutes = router;
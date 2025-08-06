import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createTransactionZodSchema } from "./transaction.validation";


const router = Router();
router.post("/create_transaction", validateRequest(createTransactionZodSchema), transactionController.createTransactionC)



// export router
export const transactionRoutes = router;
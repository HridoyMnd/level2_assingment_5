import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { WalletController } from "./wallet.controller";

const router = Router();

router.get("/all_wallet", checkAuth(UserRole.ADMIN), WalletController.getAllWalletC)




export const walletRoutes = router;
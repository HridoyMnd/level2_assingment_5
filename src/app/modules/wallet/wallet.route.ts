import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { WalletController } from "./wallet.controller";
import { updateWalletZodSchema } from "./wallet.validation";
import { validateRequest } from "../../middleware/validateRequest";
const router = Router();

router.get("/all_wallet", checkAuth(UserRole.ADMIN),WalletController.getAllWalletC);
router.get("/my_wallet", checkAuth(...Object.values(UserRole)), WalletController.getMyWalletC);
router.patch("/update/:id", checkAuth(...Object.values(UserRole)), validateRequest(updateWalletZodSchema), WalletController.updateWalletC
);
router.delete("/delete/:id", checkAuth(UserRole.ADMIN), WalletController.deleteWalletC);

export const walletRoutes = router;

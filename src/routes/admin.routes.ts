import { Router } from "express";
import { createAdmin, loginAdmin } from "../controllers/admin.controller";
import { validate } from "../middlewares/validator";
import { createAdminSchema, loginAdminSchema } from "../types/zodTypes";
const router = Router();

router.post("/register", validate(createAdminSchema), createAdmin);
router.post("/login", validate(loginAdminSchema), loginAdmin);

export default router;

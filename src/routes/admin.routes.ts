import { Router } from "express";
import {
  approveTeacher,
  createAdmin,
  loginAdmin,
} from "../controllers/admin.controller";
import { validate } from "../middlewares/validator";
import { createAdminSchema, loginAdminSchema } from "../types/zodTypes";
import { hasPermission } from "../middlewares/hasPermission";
const router = Router();

router.post("/register", validate(createAdminSchema), createAdmin);
router.post("/login", validate(loginAdminSchema), loginAdmin);
router.patch(
  "/teachers/:teacherId/approve",
  hasPermission("teacher", "can_update"),
  approveTeacher
);

export default router;

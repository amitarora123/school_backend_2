import { Router } from "express";
import {
  loginStudent,
  registerStudent,
} from "../controllers/student.controller";
import { validate } from "../middlewares/validator";
import { createStudentSchema } from "../types/zodTypes";
import { verifyAuth } from "../middlewares/authMiddleware";
import { hasPermission } from "../middlewares/hasPermission";

const router = Router();

router.post(
    "/register",
    validate(createStudentSchema),
    verifyAuth,
    hasPermission("teacher", "can_create"),
    registerStudent
);
router.post("/login", loginStudent);

export default router;

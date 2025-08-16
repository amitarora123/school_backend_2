import { Router } from "express";
import {
  loginTeacher,
  registerTeacher,
} from "../controllers/teacher.controller";
import { verifyAuth } from "../middlewares/authMiddleware";
import { hasPermission } from "../middlewares/hasPermission";
import { validate } from "../middlewares/validator";
import { createTeacherSchema } from "../types/zodTypes";

const router = Router();

router.post(
  "/register",
  validate(createTeacherSchema),
  verifyAuth,
  hasPermission("teacher", "can_create"),
  registerTeacher
);

router.post("/login", loginTeacher);



export default router;

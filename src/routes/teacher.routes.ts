import { Router } from "express";
import {
  loginTeacher,
  registerTeacher,
} from "../controllers/teacher.controller";

const router = Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);

export default router;

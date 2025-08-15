import { Router } from "express";
import { createSchool } from "../controllers/school.controller";
import { validate } from "../middlewares/validator.js";
import { createSchoolSchema } from "../types/zodTypes.js";
const router = Router();

router.post("/", validate(createSchoolSchema), createSchool);

export default router;

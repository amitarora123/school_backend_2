import { Router } from "express";
import { createSchool ,signup, login} from "../controllers/school.controller";
import { validate } from "../middlewares/validator.js";
import { createSchoolSchema   } from "../types/zodTypes.js";
const router = Router();

router.post("/", validate(createSchoolSchema), createSchool);
router.post("/signup",  signup);
router.post("/login", login);

export default router;

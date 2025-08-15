import { Router } from "express";
import { createPermission } from "../controllers/permission.controller";
import { validate } from "../middlewares/validator";
import { createPermissionSchema } from "../types/zodTypes";

const router = Router();

router.post("/", validate(createPermissionSchema), createPermission);

export default router;

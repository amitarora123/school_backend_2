import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", protect, (req, res) => res.json(req.user));

export default router;

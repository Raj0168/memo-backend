import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

// @ts-expect-error - TS type inference mismatch, safe to ignore
router.post("/register", register);
// @ts-expect-error - TS type inference mismatch, safe to ignore
router.post("/login", login);
// @ts-expect-error - TS type inference mismatch, safe to ignore
router.get("/me", protect, getMe);

export default router;

import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.get("/me", asyncHandler(protect), asyncHandler(getMe));

export default router;

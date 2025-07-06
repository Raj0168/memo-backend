import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller";

const router = Router();

router.use(asyncHandler(protect));

router.get("/", asyncHandler(getNotes));
router.post("/", asyncHandler(createNote));
router.get("/:id", asyncHandler(getNote));
router.put("/:id", asyncHandler(updateNote));
router.delete("/:id", asyncHandler(deleteNote));

export default router;

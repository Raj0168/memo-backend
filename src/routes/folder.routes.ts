import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  createFolder,
  deleteFolder,
  getFolders,
  updateFolder,
} from "../controllers/folder.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(asyncHandler(protect));

router.get("/", getFolders);
router.post("/", createFolder);
router.put("/:id", asyncHandler(updateFolder));
router.delete("/:id", asyncHandler(deleteFolder));

export default router;

import { Router } from "express";
import {
  deleteUser,
  followUnfollow,
  getSuggestedUsers,
  updateUser,
  userProfile,
} from "../controller/user.controller.js";
import { requireLogin } from "../middlewares/userMiddleware.js";

const router = Router();

router.put("/:id", requireLogin, updateUser);
router.put("/follow-unfollow/:id", requireLogin, followUnfollow);
router.delete("/:id", requireLogin, deleteUser);
router.get("/suggested-users", requireLogin, getSuggestedUsers);
router.get("/:username", requireLogin, userProfile);

export default router;

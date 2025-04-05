import { Router } from "express";
import {
  deleteAllNotifications,
  getNotifications,
} from "../controller/notification.controller.js";
import { requireLogin } from "../middlewares/userMiddleware.js";

const router = Router();

router.get("/", requireLogin, getNotifications);
router.delete("/", requireLogin, deleteAllNotifications);
export default router;

import { Router } from "express";
import { requireLogin } from "../middlewares/userMiddleware.js";
import {
  comment,
  createPost,
  deleteComment,
  deletePost,
  editPost,
  explore,
  getPosts,
  likeUnlikePost,
  singlePost,
} from "../controller/post.controller.js";

const router = Router();

router.get("/explore", requireLogin, explore);
router.put("/like-unlike/:id", requireLogin, likeUnlikePost);
router.delete("/delete/:id", requireLogin, deleteComment);

router.post("/", requireLogin, createPost);
router.post("/:id", requireLogin, comment);
router.put("/:id", requireLogin, editPost);
router.delete("/:id", requireLogin, deletePost);
router.get("/", requireLogin, getPosts);
router.get("/:id", requireLogin, singlePost);

export default router;

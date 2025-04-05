import Post from "../models/post.js";
import Notification from "../models/notification.js";
import User from "../models/user.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { caption } = req.body;
    let { postImage, postPublicId } = req.body;

    if (!caption && !postImage)
      return res
        .status(400)
        .json({ error: "The post needs to have atleast a caption!" });

    const newPost = new Post({
      user: userId,
      caption,
      postImage: postImage || "",
      postPublicId: postPublicId || "",
    });
    await newPost.save();
    await User.findByIdAndUpdate(userId, {
      $push: { posts: newPost._id },
    });
    return res.status(201).json({ message: "post created successfull" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(400).json({ error: "post not found!" });
    }
    if (existingPost.user._id === userId) {
      return res.status(400).json({ error: "You can only edit your post!" });
    }
    const editedPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "post updated successfully", editedPost });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const isPostExisting = await Post.findById(id);
    if (!isPostExisting) {
      return res.status(400).json({ error: "post not found!" });
    }

    if (isPostExisting.user.toString() !== userId) {
      return res.status(400).json({ error: "You can only delete your post." });
    }

    if (isPostExisting._doc.postPublicId) {
      try {
        const result = await cloudinary.uploader.destroy(
          isPostExisting.postPublicId
        );

        if (result.result === "ok") {
          console.log("Post image deleted from Cloudinary");
        } else {
          console.warn("Cloudinary delete not successful:", result);
        }
      } catch (err) {
        console.error("Cloudinary error:", err.message);
      }
    }

    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "-password");
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const singlePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("user", "-password")
      .populate("comments.user", [
        "username",
        "name",
        "profilePicture",
        "date",
      ]);

    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const comment = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const { comment } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ error: "post not found" });

    await Post.findByIdAndUpdate(postId, {
      $push: {
        comments: { user: userId, comment: comment },
      },
    });
    const notification = new Notification({
      notification: "commented on",
      from: userId,
      to: post.user._id,
    });

    await notification.save();
    return res.status(200).json("comment added");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong." });
  }
};

export const deleteComment = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;
  try {
    const comment = await Post.findOne({ "comments._id": id });
    if (!comment) return res.status(400).json({ error: "comment not found" });

    await Post.updateOne(
      { "comments._id": id },
      { $pull: { comments: { _id: id } } }
    );

    return res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong." });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUser = req.user._id;

    const postExists = await Post.findById(id);
    if (!postExists) {
      return res.status(400).json({ error: "post not found!" });
    }

    const isPostLiked = postExists.likes.includes(currentUser);

    if (isPostLiked) {
      await Post.findByIdAndUpdate(id, {
        $pull: { likes: currentUser },
      });

      return res.status(200).json({ message: "post unliked" });
    } else {
      const likedPost = await Post.findByIdAndUpdate(id, {
        $push: { likes: currentUser },
      });
      const notification = new Notification({
        notification: "liked",
        from: likedPost.user._id,
        to: currentUser,
      });

      await notification.save();
      return res.status(200).json({ message: "post liked" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong." });
  }
};

export const explore = async (req, res) => {
  const userId = req.user._id;
  try {
    const explorePosts = await Post.find({ likes: { $ne: userId } }).populate(
      "user",
      ["profilePicture", "username"]
    );
    return res.status(200).json(explorePosts);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong." });
  }
};

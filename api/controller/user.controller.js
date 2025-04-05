import User from "../models/user.js";
import Notification from "../models/notification.js";
import cloudinary from "../utils/cloudinary.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
export const updateUser = async (req, res) => {
  try {
    let password;
    const { id } = req.params;
    if (id !== req.user._id) {
      return res
        .status(400)
        .json({ error: "you can only update your account" });
    }

    // if (req.body.username) {
    //   const existingUser = await User.findOne({ username: req.body.username });
    //   if (existingUser && existingUser._doc._id !== req.user._id) {
    //     return res
    //       .status(400)
    //       .json({ error: "username already exists! try a different one." });
    //   }
    // }
    // if (req.body.password < 6) {
    //   return res
    //     .status(400)
    //     .json({ error: "password should not be less than 6 characters." });
    // }
    // if (req.body.password) {
    //   const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    //   password = hashedPassword;
    // }
    const user = await User.findById(id);

    if (req.body.profilePublicId) {
      try {
        const result = await cloudinary.uploader.destroy(user.profilePublicId);

        if (result.result === "ok") {
          console.log("Post image deleted from Cloudinary");
        } else {
          console.warn("Cloudinary delete not successful:", result);
        }
      } catch (err) {
        console.error("Cloudinary error:", err.message);
      }
    }
    if (req.body.coverPublicId) {
      try {
        const result = await cloudinary.uploader.destroy(user.coverPublicId);

        if (result.result === "ok") {
          console.log("Post image deleted from Cloudinary");
        } else {
          console.warn("Cloudinary delete not successful:", result);
        }
      } catch (err) {
        console.error("Cloudinary error:", err.message);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          name: req.body.name,
          password,
          profilePicture: req.body.profilePicture,
          profilePublicId: req.body.profilePublicId,
          coverPublicId: req.body.coverPublicId,
          bio: req.body.bio,
          coverImage: req.body.cover,
          location: req.body.location,
          website: req.body.website,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "user updated successfully", updatedUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.user._id) {
      return res
        .status(400)
        .json({ error: "You can only delete your account!" });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "account deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const followUnfollow = async (req, res) => {
  try {
    const currentUser = req.user._id;
    const userToFollow = req.params.id;

    if (currentUser === userToFollow) {
      return res
        .status(400)
        .json({ error: "you cannot follow or unfollow yourself" });
    }

    const user = await User.findById(userToFollow);
    if (!user) {
      return res.status(400).json({ error: "user not found" });
    }

    const following = user.followers.includes(currentUser);

    if (following) {
      await User.findByIdAndUpdate(
        userToFollow,
        {
          $pull: { followers: currentUser },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        currentUser,
        {
          $pull: { following: userToFollow },
        },
        { new: true }
      );

      return res.status(200).json({ message: "unfollowed" });
    } else {
      await User.findByIdAndUpdate(
        userToFollow,
        {
          $push: { followers: currentUser },
        },
        { new: true }
      );
      await User.findByIdAndUpdate(
        currentUser,
        {
          $push: { following: userToFollow },
        },
        { new: true }
      );
      const notification = new Notification({
        notification: "followed",
        from: userToFollow,
        to: currentUser,
      });

      await notification.save();
      return res.status(200).json({ message: "following" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).populate({
      path: "posts",
      options: { sort: { createdAt: -1 } },
    });
    if (!user) return res.status(400).json({ error: "user not found" });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    const currentUser = await User.findById(userId);
    if (!currentUser) return [];

    const suggestedUsers = await User.find({
      _id: { $nin: [...currentUser.following, userId] },
      following: { $nin: [userId] },
    }).select(["username", "profilePicture"]);

    return res.status(200).json({ suggestedUsers });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong." });
  }
};

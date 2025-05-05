import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { username, email, password, profilePicture, name } = req.body;

    if (!username || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Please fill all the required fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password should be 6 characters or more." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "user already exists! try a different username" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      name,
      password: hashedPassword,
      profilePicture:
        profilePicture ||
        "https://cdn-icons-png.flaticon.com/128/149/149071.png",
    });

    await newUser.save();

    const token = jwt.sign({ _id: newUser?._doc._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: userPassword, ...others } = newUser._doc;
    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "signup success", others });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong" });
  }
};

export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ error: "user does not exist!" });
    }

    const comparePassword = bcrypt.compareSync(password, existingUser.password);
    if (!comparePassword) {
      return res.status(400).json({ error: "wrong credentials!" });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password: userPassword, ...others } = existingUser._doc;

    return res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "signin success", others });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "something went wrong." });
  }
};

export const signout = (req, res) => {
  res
    .clearCookie("accessToken")
    .status(200)
    .json({ message: "logout successfully" });
};

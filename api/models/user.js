import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilePicture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  },
  profilePublicId: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  coverPublicId: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },

  location: {
    type: String,
    default: "",
  },

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const userModel = mongoose.model("User", userSchema);
export default userModel;

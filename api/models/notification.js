import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    notification: {
      type: String,
      enum: ["liked", "followed", "commented on"],
    },
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model("Notificaton", notificationSchema);
export default notificationModel;

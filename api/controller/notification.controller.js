import Notification from "../models/notification.js";
import User from "../models/user.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "user not found" });

    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .select(["notification", "createdAt"])
      .populate("from", "username profilePicture");

    const filteredNotifications = notifications.filter(
      (notification) => notification?.from?._id.toString() !== userId
    );
    return res.status(200).json(filteredNotifications);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong." });
  }
};

export const deleteAllNotifications = async (req, res) => {
  const userId = req.user._id;
  try {
    await Notification.deleteMany({ to: userId.toString() });
    return res.status(200).json({ message: "notifications deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something went wrong." });
  }
};

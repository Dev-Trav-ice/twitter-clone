import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "../Shared/Avatar";
import { Link } from "react-router-dom";
import Button from "../Shared/Button";
import moment from "moment";
import BackButton from "../Shared/BackButton";
import Loading from "../Shared/Loading";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/notification", {
        withCredentials: true,
      });
      setNotifications(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleDeleteNotifications = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.delete("/api/notification", {
        withCredentials: true,
      });
      setLoading(false);
      getNotifications();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <BackButton />
          <h1 className="text-xl font-bold">Notifications</h1>
        </div>
        {notifications.length > 0 && (
          <Button
            className={
              "px-4 py-2 w-fit bg-white rounded-xl text-xs hover:bg-white/80 transition-all text-black"
            }
            name="Delete All"
            loading={loading}
            onClick={handleDeleteNotifications}
          />
        )}
      </div>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div
            key={notification?._id}
            className="flex items-center gap-3 border-b border-[#2f2f30] p-4"
          >
            <div className="w-[30px] h-[30px] rounded-full border">
              <Avatar
                src={notification?.from?.profilePicture}
                to={`/${notification?.from?.username}`}
              />
            </div>
            <div>
              <h1 className="text-sm font-light">
                <Link
                  to={`/${notification?.from?.username}`}
                  className="text-gray-500 hover:underline"
                >
                  @{notification?.from?.username}{" "}
                </Link>
                {notification?.notification === "liked" ||
                notification?.notification === "commented on"
                  ? notification?.notification?.concat(" your post")
                  : notification?.notification?.concat(" you")}
              </h1>
              <span className="text-xs text-gray-600">
                {moment(notification?.createdAt).fromNow(true)} ago
              </span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm font-light">No Notifications</p>
      )}
    </div>
  );
}

export default Notifications;

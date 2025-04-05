import { useState } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";
import axios from "axios";

function Follow({ user, setFollowersCount }) {
  const { loggedUser } = useSelector((state) => state.user);

  const [isFollowing, setIsFollowing] = useState(
    user?.followers?.includes(loggedUser?._id)
  );

  const handleFollow = async (e) => {
    e.preventDefault();

    try {
      const newFollowState = !isFollowing;
      setIsFollowing(newFollowState);

      if (newFollowState) {
        setFollowersCount((prev) => prev + 1);
      } else {
        setFollowersCount((prev) => Math.max(prev - 1, 0));
      }
      const res = await axios.put(`/api/user/follow-unfollow/${user?._id}`);
      if (res.data) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Follow action failed:", error);
      setIsFollowing((prev) => !prev);
      setFollowersCount((prev) =>
        isFollowing ? prev + 1 : Math.max(prev - 1, 0)
      );
    }
  };

  return (
    <Button
      name={isFollowing ? "Following" : "Follow"}
      onClick={handleFollow}
      className="px-4 py-2 bg-white text-black font-bold rounded-full"
    />
  );
}

export default Follow;

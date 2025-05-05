import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CoverImage from "./CoverImage";
import Avatar from "../Shared/Avatar";
import UserPosts from "./UserPosts";
import Loading from "../Shared/Loading";
import Button from "../Shared/Button";
import EditProfileForm from "./EditProfileForm";
import Follow from "../Shared/Follow";
import BackButton from "../Shared/BackButton";

import { useSelector } from "react-redux";
import { BiWorld } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [toggleEditProfile, setToggleEditProfile] = useState(false);
  const [followersCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { username } = useParams();
  const { loggedUser } = useSelector((state) => state.user);

  const getUserProfile = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://twitter-clone-xntj.onrender.com/api/user/${username}`
      );
      setUser(res.data);
      setFollowerCount(res.data.followers?.length || 0);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile(username);
  }, [username]);

  if (loading || !user) {
    return <Loading />;
  }

  const isOwnProfile = loggedUser.username === user.username;
  const profileUser = isOwnProfile ? loggedUser : user;

  return (
    <div className="border-x border-[#2f2f30]">
      {/* Header */}
      <div className="flex items-center gap-6 pb-4 p-2">
        <BackButton />
        <div>
          <h1 className="text-xl font-semibold">{profileUser.username}</h1>
          <span className="text-sm text-[#5b5b5d]">
            {user.posts?.length || 0} posts
          </span>
        </div>
      </div>

      {/* Cover and Avatar */}
      <div className="relative mb-16">
        <div className="w-full h-[160px] md:h-[220px]">
          <CoverImage src={profileUser.coverImage} />
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="w-[100px] h-[100px] bg-white rounded-full border-2 border-black absolute -bottom-12 left-10">
            <Avatar src={profileUser.profilePicture} />
          </div>

          <div className="absolute right-4 -bottom-14">
            {isOwnProfile ? (
              <Button
                name="Edit Profile"
                className="px-4 py-1 bg-transparent border font-bold rounded-full"
                onClick={() => setToggleEditProfile(!toggleEditProfile)}
              />
            ) : (
              <Follow user={user} setFollowersCount={setFollowerCount} />
            )}
          </div>
        </div>

        {toggleEditProfile && (
          <EditProfileForm
            toggleEditProfile={toggleEditProfile}
            setToggleEditProfile={setToggleEditProfile}
          />
        )}
      </div>

      {/* Name, Bio, Website, Location */}
      <div className="px-6">
        <h1 className="text-3xl font-bold">{profileUser.name}</h1>
        <h6 className="-mt-1 text-[#5b5b5d]">@{profileUser.username}</h6>
      </div>

      <div className="px-6 py-3">
        <p className="tracking-tighter leading-5.5 mb-3">{profileUser.bio}</p>

        {user.website && (
          <div className="flex items-center gap-1 mb-3">
            <BiWorld className="text-gray-400 text-sm md:text-lg" />
            <a
              className="text-xs md:text-sm underline text-blue-500"
              href={user.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profileUser.website}
            </a>
          </div>
        )}

        {user.location && (
          <div className="flex items-center gap-1">
            <FaLocationDot className="text-gray-400" />
            <span className="text-xs md:text-sm">{profileUser.location}</span>
          </div>
        )}
      </div>

      {/* Follower/Following Count */}
      <div className="px-6 py-3 flex items-center gap-8 text-sm">
        <span className="text-[#5b5b5d]">
          <span className="text-white font-semibold text-lg">
            {user.following?.length || 0}
          </span>{" "}
          following
        </span>
        <span className="text-[#5b5b5d]">
          <span className="text-white font-semibold text-lg">
            {followersCount}
          </span>{" "}
          followers
        </span>
      </div>

      {/* Posts */}
      <div className="px-6 py-3 border-y border-[#2f2f30]">
        <UserPosts
          posts={user.posts}
          onDelete={() => getUserProfile(loggedUser.username)}
          user={user}
          loggedUser={loggedUser}
        />
      </div>
    </div>
  );
}

export default UserProfile;

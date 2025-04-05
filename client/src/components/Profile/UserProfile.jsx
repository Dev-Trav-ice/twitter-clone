import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CoverImage from "./CoverImage";
import Avatar from "../Shared/Avatar";
import UserPosts from "./UserPosts";
import Loading from "../Shared/Loading";
import { useSelector } from "react-redux";
import Button from "../Shared/Button";
import EditProfileForm from "./EditProfileForm";
import Follow from "../Shared/Follow";
import BackButton from "../Shared/BackButton";
import { BiWorld } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [toggleEditProfile, setToggleEditProfile] = useState(false);
  const [followersCount, setFollowerCount] = useState(user?.followers?.length);
  const [loading, setLoading] = useState(false);
  const { username } = useParams();
  const { loggedUser } = useSelector((state) => state.user);

  const getUserProfile = async (username) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/user/${username}`);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProfile(username);
  }, [username]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="border-x border-[#2f2f30]">
      <div className="flex items-center gap-6 pb-4 p-2">
        <BackButton />
        <div>
          <h1 className="text-xl font-semibold">
            {loggedUser.username === user?.username
              ? loggedUser.username
              : user?.username}
          </h1>
          <span className="text-sm text-[#5b5b5d]">
            {user?.posts?.length || 0} posts
          </span>
        </div>
      </div>
      <div className="relative mb-16">
        <div className="w-full h-[160px] md:h-[220px]">
          <CoverImage
            src={
              loggedUser.username === user?.username
                ? loggedUser?.coverImage
                : user?.coverImage
            }
          />
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="w-[100px] h-[100px] bg-white rounded-full border-3 border-black absolute -bottom-12 left-10">
            <Avatar
              src={
                loggedUser?.username === user?.username
                  ? loggedUser?.profilePicture
                  : user?.profilePicture
              }
            />
          </div>
          <div className="absolute right-4 -bottom-14">
            {loggedUser?.username === user?.username ? (
              <Button
                name={"Edit Profile"}
                className="px-4 py-1 bg-transparent border font-bold rounded-full"
                onClick={() => setToggleEditProfile(!toggleEditProfile)}
              />
            ) : (
              <Follow user={user} setFollowersCount={setFollowerCount} />
            )}
          </div>
        </div>
        <div>
          {toggleEditProfile && (
            <EditProfileForm
              toggleEditProfile={toggleEditProfile}
              setToggleEditProfile={setToggleEditProfile}
            />
          )}
        </div>
      </div>
      <div className="px-6">
        <h1 className="text-3xl font-bold">
          {loggedUser.username === user?.username
            ? loggedUser.name
            : user?.name}
        </h1>
        <h6 className="-mt-1 text-[#5b5b5d]">@{user?.username || ""}</h6>
      </div>
      <div className="px-6 py-3">
        <h2 className="tracking-tighter leading-5.5 mb-3">
          {loggedUser.username === user?.username ? loggedUser.bio : user?.bio}
        </h2>
        <div className="flex items-center gap-1 mb-3">
          {user?.website?.length > 0 && (
            <BiWorld className="text-gray-400 text-sm md:text-lg" />
          )}
          <a
            className="text-xs md:text-sm underline text-blue-500"
            href={`${user?.website}`}
            target="_blank"
          >
            {loggedUser.username === user?.username
              ? loggedUser.website
              : user?.website}
          </a>
        </div>
        <div className="flex items-center gap-1">
          {user?.location?.length > 0 && (
            <FaLocationDot className="text-gray-400" />
          )}
          <a
            className="text-xs md:text-sm"
            href={`${user?.website}`}
            target="_blank"
          >
            {loggedUser.username === user?.username
              ? loggedUser.location
              : user?.location}
          </a>
        </div>
      </div>
      <div className="px-6 py-3 flex items-center gap-8 text-sm">
        <span className="text-[#5b5b5d]">
          <span className="text-white font-semibold text-lg">
            {user?.following?.length}
          </span>{" "}
          following
        </span>
        <span className="text-[#5b5b5d]">
          <span className="text-white font-semibold text-lg">
            {followersCount || user?.followers?.length}
          </span>
          followers
        </span>
      </div>
      <div className="px-6 py-3 border-y border-[#2f2f30]">
        <UserPosts posts={user?.posts} user={user} loggedUser={loggedUser} />
      </div>
    </div>
  );
}

export default UserProfile;

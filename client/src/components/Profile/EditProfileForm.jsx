import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Shared/Input";
import Button from "../Shared/Button";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import {
  updateStart,
  updateUserFailure,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import toast from "react-hot-toast";
import FileUpload from "./FileUpload";

function EditProfileForm({ toggleEditProfile, setToggleEditProfile }) {
  const { loggedUser } = useSelector((state) => state?.user);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    profileImage && formData.append("profile", profileImage);
    coverImage && formData.append("cover", coverImage);
    if (!profileImage && !coverImage) return null;
    else {
      const res = await axios.post(
        "https://twitter-clone-xntj.onrender.com/api/upload/edit-profile",
        formData,
        {
          headers: { "Content-Type": "multipart-form-data" },
        }
      );
      return res.data;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    const profileData = (await handleFileUpload()) || {};
    const { profile, cover } = profileData ?? {};
    try {
      const res = await axios.put(
        `https://twitter-clone-xntj.onrender.com/api/user/${loggedUser?._id}`,
        {
          ...inputs,
          profilePicture: profile?.url || loggedUser.profilePicture,
          profilePublicId: profile?.publicId || loggedUser.profilePublicId,
          cover: cover?.url || loggedUser.coverImage,
          coverPublicId: cover?.publicId || loggedUser.coverPublicId,
        },
        { withCredentials: true }
      );

      dispatch(updateUserSuccess(res.data.updatedUser));
      setToggleEditProfile(() => !toggleEditProfile);
    } catch (error) {
      dispatch(updateUserFailure());
      toast.error(error);
    }
  };

  return (
    <div className="top-0 right-0 fixed left-0 bottom-0 z-10 bg-slate-500/50 md:flex md:items-center md:justify-center">
      {loading && <div className="w-full h-full fixed z-50 bg-white/30"></div>}
      <div className="w-full h-full md:w-[400px] lg:w-[500px] md:h-[450px] overflow-auto scrollbar lg:h-[550px] bg-black p-4 md:rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <IoClose
              className="text-xl cursor-pointer"
              onClick={() => setToggleEditProfile(!toggleEditProfile)}
            />
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          <Button
            name={"Save"}
            loading={loading}
            onClick={handleSubmit}
            type={"submit"}
            className="px-4 py-2 bg-white text-black font-bold rounded-full"
          />
        </div>

        <form className="py-4 flex flex-col gap-4">
          <FileUpload
            coverSrc={
              coverImage
                ? URL.createObjectURL(coverImage)
                : loggedUser?.coverImage
            }
            profileSrc={
              profileImage
                ? URL.createObjectURL(profileImage)
                : loggedUser?.profilePicture
            }
            setCoverImage={setCoverImage}
            setProfileImage={setProfileImage}
          />

          <div className="flex flex-col gap-1.5 mt-12">
            <label className="text-gray-500 text-sm">Name</label>
            <Input
              className={"p-4 border text-sm"}
              name={"name"}
              onChange={handleChange}
              placeholder={"name"}
              defaultValue={loggedUser?.name}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 text-sm" htmlFor="">
              Bio
            </label>
            <textarea
              className={"p-4 border text-sm focus:border-[#1DA1F2]"}
              placeholder="Bio"
              name={"bio"}
              onChange={handleChange}
              defaultValue={loggedUser?.bio}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 text-sm" htmlFor="">
              Location
            </label>
            <Input
              className={"p-4 border text-sm"}
              name={"location"}
              onChange={handleChange}
              placeholder={"location"}
              defaultValue={loggedUser?.location}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 text-sm" htmlFor="">
              Website
            </label>
            <Input
              className={"p-4 border text-sm"}
              name={"website"}
              onChange={handleChange}
              placeholder={"website"}
              defaultValue={loggedUser?.website}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;

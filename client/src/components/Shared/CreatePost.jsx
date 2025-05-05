import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import Input from "./Input";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import Button from "./Button";
import { useRef, useState } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";

function CreatePost({ onPost }) {
  const { loggedUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const fileRef = useRef(null);

  const handleFileUpload = async () => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "https://twitter-clone-xntj.onrender.com/api/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postImage = (await handleFileUpload()) || {};
    const { url, publicId } = postImage ?? {};
    try {
      await axios.post("/api/post", {
        caption,
        postImage: url,
        postPublicId: publicId,
      });
      setCaption("");
      setLoading(false);
      if (onPost) {
        onPost();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"px-6 twitter-border relative pt-3"}>
      {loading && (
        <div className="w-full h-full absolute top-0 left-0 z-10 bg-white/15 cursor-default flex items-center justify-center"></div>
      )}
      <div className="flex items-center gap-2">
        <div>
          <div className="bg-white w-[40px] h-[40px] rounded-full">
            <Avatar
              src={loggedUser?.profilePicture}
              to={`/${loggedUser?.username}`}
            />
          </div>
        </div>
        <textarea
          name="caption"
          placeholder="What is Happening?!"
          className="placeholder:text-lg p-4 w-full border-none outline-none"
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      {file && (
        <div className="flex items-center relative justify-center">
          <img
            src={URL.createObjectURL(file)}
            className="h-[200px] md:h-[300px] z-10 rounded-lg object-cover"
            alt=""
          />
          <span
            onClick={() => setFile(null)}
            className="absolute p-1.5 rounded-full border bg-black shadow-xl text-white font-bold text-sm md:text-lg top-2 right-6 md:right-22 lg:right-20 cursor-pointer"
          >
            <IoClose />
          </span>
        </div>
      )}
      <div className="py-3 flex items-center justify-between">
        <div className="flex items-center justify-around ml-12 gap-4 text-[#1DA1F2] text-[24px]">
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            hidden
          />
          <CiImageOn
            className="cursor-pointer"
            onClick={() => fileRef.current?.click()}
          />
          <MdOutlineGifBox />
          <MdOutlineEmojiEmotions />
        </div>
        <Button
          name={"post"}
          onClick={handleSubmit}
          loading={loading}
          disabled={loading}
          color={"black"}
          className={
            "px-4 py-1.5 text-black bg-white font-bold cursor-pointer rounded-full"
          }
        />
      </div>
    </div>
  );
}

export default CreatePost;

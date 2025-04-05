import axios from "axios";
import { useState } from "react";
import { BiRepost } from "react-icons/bi";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PostButtons({ commentsCount, post }) {
  const [likes, setLikes] = useState(post?.likes?.length || 0);
  const { loggedUser } = useSelector((state) => state.user);
  const [postIsLikedByMe, setPostIsLikedByMe] = useState(
    post?.likes?.includes(loggedUser?._id) || false
  );

  const handleLikeUnlike = async (e) => {
    e.preventDefault();
    try {
      setLikes((prev) => (postIsLikedByMe ? prev - 1 : prev + 1));
      setPostIsLikedByMe((prev) => !prev);
      await axios.put(`/api/post/like-unlike/${post?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-md text-[#71767b] flex items-center justify-start gap-24 md:gap-28 py-3 ">
      <div className="flex items-center gap-1">
        <Link to={`/status/${post?._id}`}>
          <FaRegComment />
        </Link>
        <span className="text-sm">{commentsCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <button className="cursor-pointer" onClick={handleLikeUnlike}>
          {postIsLikedByMe ? (
            <FaHeart className="text-pink-600" />
          ) : (
            <FaRegHeart />
          )}
        </button>
        <span className="text-sm">{likes}</span>
      </div>
      <div className="flex items-center gap-1">
        <button>
          <BiRepost className="text-xl" />
        </button>
        <span className="text-sm">0</span>
      </div>
    </div>
  );
}

export default PostButtons;

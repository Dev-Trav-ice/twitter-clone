import React from "react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import moment from "moment";
import PostButtons from "../Shared/PostButtons";
import Avatar from "../Shared/Avatar";

function SingleExplorePost({ explorePosts, commentCount, loggedUser }) {
  commentCount = explorePosts?.comments?.length;

  return (
    <div className="flex gap-2">
      <div>
        <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full">
          <Avatar
            src={explorePosts?.user?.profilePicture}
            to={`/${explorePosts?.user?.username}`}
          />
        </div>
      </div>

      <div className="w-full">
        <div>
          <div className="flex items-center w-full justify-between">
            <div className="space-x-2">
              <Link to={`/${explorePosts?.user?.username}`}>
                <span className="text-sm md:text-md  font-semibold hover:underline capitalize">
                  {explorePosts?.user?.name}
                </span>
              </Link>
              <Link to={`/${explorePosts?.user?.username}`}>
                <span className="text-sm text-[#71767b] hover:underline">
                  @{explorePosts?.user?.username}
                </span>
              </Link>
              <span className="text-sm text-[#71767b]">
                {moment(explorePosts?.createdAt).fromNow(true)}
              </span>
            </div>
            <div>
              {explorePosts?.user?._id === loggedUser._id && (
                <button>
                  <HiDotsHorizontal />
                </button>
              )}
            </div>
          </div>

          <Link to={`/status/${explorePosts?._id}`}>
            <div className="pt-1">
              <span className="text-sm md:text-md">
                {explorePosts?.caption}
              </span>
              {explorePosts?.postImage && (
                <div className="my-3 flex items-center justify-center border border-[#2f2f30] rounded-xl">
                  <img
                    src={explorePosts?.postImage}
                    className="max-w-full max-h-[500px] object-cover"
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </Link>

          <PostButtons commentsCount={commentCount} post={explorePosts} />
        </div>
      </div>
    </div>
  );
}

export default SingleExplorePost;

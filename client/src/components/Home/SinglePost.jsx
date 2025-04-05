import React from "react";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import moment from "moment";
import PostButtons from "../Shared/PostButtons";
import Avatar from "../Shared/Avatar";

function SinglePost({ post, commentCount, loggedUser }) {
  commentCount = post?.comments?.length;

  return (
    <div className="flex gap-2">
      <div>
        <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full">
          <Avatar
            src={post?.user?.profilePicture}
            to={`/${post?.user?.username}`}
          />
        </div>
      </div>

      <div className="w-full">
        <div>
          <div className="flex items-center w-full justify-between">
            <div className="space-x-2">
              <Link to={`/${post?.user?.username}`}>
                <span className="text-sm md:text-md  font-semibold hover:underline capitalize">
                  {post?.user?.name}
                </span>
              </Link>
              <Link to={`/${post?.user?.username}`}>
                <span className="text-sm text-[#71767b] hover:underline">
                  @{post?.user?.username}
                </span>
              </Link>
              <span className="text-sm text-[#71767b]">
                {moment(post?.createdAt).fromNow(true)}
              </span>
            </div>
            <div>
              {post?.user?._id === loggedUser._id && (
                <button>
                  <HiDotsHorizontal />
                </button>
              )}
            </div>
          </div>

          <Link to={`/status/${post?._id}`}>
            <div className="pt-1">
              <span className="text-sm md:text-md">{post?.caption}</span>
              {post?.postImage && (
                <div className="my-3 flex items-center justify-center border border-[#2f2f30] rounded-xl">
                  <img
                    src={post?.postImage}
                    className="max-w-full max-h-[500px] object-cover"
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </Link>

          <PostButtons commentsCount={commentCount} post={post} />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;

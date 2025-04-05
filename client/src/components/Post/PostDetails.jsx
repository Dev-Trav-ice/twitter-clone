import { Link } from "react-router-dom";
import moment from "moment";
import ReplyForm from "./ReplyForm";
import Replies from "./Replies";
import Avatar from "../Shared/Avatar";
import PostButtons from "../Shared/PostButtons";
import BackButton from "../Shared/BackButton";

function PostDetails({ post, getPost }) {
  return (
    <div className="p-4 ">
      <div className="flex items-center gap-6 pb-4 py-2">
        <BackButton />
        <h1 className="text-xl font-semibold">Post</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] bg-white rounded-full">
          <Avatar
            src={post?.user?.profilePicture}
            to={`/${post?.user?.username}`}
          />
        </div>
        <div className="flex flex-col">
          <Link to={`/${post?.user?.username}`}>
            <span className="text-md md:text-lg  font-semibold hover:underline capitalize">
              {post?.user?.name}
            </span>
          </Link>
          <Link to={`/profile/${post?.user?.username}`}>
            <span className="text-md text-[#71767b] hover:underline">
              @{post?.user?.username}
            </span>
          </Link>
        </div>
      </div>
      <div className="py-2">
        <span>{post?.caption}</span>
        {post?.postImage && (
          <div className="my-3 flex items-center justify-center border border-[#2f2f30] rounded-xl">
            <img
              src={post?.postImage}
              loading="lazy"
              className="max-w-full max-h-[500px] object-cover"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="py-3 text-sm text-[#57575b]">
        <span>
          {moment(post?.comments?.createdAt).format("hh:mm A · MMM D, YYYY")}
        </span>
      </div>
      <div className="border-y border-[#2f2f30]">
        <PostButtons commentsCount={post?.comments?.length} post={post} />
      </div>
      <div className="border-y border-[#2f2f30]">
        <ReplyForm postId={post?._id} onPost={getPost} />
      </div>
      <div>
        <Replies comments={post?.comments} onDelete={getPost} />
      </div>
    </div>
  );
}

export default PostDetails;

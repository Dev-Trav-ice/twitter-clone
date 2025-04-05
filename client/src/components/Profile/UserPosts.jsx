import { Link } from "react-router-dom";
import Avatar from "../Shared/Avatar";
import PostButtons from "../Shared/PostButtons";
import Delete from "../Shared/Delete";
import axios from "axios";

function UserPosts({ posts, user, loggedUser }) {
  const handleDeletePost = async (e, postId) => {
    e.preventDefault();
    const result = confirm("Are you sure you want to delete post?");

    if (!result) return;

    try {
      const res = await axios.delete(`/api/post/${postId}`);

      if (res.data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
    console.log(postId);
  };

  return (
    <div className="pb-4">
      {posts?.length > 0 &&
        posts.map((post) => (
          <div key={post?._id} className="p-2 border-b border-[#2f2f30]">
            <div className="flex gap-2">
              <div className="">
                <div className="w-[40px] h-[40px] rounded-full">
                  <Avatar src={user?.profilePicture} />
                </div>
              </div>
              <div className="w-full">
                <div className="flex w-full gap-1 relative">
                  <span className="text-sm md:text-md  font-semibold hover:underline capitalize">
                    {user?.name}
                  </span>
                  <span className="text-sm text-[#71767b] hover:underline">
                    @{user?.username}
                  </span>
                  <div>
                    {user?._id === loggedUser?._id && (
                      <div>
                        <div className="absolute top-4 right-0">
                          <Delete
                            onClick={(e) => handleDeletePost(e, post?._id)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <Link to={`/status/${post?._id}`}>
                  <span className="text-sm md:text-md w-full">
                    {post?.caption}
                  </span>
                  {post?.postImage && (
                    <div className="my-3 flex w-fullitems-center justify-center border border-[#2f2f30] rounded-xl">
                      <img
                        src={post?.postImage}
                        className="max-w-full max-h-[500px] object-cover"
                        alt="post"
                        srcSet={`${post?.postImage} 400w, ${post?.postImage} 800w`}
                        sizes="(max-width: 600px) 400px, 800px"
                        loading="lazy"
                      />
                    </div>
                  )}
                </Link>
                <div>
                  <PostButtons
                    post={post}
                    commentsCount={post?.comments?.length}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserPosts;

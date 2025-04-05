import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Avatar from "../Shared/Avatar";
import Delete from "../Shared/Delete";
import { useSelector } from "react-redux";
import axios from "axios";

function Replies({ comments, onDelete }) {
  const { loggedUser } = useSelector((state) => state.user);

  const deleteReply = async (e, commentId) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`/api/post/delete/${commentId}`);
      console.log(res.data);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-4">
      {comments?.length > 0 &&
        comments?.map((comment) => (
          <div key={comment?._id} className="border-b py-4 border-[#2f2f30]">
            <div className="flex gap-2">
              <div>
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full">
                  <Avatar
                    src={comment?.user?.profilePicture}
                    to={`/${comment?.user?.username}`}
                  />
                </div>
              </div>
              <div className="flex items-center flex-col md:flex-row md:gap-2">
                <Link to={`/${comment?.user?.username}`}>
                  <span className="text-sm md:text-md  font-semibold hover:underline capitalize">
                    {comment?.user?.name}
                  </span>
                </Link>
                <div className="flex items-center gap-2">
                  <Link to={`/${comment?.user?.username}`}>
                    <span className="text-sm text-[#71767b] hover:underline">
                      @{comment?.user?.username}
                    </span>
                  </Link>
                  <span className="text-sm text-[#71767b]">
                    {moment(comment?.user?.date).fromNow(true)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="pl-14">
                <span className="text-sm md:text-md ">{comment?.comment}</span>
              </div>
              {comment?.user?._id === loggedUser?._id && (
                <Delete onClick={(e) => deleteReply(e, comment?._id)} />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default Replies;

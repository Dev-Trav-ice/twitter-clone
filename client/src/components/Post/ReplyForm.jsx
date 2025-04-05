import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import Avatar from "../Shared/Avatar";
import Button from "../Shared/Button";
function Reply({ postId, onPost }) {
  const { loggedUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post(`/api/post/${postId}`, { comment });
      setLoading(false);
      if (onPost) {
        onPost();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-4 p-3">
        <div>
          <div className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] bg-white rounded-full">
            <Avatar
              src={loggedUser?.profilePicture}
              to={`/${loggedUser?.username}`}
            />
          </div>
        </div>
        <textarea
          className="w-full placeholder:text-lg border-none oultine-none pt-4 px-1"
          placeholder="Post your reply"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button
        name={"reply"}
        className={
          "px-3 py-1.5 text-black bg-white font-bold cursor-pointer rounded-full"
        }
        onClick={handleSubmitComment}
        loading={loading}
      />
    </div>
  );
}

export default Reply;

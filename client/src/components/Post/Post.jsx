import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostDetails from "./PostDetails";
import Loading from "../Shared/Loading";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPost = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://twitter-clone-xntj.onrender.com/api/post/${id}`
      );
      setPost(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="twitter-border">
      <PostDetails
        post={{ ...post }}
        getPost={() => {
          getPost(id);
        }}
      />
    </div>
  );
}

export default Post;

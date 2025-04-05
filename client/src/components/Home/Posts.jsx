import { useEffect, useState } from "react";
import axios from "axios";
import SinglePost from "./SinglePost";
import CreatePost from "../Shared/CreatePost";
import Loading from "../Shared/Loading";
import { useSelector } from "react-redux";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("api/post");
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <CreatePost
        onPost={() => {
          getPosts();
        }}
      />
      <div>
        {posts?.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="twitter-border px-4 py-2">
              <SinglePost post={{ ...post }} loggedUser={loggedUser} />
            </div>
          ))
        ) : (
          <p className="text-center text-sm font-light">No Posts Yet</p>
        )}
      </div>
    </div>
  );
}

export default Posts;

import axios from "axios";
import { useEffect, useState } from "react";
import SingleExplorePost from "./SingleExplorePost";
import Loading from "../Shared/Loading";
import { useSelector } from "react-redux";
import BackButton from "../Shared/BackButton";

function Explore() {
  const [explorePosts, setExplorePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedUser } = useSelector((state) => state.user);

  useEffect(() => {
    getExplorePosts();
  }, []);

  const getExplorePosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/post/explore", {
        withCredentials: true,
      });
      setExplorePosts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 p-4">
        <BackButton />
        <h1 className="text-xl font-bold">Explore</h1>
      </div>
      {explorePosts?.length > 0 ? (
        explorePosts?.map((explorePost) => (
          <div key={explorePost?._id} className="twitter-border px-4 py-2">
            <SingleExplorePost
              explorePosts={{ ...explorePost }}
              loggedUser={loggedUser}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-sm font-light">No Posts Yet</p>
      )}
    </div>
  );
}

export default Explore;

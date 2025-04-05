import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Follow from "./Follow";

function SuggestedUsers() {
  const [suggestions, setSuggestions] = useState([]);
  const [followersCount, setFollowerCount] = useState(
    suggestions?.map((suggestion) => suggestion?.followers?.length)
  );
  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = async () => {
    try {
      const res = await axios.get("api/user/suggested-users");
      setSuggestions(res.data.suggestedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 border border-[#2f2f30] rounded-xl h-[350px] scrollbar overflow-auto">
      <h1 className="text-xl font-bold mb-6">Who to Follow</h1>

      {suggestions?.length > 0 &&
        suggestions?.map((suggestion) => (
          <div
            key={suggestion._id}
            className="flex items-center justify-between mb-7"
          >
            <div className="flex items-center gap-2">
              <div className="w-[40px] h-[40px] rounded-full">
                <Avatar
                  to={`/${suggestion?.username}`}
                  src={suggestion?.profilePicture}
                />
              </div>
              <span className="text-sm">{suggestion?.username}</span>
            </div>
            <div className="text-sm">
              <Follow
                user={suggestion}
                setFollowersCount={setFollowerCount}
                followersCount={followersCount}
                refresh={getSuggestions}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default SuggestedUsers;

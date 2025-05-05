import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/xlogo.webp";
import { MdHomeFilled } from "react-icons/md";
import { FaRegBell, FaRegUser, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { signOut } from "../../redux/user/userSlice";

function Navbar() {
  const { loggedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://twitter-clone-xntj.onrender.com/api/auth/signout"
      );
      dispatch(signOut());
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center justify-between flex-col fixed top-0 w-[100px] lg:w-[140px] border-r border-[#2f2f30] h-screen pt-2 pb-8">
        <div className="flex flex-col items-center gap-4">
          <Link to="/">
            <img className="w-[45px] h-[45px] object-cover" src={logo} alt="" />
          </Link>
          <div className="text-white flex flex-col gap-4 text-[24px]">
            <Link
              className="p-2 flex items-center gap-1  rounded-full hover:bg-white/10"
              to="/"
            >
              <MdHomeFilled />
              <span className="hidden lg:block text-sm">Home</span>
            </Link>
            <Link
              to={"/explore"}
              className="p-2 flex items-center gap-1  rounded-full hover:bg-white/10"
            >
              <FaSearch />
              <span className="hidden lg:block text-sm">Explore</span>
            </Link>
            <Link
              to={"/notifications"}
              className="p-2 flex items-center gap-1  rounded-full hover:bg-white/10"
            >
              <FaRegBell />

              <span className="hidden lg:block text-sm">Notifications</span>
            </Link>
            <Link
              to={`/${loggedUser?.username}`}
              className="p-2 flex items-center gap-1 rounded-full hover:bg-white/10"
            >
              <FaRegUser />
              <span className="hidden lg:block text-sm">Profile</span>
            </Link>
          </div>
        </div>
        <div className="relative">
          {toggle && (
            <div className="hidden md:block absolute border shadow-lg rounded-xl p-4 -top-17 -left-8 w-[200px] bg-black text-white z-10">
              <button
                onClick={handleLogout}
                className="text-sm font-bold cursor-pointer"
              >
                Log out @{loggedUser?.username}
              </button>
            </div>
          )}
          <button
            onClick={() => setToggle(!toggle)}
            className="bg-white w-[40px] h-[40px] rounded-full"
          >
            <img
              src={loggedUser?.profilePicture}
              className="w-full h-full rounded-full cursor-pointer object-cover"
              alt=""
            />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden bg-black z-10 flex items-center text-2xl justify-around -mb-0.5 pt-3 px-4 fixed bottom-0 w-full">
        <Link className="p-2 rounded-full hover:bg-white/10" to="/">
          <MdHomeFilled />
        </Link>
        <Link to={"/explore"} className="p-2 rounded-full hover:bg-white/10">
          <FaSearch />
        </Link>
        <Link
          to={"/notifications"}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <FaRegBell />
        </Link>
        <Link
          to={`/${loggedUser?.username}`}
          className="p-2 rounded-full hover:bg-white/10"
        >
          <FaRegUser />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

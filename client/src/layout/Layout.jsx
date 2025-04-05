import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Shared/Navbar";
import SuggestedUsers from "../components/Shared/SuggestedUsers";

function Layout() {
  const { loggedUser } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      {loggedUser ? (
        <div className="md:ml-[100px] lg:ml-[140px] flex items-center justify-start">
          <div className="w-full lg:w-2/3 overflow-auto scrollbar h-screen pb-9">
            <Outlet />
          </div>
          <div className="hidden lg:block h-screen lg:w-1/3 overflow-auto p-4">
            <SuggestedUsers />
          </div>
        </div>
      ) : (
        <Navigate to={"/signin"} replace />
      )}
    </>
  );
}

export default Layout;

import {
  createBrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationPage";
import ExplorePage from "./pages/ExplorePage";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-center" />
    </>
  );
}

const router = Router([
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/status/:id",
        element: <PostPage />,
      },
      {
        path: `/:username`,
        element: <ProfilePage />,
      },
      {
        path: "/notifications",
        element: <NotificationPage />,
      },
      { path: "/explore", element: <ExplorePage /> },
    ],
  },
]);

export default App;

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Post from "./components/Post";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Users from "./pages/Users";
import UsersPosts from "./pages/UsersPosts";
// import ErrorPage from "./pages/ErrorPage";
import axios from "axios";

axios.defaults.withCredentials = true;

const Root = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/posts/:page?",
            element: <Home />,
          },
        ],
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/post/:id",
        element: <Post />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile/:id",
            element: <Profile />,
          },
          {
            path: "/create",
            element: <CreatePost />,
          },
          {
            path: "/favorites",
            element: <Favorites />,
          },
          {
            path: "/user/posts/:id",
            element: <UsersPosts />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

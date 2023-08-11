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
import Blogs from "./pages/Blogs";

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
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/posts",
        element: <Blogs />,
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

import { Link, useLocation } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { setLogout } from "../state/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/config";
import { PiUserCircleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      if (!user) return;
      await axios.post(API_URL + "/auth/logout", {}, { withCredentials: true });
      dispatch(setLogout());
    } catch (error) {
      console.log(error);
    }
  };
  const profilePage = () => {
    navigate(`/profile/${user._id}`);
  };
  return (
    <nav className="w-full px-4 py-6 flex items-center justify-between container mx-auto relative">
      <h1 className="logo text-4xl md:text-5xl">
        <Link className="block md:hidden" to="/">
          TP
        </Link>
        <Link className="hidden md:block" to="/">
          TechPunch
        </Link>
      </h1>
      <div className="hidden nav:flex gap-5 items-center lg:text-lg absolute w-fit left-[50%] right-[50%] translate-x-[-50%] xs:-ml-12 md:ml-8 lg:ml-0">
        <ul className="flex gap-2 lg:gap-5 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          {!!user && (
            <li className="w-max">
              <Link className="font-bold" to="/create">
                Create Blog
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div>
        {location.pathname !== "/signin" &&
          location.pathname !== "/signup" &&
          !user && (
            <div className="relative">
              <Link
                to="signin"
                className="px-4 py-2 bg-blue-400 rounded-full text-white"
              >
                Sign in
              </Link>
              <span className="text-gray-600 block mt-4 w-[140px] sm:w-auto absolute">
                (Sign in to create a blog post)
              </span>
            </div>
          )}
        {!!user && (
          <div className="flex items-center gap-3">
            <div className="group relative">
              <PiUserCircleLight
                size={40}
                onClick={profilePage}
                className="cursor-pointer"
              />
              <ul className="absolute hidden group-hover:block bg-blue-400 p-2 rounded-xl mt-2 text-white">
                <li>{user.username}</li>
                <li>{user.email}</li>
                {user.role === "admin" && <li>role - Admin</li>}
              </ul>
            </div>
            <Link
              onClick={handleLogout}
              to="/"
              className="px-4 py-2 bg-red-400 rounded-full text-white text-center"
            >
              Sign out
            </Link>
          </div>
        )}
      </div>
      <TbMenu2 className="block nav:hidden text-4xl" />
    </nav>
  );
};
export default Navbar;

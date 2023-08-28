import { Link, useLocation } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { setLogout } from "../state/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URL } from "../utils/config";
import { PiUserCircleLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiArrowUp } from "react-icons/hi";
import { clearSearchResults } from "../state/searchSlice";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [offset, setOffset] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
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
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const clearSearch = () => {
    dispatch(clearSearchResults());
  };
  return (
    <>
      <nav className="w-full px-4 py-6 flex items-center justify-between container mx-auto relative">
        <h1 className="logo text-4xl md:text-5xl mb-0">
          <Link className="block lg:hidden" to="/" onClick={clearSearch}>
            TP
          </Link>
          <Link className="hidden lg:block" to="/" onClick={clearSearch}>
            TechPunch
          </Link>
        </h1>
        <div className="hidden nav:flex gap-5 items-center lg:text-lg absolute w-fit left-[50%] right-[50%] translate-x-[-50%] xs:-ml-12 md:mr-2 lg:ml-0">
          <ul className="flex gap-2 lg:gap-5 items-center">
            <li>
              <Link to="/" onClick={clearSearch}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {!!user && (
              <>
                <li className="w-max">
                  <Link to={`/user/posts/${user._id}`}>Your Posts</Link>
                </li>
                <li>
                  <Link to="/favorites">Favorites</Link>
                </li>
                <li className="w-max">
                  <Link className="font-bold" to="/create">
                    Create Blog
                  </Link>
                </li>
              </>
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
                <span className="text-gray-500/95 block mt-4 w-[140px] sm:w-auto absolute text-sm">
                  (Sign in to create a blog post)
                </span>
              </div>
            )}
          {!!user && (
            <div className="flex items-center gap-3">
              <div className="group relative">
                {!user.profilePic ? (
                  <PiUserCircleLight
                    size={40}
                    onClick={profilePage}
                    className="cursor-pointer"
                  />
                ) : (
                  <img
                    src={user.profilePic}
                    alt="profile image"
                    className="rounded-full h-10 w-10 object-cover cursor-pointer ring-1 ring-black"
                    onClick={profilePage}
                  />
                )}
                <ul className="absolute hidden group-hover:block bg-blue-400 p-2 rounded-xl mt-2 text-white -left-8">
                  <li>{user.username}</li>
                  <li>{user.email}</li>
                  {user.role === "admin" && <li>role - Admin</li>}
                </ul>
              </div>
              <Link
                onClick={handleLogout}
                to="/"
                className="px-4 py-2 bg-red-400 rounded-full text-white text-center text-sm md:text-lg"
              >
                Sign out
              </Link>
            </div>
          )}
        </div>
        {!showMenu && (
          <TbMenu2
            className="block nav:hidden text-4xl z-10"
            onClick={() => setShowMenu(true)}
          />
        )}
        {!showMenu && offset > 200 && (
          <div className="w-7 h-7 fixed right-2 top-2 xl:right-4 xl:top-4 z-10 cursor-pointer">
            <HiArrowUp
              className="z-10 ring-2 ring-blue-400 rounded-full p-1 bg-white"
              size={28}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            />
          </div>
        )}
      </nav>
      {showMenu && (
        <div className="fixed inset-0 w-screen min-h-screen bg-black/90 flex flex-col items-center justify-center nav:hidden z-10 text-white text-3xl">
          <div className="absolute top-1 right-1 z-20">
            <AiOutlineClose
              className="text-4xl"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <div className="flex flex-col items-center">
            <ul className="flex flex-col gap-6 items-center">
              <li>
                <Link to="/" onClick={() => setShowMenu(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setShowMenu(false)}>
                  About
                </Link>
              </li>
              {!!user && (
                <>
                  <li className="w-max">
                    <Link
                      to={`/user/posts/${user._id}`}
                      onClick={() => setShowMenu(false)}
                    >
                      Your Posts
                    </Link>
                  </li>
                  <li>
                    <Link to="/favorites" onClick={() => setShowMenu(false)}>
                      Favorites
                    </Link>
                  </li>
                  <li className="w-max" onClick={() => setShowMenu(false)}>
                    <Link className="font-bold" to="/create">
                      Create Blog
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div>
            {location.pathname !== "/signin" &&
              location.pathname !== "/signup" &&
              !user && (
                <div className="flex flex-col mt-14 items-center gap-3">
                  <Link
                    to="signin"
                    className="px-4 py-2 bg-blue-400 rounded-full text-white"
                    onClick={() => setShowMenu(false)}
                  >
                    Sign in
                  </Link>
                </div>
              )}
            {!!user && (
              <div className="flex flex-col mt-14 items-center gap-3">
                <div className="flex items-center gap-4">
                  <PiUserCircleLight
                    size={40}
                    onClick={() => {
                      profilePage();
                      setShowMenu(false);
                    }}
                    className="cursor-pointer"
                  />
                  <ul className="bg-blue-400 p-2 rounded-xl mt-2 text-white text-base">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    {user.role === "admin" && <li>role - Admin</li>}
                  </ul>
                </div>
                <Link
                  onClick={() => {
                    handleLogout();
                    setShowMenu(false);
                  }}
                  to="/"
                  className="px-4 py-2 bg-red-400 rounded-full text-white text-center text-sm mt-4"
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;

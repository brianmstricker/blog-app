import { Link, useLocation } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  return (
    <nav className="w-full px-4 py-6 flex items-center justify-between container mx-auto">
      <h1 className="logo text-4xl md:text-5xl">
        <Link to="/">blog</Link>
      </h1>
      <div className="hidden xs:flex gap-5 items-center md:text-lg">
        <ul className="flex gap-5 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {!!user && (
            <li>
              <Link to="/create">Creat Post</Link>
            </li>
          )}
        </ul>
      </div>
      <div>
        {location.pathname !== "/signin" &&
          location.pathname !== "/signup" &&
          !user && (
            <Link to="signin" className="px-4 py-2 bg-blue-400 rounded-full">
              Sign in
            </Link>
          )}
        {!!user && (
          <Link to="signin" className="px-4 py-2 bg-red-400 rounded-full">
            Sign out
          </Link>
        )}
      </div>
      <TbMenu2 className="block xs:hidden text-4xl" />
    </nav>
  );
};
export default Navbar;

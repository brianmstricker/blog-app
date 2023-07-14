import { Link } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Create Post", path: "/create" },
];
const Navbar = () => {
  return (
    <nav className="w-full p-4 py-6 lg:px-24 flex items-center justify-between">
      <div>
        <h1 className="logo text-5xl">
          <Link to="/">blog</Link>
        </h1>
      </div>
      <div className="flex gap-5 items-center text-lg">
        <ul className="flex gap-5 items-center">
          {links.map((link) => (
            <Link key={link.name} to={link.path}>
              {link.name}
            </Link>
          ))}
        </ul>
        <Link to="signin" className="px-4 py-2 bg-blue-400 rounded-xl">
          Sign in
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;

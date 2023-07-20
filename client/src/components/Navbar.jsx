import { Link } from "react-router-dom";
import { TbMenu2 } from "react-icons/tb";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Create Post", path: "/create" },
];
const Navbar = () => {
  return (
    <nav className="w-full p-4 py-6 flex items-center justify-between container mx-auto">
      <h1 className="logo text-4xl md:text-5xl">
        <Link to="/">blog</Link>
      </h1>
      <div className="hidden xs:flex gap-5 items-center md:text-lg">
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
      <TbMenu2 className="block xs:hidden text-4xl" />
    </nav>
  );
};
export default Navbar;

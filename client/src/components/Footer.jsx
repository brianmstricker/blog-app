import { Link } from "react-router-dom";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <footer className="container mx-auto py-12 nav:px-8 pt-16">
      <div className="flex flex-col nav:flex-row nav:justify-between mx-auto items-center">
        <div className="flex gap-4 xl:gap-6">
          <Link to="/about">
            <h6 className="font-bold text-lg">About</h6>
          </Link>
          {user && (
            <Link to={`/posts/${user._id}`}>
              <h6 className="font-bold text-lg w-max">Your Posts</h6>
            </Link>
          )}
          <div>
            <Link to="/users">
              <h6 className="font-bold text-lg">Users</h6>
            </Link>
          </div>
        </div>
        <div className="mt-8 nav:mt-0 flex justify-between nav:justify-end w-[230px] xs:gap-4">
          <Link to="https://www.twitter.com" target="_blank">
            <BsTwitter className="text-[32px] fill-blue-400" />
          </Link>
          <Link to="https://www.facebook.com" target="_blank">
            <ImFacebook2 className="text-[32px] fill-blue-600" />
          </Link>
          <Link to="https://www.github.com/brianmstricker" target="_blank">
            <BsGithub className="text-[32px] fill-slate-700" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

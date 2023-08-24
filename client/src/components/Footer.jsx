import { Link } from "react-router-dom";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { ImFacebook2 } from "react-icons/im";

const Footer = () => {
  return (
    <footer className="container mx-auto py-12 nav:px-8">
      <div className="flex flex-col nav:flex-row nav:justify-between mx-auto items-center">
        <div className="flex xl:gap-12 gap-4">
          <Link to="/about">
            <h6 className="font-bold text-lg">About</h6>
          </Link>
          {/* <div>
            <h6 className="font-bold text-lg w-max">View All Posts</h6>
          </div> */}
          <div>
            <Link to="/users">
              <h6 className="font-bold text-lg">Users</h6>
            </Link>
          </div>
        </div>
        <div className="mt-8 nav:mt-0 flex gap-3">
          <Link to="https://www.twitter.com" target="_blank">
            <BsTwitter className="text-2xl fill-blue-400" />
          </Link>
          <Link to="https://www.facebook.com" target="_blank">
            <ImFacebook2 className="text-2xl fill-blue-600" />
          </Link>
          <Link to="https://www.github.com/brianmstricker" target="_blank">
            <BsGithub className="text-2xl fill-slate-700" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

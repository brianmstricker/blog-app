import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container mx-auto py-12 nav:px-8">
      <div className="flex flex-col nav:flex-row nav:justify-between mx-auto items-center">
        <div className="flex xl:gap-12 gap-4">
          <Link to="/about">
            <h6 className="font-bold text-lg">About</h6>
          </Link>
          <div>
            <h6 className="font-bold text-lg w-max">View All Posts</h6>
          </div>
          <div>
            <h6 className="font-bold text-lg">Users</h6>
          </div>
        </div>
        <div className="mt-8 nav:mt-0">social links</div>
      </div>
    </footer>
  );
};
export default Footer;

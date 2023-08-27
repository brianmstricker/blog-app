import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { TfiBackRight } from "react-icons/tfi";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow flex-col justify-center items-center mb-64">
        <h2 className="text-5xl text-center">Page Not Found</h2>
        <Link
          to="/"
          className="bg-blue-400 text-white mt-6 flex text-3xl items-center p-4 rounded-xl hover:bg-blue-600 transition-all duration-300"
        >
          <TfiBackRight className="" size={24} />
          <p>Go Home</p>
        </Link>
      </div>
    </div>
  );
};
export default ErrorPage;

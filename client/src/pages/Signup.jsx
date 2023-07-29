import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  return (
    <>
      <form className="container rounded-xl mx-auto bg-gray-200 mt-4 flex flex-col px-4 py-10">
        <h1 className="text-center text-5xl mt-10 font-bold">
          Create an account!
        </h1>
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-8 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className="text-white px-6 py-3 bg-blue-400 w-fit mx-auto rounded-full mt-4"
          type="submit"
        >
          Create account
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link className="text-blue-400" to="/signin">
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
};
export default Signup;

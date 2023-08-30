import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../state/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [prevUserState, setPrevUserState] = useState({ ...user });
  const alreadyLoggedIn = useSelector((state) => state.user.user);
  useEffect(() => {
    if (alreadyLoggedIn) navigate("/");
  }, [alreadyLoggedIn, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPrevUserState({ ...user });
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login",
        user,
        {
          withCredentials: true,
        }
      );
      if (res.data.error) return alert(res.data.error);
      dispatch(setLogin(res.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast(error.response.data || error.message, {
        type: "error",
        position: "top-center",
      });
    }
  };
  const buttonDisabled = () => {
    if (user.username === "" || user.password === "") return true;
    if (JSON.stringify(prevUserState) === JSON.stringify(user)) return true;
    return false;
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container rounded-xl mx-auto bg-gray-200 mt-4 flex flex-col px-4 py-10"
      >
        <h1 className="text-center text-5xl mt-10 font-bold mb-0">
          Sign in to create a blog!
        </h1>
        <input
          className="rounded-xl px-4 py-2 w-4/5 lg:w-1/3 mx-auto mt-8 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          className="rounded-xl px-4 py-2 w-4/5 lg:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button
          className={
            "text-white px-6 py-3 bg-blue-400 w-fit mx-auto rounded-full mt-4" +
            (buttonDisabled() ? " opacity-40 cursor-not-allowed" : "")
          }
          type="submit"
          disabled={buttonDisabled()}
        >
          Sign in
        </button>
        <p className="text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-400" to="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </>
  );
};
export default Signin;

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/config";
import { setLogin } from "../state/userSlice";
import { toast } from "react-toastify";
import { userValidation } from "../validations/userValidation";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState(null);
  const [prevUserState, setPrevUserState] = useState({ ...user });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrevUserState({ ...user });
    const validate = await userValidation
      .validate(user, { abortEarly: false })
      .catch((err) => {
        const fieldErrors = {};
        err.inner.forEach((error) => {
          fieldErrors[error.path] = error.message;
        });
        setFormErrors(fieldErrors);
        return false;
      });
    if (!validate) return;
    try {
      const res = await axios.post(API_URL + "/auth/register", user, {
        withCredentials: true,
      });
      if (res.data.error) return alert(res.data.error);
      dispatch(setLogin({ user: res.data.user }));
      navigate("/");
    } catch (error) {
      toast(error.response.data || error.message, {
        type: "error",
        position: "top-center",
      });
    }
  };
  const buttonDisabled = () => {
    if (
      user.name === "" ||
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      return true;
    }
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
          Create an account!
        </h1>
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-8 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          required
        />
        {formErrors?.name && (
          <p className="text-red-500 ml-4 mt-1 text-center">
            {formErrors.name}
          </p>
        )}
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        {formErrors?.username && (
          <p className="text-red-500 ml-4 mt-1 text-center">
            {formErrors.username}
          </p>
        )}
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        {formErrors?.email && (
          <p className="text-red-500 ml-4 mt-1 text-center">
            {formErrors.email}
          </p>
        )}
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        {formErrors?.password && (
          <p className="text-red-500 ml-4 mt-1 text-center">
            {formErrors.password}
          </p>
        )}
        <input
          className="rounded-xl px-4 py-2 md:w-1/3 mx-auto mt-4 border-gray-300 border-2 focus:border-blue-400 outline-0"
          type="password"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          required
        />
        {formErrors?.confirmPassword && (
          <p className="text-red-500 ml-4 mt-1 text-center">
            {formErrors.confirmPassword}
          </p>
        )}
        <button
          className={
            "text-white px-6 py-3 bg-blue-400 w-fit mx-auto rounded-full mt-4" +
            (buttonDisabled() ? " opacity-40 cursor-not-allowed" : "")
          }
          type="submit"
          disabled={buttonDisabled()}
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

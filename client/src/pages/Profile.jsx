import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/config";
import { setLogin } from "../state/userSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const getUser = useSelector((state) => state.user);
  useEffect(() => {
    setUser({
      name: getUser.name,
      username: getUser.username,
      email: getUser.email,
      password: "",
      confirmPassword: "",
    });
  }, [getUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword)
      return toast("Passwords do not match", {
        type: "error",
        position: "top-center",
      });
    try {
      const res = await axios.put(
        API_URL + `/users/update/${getUser._id}`,
        user,
        {
          withCredentials: true,
        }
      );
      if (res.data.error)
        return toast(res.data.error, { type: "error", position: "top-center" });
      dispatch(setLogin({ ...getUser, ...res.data }));
      toast("Account Updated", {
        type: "success",
        position: "top-center",
      });
    } catch (error) {
      toast(error.response.data || error.message, {
        type: "error",
        position: "top-center",
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container rounded-xl mx-auto bg-gray-200 mt-4 flex flex-col px-4 py-10"
      >
        <h1 className="text-center text-5xl mt-10 font-bold">Update Account</h1>
        <div className="px-4 py-2 mt-8 flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]">Name</label>
          <input
            className="px-4 py-2 rounded-xl border-gray-300 border-2 focus:border-blue-400 outline-0 w-full md:w-2/3 mx-auto"
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="px-4 py-2 mt-4 flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]">Username</label>
          <input
            className="px-4 py-2 rounded-xl border-gray-300 border-2 focus:border-blue-400 outline-0 w-full md:w-2/3 mx-auto"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="px-4 py-2 mt-4 flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]">Email</label>
          <input
            className="px-4 py-2 rounded-xl border-gray-300 border-2 focus:border-blue-400 outline-0 w-full md:w-2/3 mx-auto"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="px-4 py-2 mt-4 flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]">Password</label>
          <input
            className="px-4 py-2 rounded-xl border-gray-300 border-2 focus:border-blue-400 outline-0 w-full md:w-2/3 mx-auto"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="px-4 py-2 mt-4 flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]">Confirm Password</label>
          <input
            className="px-4 py-2 rounded-xl border-gray-300 border-2 focus:border-blue-400 outline-0 w-full md:w-2/3 mx-auto"
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
        </div>
        <button
          className="text-white px-6 py-3 bg-blue-400 w-fit mx-auto rounded-full mt-4"
          type="submit"
        >
          Update
        </button>
      </form>
    </>
  );
};
export default Profile;

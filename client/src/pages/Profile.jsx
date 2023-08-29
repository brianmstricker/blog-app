import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../state/userSlice";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { PiUserCircleLight } from "react-icons/pi";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const getUser = useSelector((state) => state.user.user);
  const [image, setImage] = useState(null);
  useEffect(() => {
    setUser({
      name: getUser.name,
      username: getUser.username,
      email: getUser.email,
      image: getUser.profilePic,
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
      if (image) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 230,
          useWebWorker: true,
          maxIteration: 15,
        };
        const compressedImage = await imageCompression(image, options);
        const storageRef = ref(
          storage,
          `users/${compressedImage.name.split(".")[0]}_${v4()}`
        );
        const uploadTask = await uploadBytes(storageRef, compressedImage);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        user.image = downloadURL;
      }
      const res = await axios.put(
        import.meta.env.VITE_API_URL + `/users/update/${getUser._id}`,
        user,
        {
          withCredentials: true,
        }
      );
      if (res.data.error)
        return toast(res.data.error, { type: "error", position: "top-center" });
      dispatch(setLogin(res.data.user));
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
  const buttonDisabled = () => {
    if (
      user.name === getUser.name &&
      user.username === getUser.username &&
      user.email === getUser.email &&
      user.password === "" &&
      user.confirmPassword === "" &&
      !image
    )
      return true;
    return false;
  };
  const imgInputRef = useRef(null);
  const imageChange = (e) => {
    if (e.target.files.length === 0) return;
    if (e.target.files[0].type.includes("image")) {
      setImage(e.target.files[0]);
      setUser({ ...user, image: e.target.files[0] });
    } else
      toast("Please select an image", {
        type: "error",
        position: "top-center",
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container rounded-xl mx-auto bg-gray-200 mt-4 flex flex-col px-4 py-10"
      >
        <h1 className="text-center text-5xl mt-4 font-bold mb-0">
          Update Account
        </h1>
        <div className="flex items-center justify-center mt-2">
          {!image && !user.image && (
            <div className="relative flex items-center justify-center">
              <label htmlFor="image">
                <PiUserCircleLight size={144} className="cursor-pointer" />
              </label>
              <p className="absolute text-sm xs:text-base -right-[3.5rem] xs:-right-[9rem] w-min xs:w-auto text-gray-400">
                click to change pic
              </p>
            </div>
          )}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="profile"
              className="rounded-full h-36 w-36 object-cover cursor-pointer ring ring-black"
              onClick={() => imgInputRef.current.click()}
            />
          )}
          {user.image && !image && (
            <img
              src={user.image}
              alt="profile"
              className="rounded-full h-36 w-36 object-cover cursor-pointer ring ring-black"
              onClick={() => imgInputRef.current.click() && setUser.image("")}
            />
          )}
          <input
            type="file"
            ref={imgInputRef}
            className="hidden"
            id="image"
            name="image"
            onChange={imageChange}
          />
        </div>
        {getUser.role === "admin" && (
          <div className=" text-center mt-2 text-lg">
            Role - <span className="text-red-500">Admin</span>
          </div>
        )}
        <div className="px-4 py-2 mt-8 md:flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]" htmlFor="name">
            Name
          </label>
          <Input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            account="true"
            id="name"
          />
        </div>
        <div className="px-4 py-2 mt-4 md:flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]" htmlFor="username">
            Username
          </label>
          <Input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            account="true"
            id="username"
          />
        </div>
        <div className="px-4 py-2 mt-4 md:flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            account="true"
            id="email"
          />
        </div>
        {/* <div className="px-4 py-2 mt-4 md:flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]" htmlFor="password">
            Password
          </label>
          <Input
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            account="true"
            id="password"
          />
        </div>
        <div className="px-4 py-2 mt-4 md:flex items-center justify-center gap-4 w-full md:w-2/3 mx-auto">
          <label className="text-xl w-[100px]" htmlFor="confirm">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            account="true"
            id="confirm"
          />
        </div> */}
        <button
          className={
            "text-white px-6 py-3 bg-blue-400 w-fit mx-auto rounded-full mt-4" +
            (buttonDisabled() ? " opacity-40 cursor-not-allowed" : "")
          }
          type="submit"
          disabled={buttonDisabled()}
        >
          Update
        </button>
      </form>
    </>
  );
};
export default Profile;

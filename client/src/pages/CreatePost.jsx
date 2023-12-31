import Input from "../components/Input";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AiOutlineFileImage } from "react-icons/ai";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { postValidation } from "../validations/postValidation";
import imageCompression from "browser-image-compression";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: "",
    tags: "",
  });
  const [prevPostState, setPrevPostState] = useState({ ...post });
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrevPostState({ ...post });
    const validate = await postValidation
      .validate(post, { abortEarly: false })
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
      if (image) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
          maxIteration: 15,
        };
        const compressedImage = await imageCompression(image, options);
        const storageRef = ref(
          storage,
          `posts/${compressedImage.name.split(".")[0]}_${v4()}`
        );
        const uploadTask = await uploadBytes(storageRef, compressedImage);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        post.image = downloadURL;
      }
      const data = await axios.post(
        import.meta.env.VITE_API_URL + "/posts/create",
        post,
        {
          withCredentials: true,
        }
      );
      if (data.data.error) return alert(data.data.error);
      toast.success("Post created successfully");
      setPost({
        title: "",
        shortDescription: "",
        content: "",
        image: "",
        tags: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.error || error.response.data);
    }
  };
  const imgInputRef = useRef(null);
  const buttonDisabled = () => {
    if (
      post.title === "" ||
      post.shortDescription === "" ||
      post.content === "" ||
      post.content === "<p><br></p>"
    ) {
      return true;
    }
    if (JSON.stringify(prevPostState) === JSON.stringify(post)) return true;
    return false;
  };
  const imageChange = (e) => {
    if (e.target.files.length === 0) return;
    if (e.target.files[0].type.includes("image")) {
      setImage(e.target.files[0]);
      setPost({ ...post, image: e.target.files[0] });
    } else {
      toast.error("Please select an image");
    }
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];
  return (
    <form
      className="container rounded-xl mx-auto bg-gray-200 flex flex-col p-4 mt-4 mb-8"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-5xl font-bold mb-0">Create A Blog</h1>
      <div className="flex flex-col mt-4">
        <label className="text-xl font-bold mt-4 w-max" htmlFor="title">
          Title
        </label>
        <Input
          type="text"
          placeholder="Title"
          id="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        {formErrors?.title && (
          <p className="text-red-500 ml-4 mt-1">{formErrors.title}</p>
        )}
        <label className="text-xl font-bold mt-4 w-max" htmlFor="description">
          Description
        </label>
        <Input
          type="text"
          placeholder="Leave a short description"
          id="description"
          value={post.shortDescription}
          onChange={(e) =>
            setPost({ ...post, shortDescription: e.target.value })
          }
          required
        />
        {formErrors?.shortDescription && (
          <p className="text-red-500 ml-4 mt-1">
            {formErrors.shortDescription}
          </p>
        )}
        <label className="text-xl font-bold mt-4 w-max" htmlFor="tags">
          Tags
        </label>
        <Input
          type="text"
          placeholder="Enter some tags so that people can find your post"
          id="tags"
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
        />
        <label className="text-xl font-bold mt-4 w-max" htmlFor="content">
          Content
        </label>
        <ReactQuill
          className="bg-white"
          id="content"
          placeholder="Write your post here"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e })}
          modules={modules}
          formats={formats}
        />
        {formErrors?.content && (
          <p className="text-red-500 ml-4 mt-1">{formErrors.content}</p>
        )}
      </div>
      <label className="text-xl font-bold mt-4 max-w-[400px]" htmlFor="image">
        Image
        {!image && (
          <div className="h-[350px] border border-black flex items-center justify-center rounded-xl cursor-pointer">
            <AiOutlineFileImage size={104} />
          </div>
        )}
      </label>
      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="post image"
          className="rounded-xl max-h-fit max-w-[600px] object-contain cursor-pointer ring-2 mt-1 ring-black"
          onClick={() => imgInputRef.current.click() && setPost.image("")}
        />
      )}
      <input
        type="file"
        id="image"
        name="image"
        className="hidden"
        ref={imgInputRef}
        onChange={imageChange}
      />
      <button
        className={
          "bg-blue-400 text-white font-bold rounded-xl px-4 py-2 mt-4" +
          (buttonDisabled() ? " opacity-40 cursor-not-allowed" : "")
        }
        type="submit"
        disabled={buttonDisabled()}
      >
        Create Post
      </button>
    </form>
  );
};
export default CreatePost;

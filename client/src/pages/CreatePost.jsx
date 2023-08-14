import Input from "../components/Input";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [post, setPost] = useState({
    title: "",
    shortDescription: "",
    content: "",
    image: "",
    tags: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(API_URL + "/posts/create", post, {
        withCredentials: true,
      });
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
  return (
    <form
      className="container rounded-xl mx-auto bg-gray-200 flex flex-col p-4 mt-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-5xl font-bold ">Create A Blog</h1>
      <div className="flex flex-col mt-4">
        <label className="text-xl font-bold mt-6" htmlFor="title">
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
        <label className="text-xl font-bold mt-6" htmlFor="description">
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
        <label className="text-xl font-bold mt-6" htmlFor="tags">
          Tags
        </label>
        <Input
          type="text"
          placeholder="Enter some tags so that people can find your post"
          id="tags"
          value={post.tags}
          onChange={(e) => setPost({ ...post, tags: e.target.value })}
        />
        <label className="text-xl font-bold mt-6" htmlFor="content">
          Content
        </label>
        <textarea
          className="rounded-xl px-4 py-2 border-gray-300 border-2 focus:border-blue-400 outline-0"
          id="content"
          placeholder="Write your post here"
          rows={10}
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
      </div>
      <label className="text-xl font-bold mt-6" htmlFor="image">
        Image
      </label>
      <Input
        type="text"
        placeholder="Image URL"
        id="image"
        value={post.image}
        onChange={(e) => setPost({ ...post, image: e.target.value })}
      />
      <button
        className="bg-blue-400 text-white font-bold rounded-xl px-4 py-2 mt-4"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
export default CreatePost;

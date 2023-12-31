import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Input from "./Input";
import { FcCancel } from "react-icons/fc";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import DOMpurify from "dompurify";
import { format } from "date-fns";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Post = () => {
  const { id } = useParams();
  const { response, isLoading, error } = useFetch(
    import.meta.env.VITE_API_URL + "/posts/" + id
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editEntry, setEditEntry] = useState({
    title: "",
    shortDescription: "",
    content: "",
    tags: "",
  });
  const [favorite, setFavorite] = useState({ response: null });
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (!user) return setFavorite({ response: false });
    const getFavorite = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/favorites/post/" + id,
          {
            withCredentials: true,
          }
        );
        setFavorite({ response: res.data });
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    };
    getFavorite();
  }, [id, user]);
  useEffect(() => {
    if (response) {
      setEditEntry({
        title: response.title,
        shortDescription: response.shortDescription,
        content: response.content,
        tags: response.tags
          ? response.tags.join(", ") || response.tags.join("")
          : "",
      });
    }
  }, [response]);
  const navigate = useNavigate();
  const updateFavorite = async () => {
    if (
      favorite.response !== null &&
      favorite.response !== false &&
      favorite.response !== undefined
    ) {
      try {
        await axios.delete(
          import.meta.env.VITE_API_URL +
            "/favorites/" +
            (favorite.response[0]._id || favorite._id),
          {
            withCredentials: true,
          }
        );
        setFavorite({ response: null });
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    } else {
      try {
        const fav = await axios.post(
          import.meta.env.VITE_API_URL + "/favorites",
          {
            postId: id,
            userId: user._id,
          },
          {
            withCredentials: true,
          }
        );
        setFavorite({ response: [fav.data] });
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + "/posts/delete/" + id, {
        headers: {
          token: user._id,
        },
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message || err.message);
    }
  };
  const handleEditSubmit = async () => {
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + "/posts/update/" + id,
        editEntry,
        {
          headers: {
            token: user._id,
          },
          withCredentials: true,
        }
      );
      setIsEditing(false);
    } catch (err) {
      toast.error(err.response.data.message || err.message);
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
    <>
      {isLoading && (
        <div className="container mx-auto max-w-4xl mt-12 p-3">
          <Skeleton height={50} count={10} />
        </div>
      )}
      {error && (
        <h4 className="text-center">
          {error.message || "Something went wrong."}
        </h4>
      )}
      {!isLoading && !error && (
        <div className="container mx-auto">
          {!isEditing ? (
            <div className="max-w-4xl mx-auto p-3">
              {response.image && (
                <div className="flex max-h-[400px] rounded-xl ring-2 ring-black overflow-hidden w-fit mx-auto">
                  <img
                    className="object-contain mx-auto"
                    src={response.image}
                  />
                </div>
              )}
              <div className="p-3">
                <div className="gap-8 my-4">
                  <div className="relative">
                    <h1 className="font-bold text-2xl md:text-5xl capitalize mb-0">
                      {response.title}
                    </h1>
                    {response.author &&
                      !!user &&
                      user?._id !== response.author._id &&
                      (favorite.response === false ||
                        favorite.response !== undefined) && (
                        <div className="absolute top-[.6rem] right-0">
                          <AiOutlineHeart size={32} onClick={updateFavorite} />
                        </div>
                      )}
                    {response.author &&
                      !!user &&
                      user?._id !== response.author._id &&
                      favorite &&
                      favorite.response !== null &&
                      favorite.response !== false && (
                        <div className="absolute top-[.6rem] right-0">
                          <AiFillHeart
                            size={32}
                            className="fill-red-500"
                            onClick={updateFavorite}
                          />
                        </div>
                      )}
                    <p className="text-xl font-medium mt-4 mb-8 text-gray-500">
                      {response.shortDescription}
                    </p>
                    <div className="flex items-center justify-center gap-2 xs:gap-4">
                      {response.author && response.author.username && (
                        <p className="text-gray-600 text-sm xs:text-lg">
                          by {response.author.username}
                        </p>
                      )}
                      <div>
                        <div className="h-2 w-2 bg-black/50 rounded-xl hidden xs:block" />
                      </div>
                      <p className="text-sm">
                        Published{" "}
                        {format(new Date(response.createdAt), "PP, p")}
                      </p>
                      {((response.author &&
                        !!user &&
                        response.author._id === user?._id) ||
                        (user && user.role === "admin")) && (
                        <div className="flex gap-3">
                          <TbEdit
                            className="cursor-pointer"
                            size={30}
                            onClick={() => setIsEditing(true)}
                          />
                          <MdOutlineDelete
                            className="cursor-pointer"
                            size={30}
                            onClick={handleDelete}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {response.tags.length > 1 ? (
                  <>
                    <p className="font-bold mb-2">Tags</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-3">
                      {response.tags.map((tag, i) => (
                        <p key={i} className="text-indigo-500/80 lg:border-b">
                          {tag}
                        </p>
                      ))}
                    </div>
                  </>
                ) : (
                  response.tags.length === 1 &&
                  !response.tags.includes(" ") &&
                  !response.tags.includes("") && (
                    <>
                      <p className="font-bold mb-2">Tags</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:flex gap-3">
                        {response.tags.map((tag, i) => (
                          <p key={i} className="text-indigo-500/80 lg:border-b">
                            {tag}
                          </p>
                        ))}
                      </div>
                    </>
                  )
                )}
                <div className="text-lg py-8">
                  {parse(DOMpurify.sanitize(response.content))}
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEditSubmit}>
              <div className="max-w-4xl mx-auto p-3 relative">
                <p className="text-center text-gray-400 text-xl absolute -left-24">
                  Editing...
                </p>
                {response.image && (
                  <img
                    className="mx-auto rounded-xl md:h-[400px] object-contain md:object-cover mt-8 ring-2 ring-black"
                    src={response.image}
                  />
                )}
                <div className="p-3">
                  <div className="gap-8 my-4">
                    <div>
                      <h1 className="font-bold text-2xl md:text-5xl capitalize mb-0">
                        <Input
                          className="w-full"
                          value={editEntry.title}
                          onChange={(e) =>
                            setEditEntry({
                              ...editEntry,
                              title: e.target.value,
                            })
                          }
                        />
                      </h1>
                      <p className="text-xl font-medium mt-4 mb-8 text-gray-500">
                        <Input
                          className="w-full"
                          value={editEntry.shortDescription}
                          onChange={(e) =>
                            setEditEntry({
                              ...editEntry,
                              shortDescription: e.target.value,
                            })
                          }
                        />
                      </p>
                      <div className="flex items-center justify-center gap-2 xs:gap-4">
                        {response.author && response.author.username && (
                          <p className="text-gray-600 text-lg">
                            by {response.author.username}
                          </p>
                        )}
                        {((response.author &&
                          user &&
                          response.author._id === user._id) ||
                          (user && user.role === "admin")) && (
                          <div className="flex gap-3">
                            <FcCancel
                              className="cursor-pointer"
                              size={30}
                              onClick={() => setIsEditing(!isEditing)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {response.tags.length > 1 && !response.tags.includes(" ") ? (
                    <>
                      <p className="font-bold mb-2">Tags</p>
                      <p className="text-indigo-500/80 lg:border-b">
                        <Input
                          value={editEntry.tags}
                          onChange={(e) =>
                            setEditEntry({
                              ...editEntry,
                              tags: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold mb-2">Add Tags</p>
                      <Input
                        value={editEntry.tags}
                        onChange={(e) =>
                          setEditEntry({
                            ...editEntry,
                            tags: e.target.value,
                          })
                        }
                        className="w-full"
                      />
                    </>
                  )}
                  <ReactQuill
                    className="bg-white mt-8"
                    id="content"
                    placeholder="Write your post here"
                    value={editEntry.content}
                    onChange={(e) => setEditEntry({ ...editEntry, content: e })}
                    modules={modules}
                    formats={formats}
                  />
                </div>
              </div>
              <button
                className="px-4 py-3 bg-blue-400 text-white rounded-xl mx-auto flex mb-8"
                type="submit"
              >
                Update
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};
export default Post;

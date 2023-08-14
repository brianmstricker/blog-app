import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const Post = () => {
  const { id } = useParams();
  const { response, isLoading, error } = useFetch(API_URL + "/posts/" + id);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleDelete = async () => {
    try {
      await axios.delete(API_URL + "/posts/delete/" + id, {
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
  return (
    <>
      {isLoading && <h4 className="text-center">Loading...</h4>}
      {error && <h4 className="text-center">{error.message}</h4>}
      {!isLoading && !error && (
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto p-3">
            {response.image && (
              <img
                className="mx-auto rounded-xl h-[400px] w-full object-cover mt-8"
                src={response.image}
              />
            )}
            <div className="p-3">
              <div className="gap-8 my-4">
                <div>
                  <h1 className="font-bold text-2xl md:text-5xl capitalize">
                    {response.title}
                  </h1>
                  <p className="text-xl font-medium mt-4 mb-8 text-gray-500">
                    {response.shortDescription}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    {response.author && response.author.username && (
                      <p className="text-gray-600 text-lg">
                        by {response.author.username}
                      </p>
                    )}
                    <div className="h-2 w-2 bg-black/50 rounded-xl" />
                    <p className="text-sm">Published 1 day ago</p>
                    {((response.author &&
                      user &&
                      response.author._id === user._id) ||
                      (user && user.role === "admin")) && (
                      <div className="flex gap-3">
                        <TbEdit size={30} />
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
              {response.tags.length > 1 && !response.tags.includes(" ") && (
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
              )}
              <p className="text-lg py-8">{response.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Post;

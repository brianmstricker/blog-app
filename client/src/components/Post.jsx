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
      console.log(err);
    }
  };
  return (
    <>
      {isLoading && <h4 className="text-center">Loading...</h4>}
      {error && <h4 className="text-center">{error.message}</h4>}
      {!isLoading && !error && (
        <div className="container mx-auto bg-gray-200 rounded-xl">
          <div className="max-w-4xl mx-auto p-3">
            {response.image && (
              <img
                className="mx-auto rounded-xl h-[400px] w-full object-cover"
                src={response.image}
              />
            )}
            <div className="p-3">
              <div className="gap-8 mt-4 mb-8 md:mb-12">
                <h1>
                  <span className="font-bold text-2xl md:text-4xl capitalize">
                    {response.title}
                  </span>
                  {response.author && response.author.username && (
                    <div className="text-gray-600 text-lg my-2">
                      by {response.author.username}
                    </div>
                  )}
                </h1>
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
              <p className="text-xl font-medium mt-2 mb-8">
                * {response.shortDescription}
              </p>
              <p className="text-lg pb-8">{response.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Post;

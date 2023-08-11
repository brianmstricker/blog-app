import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";

const Post = () => {
  const { id } = useParams();
  const { response, isLoading, error } = useFetch(API_URL + "/posts/" + id);
  return (
    <>
      {isLoading && <h4 className="text-center">Loading...</h4>}
      {error && <h4>{error}</h4>}
      {!isLoading && !error && (
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {response.image && (
              <img className="w-full h-96" src={response.image} />
            )}
            <div className="p-3">
              <div className="flex justify-center items-end gap-8 mt-4 mb-12">
                <h1 className="text-4xl">
                  <span className="font-bold">{response.title}</span>
                  {response.author && response.author.username && (
                    <span className="text-gray-600 ml-4 text-base">
                      by {response.author.username}
                    </span>
                  )}
                </h1>
                <div className="flex gap-3">
                  <TbEdit size={30} />
                  <MdOutlineDelete size={30} />
                </div>
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

import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";

const Post = () => {
  const { id } = useParams();
  const { response, isLoading, error } = useFetch(API_URL + "/posts/" + id);
  console.log(response);
  return (
    <>
      {isLoading && <h4>Loading...</h4>}
      {error && <h4>{error}</h4>}
      {!isLoading && !error && (
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <img className="w-full h-96" src={response.image} />
            <div className="p-3">
              <h1 className="my-3">
                <span className="font-bold text-2xl">{response.title}</span>
                {response.author && response.author.username && (
                  <span className="text-gray-600 ml-4">
                    by {response.author.username}
                  </span>
                )}
              </h1>
              <p className="text-xl font-medium my-3">
                {response.shortDescription}
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

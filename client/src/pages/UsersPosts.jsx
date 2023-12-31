import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UsersPosts = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const {
    response: posts,
    isLoading,
    error,
  } = useFetch(import.meta.env.VITE_API_URL + `/posts/user/${id}`);
  return (
    <div className="mb-8">
      {user && user._id !== id ? (
        <h1 className="text-center mt-6">
          You cannot view someone else&apos;s posts
        </h1>
      ) : (
        <>
          <h1 className="text-center mt-6">Your Posts</h1>
          {isLoading && (
            <div className="max-w-7xl mx-auto grid xs:grid-cols-2 gap-6 p-4">
              <Skeleton count={3} />
              <Skeleton count={3} />
              <Skeleton count={3} />
              <Skeleton count={3} />
              <Skeleton count={3} />
              <Skeleton count={3} />
            </div>
          )}
          {error && (
            <h1 className="text-center mt-6">
              Error: {error.message || "Something went wrong."}
            </h1>
          )}
          {posts && posts.length === 0 && (
            <h1 className="text-center mt-6 text-3xl text-gray-500">
              No posts found.
            </h1>
          )}
          <div className="max-w-7xl mx-auto p-4 grid xs:grid-cols-2 gap-2">
            {posts &&
              posts.map((post) => (
                <Link to={`/post/${post._id}`} key={post._id}>
                  <div className="border border-black p-2 h-full flex flex-col justify-between">
                    <h1 className="text-2xl font-medium capitalize">
                      {post.title}
                    </h1>
                    <p className="text-sm text-gray-400">
                      {post.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
};
export default UsersPosts;

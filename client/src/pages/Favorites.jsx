import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Favorites = () => {
  const user = useSelector((state) => state.user.user);
  const [favorites, setFavorites] = useState([]);
  const { response, error, isLoading } = useFetch(
    `${import.meta.env.VITE_API_URL}/favorites/${user._id}`
  );
  useEffect(() => {
    if (response) {
      setFavorites(response);
    }
  }, [response]);
  const handleRemoveFavorite = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/favorites/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        setFavorites((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container mx-auto relative">
      <h1 className="text-4xl font-bold text-center mt-8">Favorites</h1>
      {isLoading && (
        <div className="flex flex-col gap-2 px-4 max-w-4xl mx-auto w-[90%] xl:w-auto mb-6">
          <Skeleton count={3} height={90} />
        </div>
      )}
      {error && <div>{error.message || "Something went wrong."}</div>}
      {favorites && favorites.length > 0 && (
        <div className="flex flex-col gap-2 px-4 max-w-4xl mx-auto w-[90%] xl:w-auto mb-6">
          {favorites.map((item) => (
            <div
              key={item._id}
              className="flex flex-row-reverse items-center gap-3"
            >
              <div className="group">
                <GoTrash
                  className="fill-red-800 cursor-pointer"
                  size={20}
                  onClick={() => {
                    handleRemoveFavorite(item._id);
                  }}
                />
                <span className="hidden sm:group-hover:block w-max absolute">
                  Remove
                </span>
              </div>
              <Link
                to={`/post/${item.postId._id}`}
                className="flex flex-col xs:flex-row xs:items-center border border-slate-400 p-4 rounded-xl shadow-md justify-between w-full relative"
              >
                <div className="h-full">
                  <h2 className="font-bold text-base capitalize">
                    {item.postId.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    by {item.postId.author.username}
                  </span>
                </div>
                <p className="text-sm text-gray-500 max-w-[200px] lg:max-w-[300px]">
                  {item.postId.shortDescription}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
      {response && response.length === 0 && (
        <div className="text-center mt-8">
          <h3 className="text-3xl text-gray-500">No favorites yet.</h3>
          <p className="text-gray-500">
            Go to <Link to="/">Home</Link> and add some.
          </p>
        </div>
      )}
    </div>
  );
};
export default Favorites;

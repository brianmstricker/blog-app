import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const SearchCard = ({ post }) => {
  return (
    <>
      {post.image ? (
        <Link
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[300px] rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer shadow-md shadow-black/50"
          key={post._id}
          to={`/post/${post._id}`}
        >
          <LazyLoad
            debounce={false}
            threshold={0.6}
            className="h-36 w-full rounded-t-xl object-cover"
          >
            <img
              className="h-36 w-full rounded-t-xl object-cover ring-1 ring-black/30"
              src={post.image}
              loading="lazy"
              alt={post.title}
            />
          </LazyLoad>
          <div className="py-2 px-4 tracking-tighter">
            <h3 className="flex flex-col mb-0">
              <span className="font-bold text-base xl:text-lg xl:leading-5 capitalize">
                {post.title}
              </span>
              {post.author && post.author.username && (
                <span className="text-gray-500  text-sm">
                  by {post.author.username}
                </span>
              )}
            </h3>
            <div className="text-sm">{post.shortDescription}</div>
          </div>
        </Link>
      ) : (
        <Link
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[300px] rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer shadow-md shadow-black/50"
          key={post._id}
          to={`/post/${post._id}`}
        >
          <div className="px-4 py-2 h-full flex flex-col tracking-tight">
            <div>
              <h3 className="mt-2 flex flex-col mb-0">
                <span className="font-bold text-base xl:text-lg xl:leading-5 capitalize">
                  {post.title}
                </span>
                {post.author && post.author.username && (
                  <span className="text-gray-500 text-sm">
                    by {post.author.username}
                  </span>
                )}
              </h3>
            </div>
            <div className="mt-4 text-sm">{post.shortDescription}</div>
          </div>
        </Link>
      )}
    </>
  );
};
export default SearchCard;

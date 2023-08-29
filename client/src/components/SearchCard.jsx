import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const SearchCard = ({ post }) => {
  return (
    <>
      {post.image ? (
        <Link
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-[260px] rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer shadow-md shadow-black/50"
          key={post._id}
          to={`/post/${post._id}`}
        >
          <LazyLoad
            debounce={false}
            threshold={0.8}
            className="h-36 w-full rounded-t-xl object-cover"
          >
            <img
              className="h-36 w-full rounded-t-xl object-cover ring-1 ring-black/30"
              src={post.image}
              loading="lazy"
              alt={post.title}
            />
          </LazyLoad>
          <div className="py-2 px-4 overflow-hidden">
            <h3 className="text-xl flex flex-col mb-0">
              <span className="font-bold text-base xl:text-xl capitalize overflow-hidden">
                {post.title}
              </span>
              {post.author && post.author.username && (
                <span className="text-gray-500 overflow-hidden text-sm">
                  by {post.author.username}
                </span>
              )}
            </h3>
            <div className="sm:hidden">{post.shortDescription}</div>
          </div>
        </Link>
      ) : (
        <Link
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-[260px] rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer shadow-md shadow-black/50"
          key={post._id}
          to={`/post/${post._id}`}
        >
          <div className="px-4 py-2 h-full flex flex-col">
            <div>
              <h3 className="overflow-hidden mt-2 text-xl flex flex-col mb-0">
                <span className="font-bold xl:text-2xl capitalize overflow-hidden leading-tight">
                  {post.title}
                </span>
                {post.author && post.author.username && (
                  <span className="text-gray-500 overflow-hidden text-sm">
                    by {post.author.username}
                  </span>
                )}
              </h3>
            </div>
            <div className="mt-4">{post.shortDescription}</div>
          </div>
        </Link>
      )}
    </>
  );
};
export default SearchCard;

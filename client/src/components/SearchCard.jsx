import { useEffect } from "react";
import parse from "html-react-parser";
import DOMpurify from "dompurify";
import { Link } from "react-router-dom";

const SearchCard = ({ post, scrollToExplore }) => {
  useEffect(() => {
    scrollToExplore();
  }, [scrollToExplore]);
  if (post.content.includes("<a")) {
    post.content = post.content.replace(/<a/g, "<span");
  }
  return (
    <>
      {post.image ? (
        <Link
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden shadow-lg shadow-black/50"
          key={post._id}
          to={`/post/${post._id}`}
        >
          <img
            className="h-32 lg:h-48 w-full rounded-t-xl object-cover"
            src={post.image}
          />
          <div className="p-4 overflow-hidden">
            <h1 className="overflow-hidden text-xl flex flex-col mb-0">
              <span className="font-bold xl:text-2xl capitalize overflow-hidden leading-tight">
                {post.title}
              </span>
              {post.author && post.author.username && (
                <span className="text-gray-500 overflow-hidden text-sm">
                  by {post.author.username}
                </span>
              )}
            </h1>
            <div className="sm:hidden">{post.shortDescription}</div>
          </div>
        </Link>
      ) : (
        <Link
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden shadow-lg shadow-black/50"
          key={post._id}
          to={`/post/${post._id}`}
        >
          <div className="p-4 h-full flex flex-col">
            <div>
              <h1 className="overflow-hidden mt-2 text-xl flex flex-col mb-0">
                <span className="font-bold xl:text-2xl capitalize overflow-hidden leading-tight">
                  {post.title}
                </span>
                {post.author && post.author.username && (
                  <span className="text-gray-500 overflow-hidden text-sm">
                    by {post.author.username}
                  </span>
                )}
              </h1>
            </div>
            {post.content.length > 150 ? (
              <>
                <div className="block xs:hidden lg:block overflow-hidden mt-2 justify-self-end">
                  {parse(
                    DOMpurify.sanitize(post.content.substring(0, 150)) + "..."
                  )}
                </div>
                <div className="hidden xs:block lg:hidden overflow-hidden mt-2 justify-self-end">
                  {parse(
                    DOMpurify.sanitize(post.content.substring(0, 100)) + "..."
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="hidden lg:block overflow-hidden mt-2">
                  {parse(DOMpurify.sanitize(post.content))}
                </div>
                <div className="lg:hidden overflow-hidden mt-2">
                  {parse(DOMpurify.sanitize(post.content.substring(0, 45)))}
                </div>
              </>
            )}
          </div>
        </Link>
      )}
    </>
  );
};
export default SearchCard;

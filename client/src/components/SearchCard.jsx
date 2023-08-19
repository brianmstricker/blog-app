import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import DOMpurify from "dompurify";

const SearchCard = ({ post, scrollToExplore }) => {
  useEffect(() => {
    scrollToExplore();
  }, [scrollToExplore]);
  const navigate = useNavigate();
  return (
    <>
      {post.image ? (
        <div
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden"
          key={post._id}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <img
            className="h-32 lg:h-48 w-full rounded-t-xl object-cover"
            src={post.image}
          />
          <div className="p-4 overflow-hidden">
            <h1 className="overflow-hidden text-xl flex flex-col">
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
        </div>
      ) : (
        <div
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden"
          key={post._id}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <div className="p-4 h-full flex flex-col">
            <div>
              <h1 className="overflow-hidden mt-2 text-xl flex flex-col">
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
            {post.content.length > 200 ? (
              <>
                <div className="block xs:hidden lg:block overflow-hidden mt-2 justify-self-end">
                  {parse(
                    DOMpurify.sanitize(post.content.substring(0, 200)) + "..."
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
        </div>
      )}
    </>
  );
};
export default SearchCard;

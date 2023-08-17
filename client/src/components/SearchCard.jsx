import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ post, scrollToExplore }) => {
  useEffect(() => {
    scrollToExplore();
  }, [scrollToExplore]);
  const navigate = useNavigate();
  return (
    <>
      {post.image ? (
        <div
          className="bg-gray-300 w-[90%] xs:w-auto max-w-[350px] rounded-xl mb-8 m-2 mx-auto xs:mx-2 hover:cursor-pointer overflow-hidden"
          key={post._id}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <img
            className="h-48 w-full rounded-t-xl object-cover"
            src={post.image}
          />
          <div className="p-4 overflow-hidden">
            <h1 className="overflow-hidden">
              <span className="font-bold text-xl xl:text-2xl capitalize overflow-hidden leading-6">
                {post.title}
              </span>
              <br />
              {post.author && post.author.username && (
                <span className="text-gray-600 overflow-hidden">
                  by {post.author.username}
                </span>
              )}
            </h1>
          </div>
        </div>
      ) : (
        <div
          className="bg-gray-300 w-[90%] xs:w-auto max-w-[350px] rounded-xl mb-8 m-2 mx-auto xs:mx-2 hover:cursor-pointer"
          key={post._id}
          onClick={() => navigate(`/post/${post._id}`)}
        >
          <div className="p-4 h-full flex flex-col">
            <div>
              <h1 className="overflow-hidden mt-2">
                <span className="font-bold text-xl xl:text-2xl capitalize overflow-hidden leading-6">
                  {post.title}
                </span>
                <br />
                {post.author && post.author.username && (
                  <span className="text-gray-600 overflow-hidden">
                    by {post.author.username}
                  </span>
                )}
              </h1>
            </div>
            <p className="hidden xl:block mt-2 overflow-hidden max-h-[185px]">
              {post.content.substring(0, 250)}...
            </p>
            <p className="block xl:hidden mt-2 overflow-hidden max-h-[175px]">
              {post.content.substring(0, 155)}...
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default SearchCard;

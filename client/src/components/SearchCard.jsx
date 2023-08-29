// import parse from "html-react-parser";
// import DOMpurify from "dompurify";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";

const SearchCard = ({ post }) => {
  // const postObj = { ...post };
  // if (postObj.content.includes("<a")) {
  //   postObj.content = postObj.content.replace(/<a/g, "<span");
  // }
  // if (postObj.content.includes("<h1")) {
  //   postObj.content = postObj.content.replace(/<h1/g, "<div");
  // }
  // if (postObj.content.includes("<h2")) {
  //   postObj.content = postObj.content.replace(/<h2/g, "<div");
  // }
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
            <h1 className="text-xl flex flex-col mb-0">
              <span className="font-bold text-base xl:text-xl capitalize overflow-hidden">
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
          className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-[250px] rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden shadow-md shadow-black/50"
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
            {/* {post.content.length > 150 ? (
              <>
                <div>
                  <div className="block xs:hidden lg:block overflow-hidden mt-2 justify-self-end">
                    {parse(
                      DOMpurify.sanitize(postObj.content.substring(0, 150)) +
                        "..."
                    )}
                  </div>
                  <div className="hidden xs:block lg:hidden overflow-hidden mt-2 justify-self-end">
                    {parse(
                      DOMpurify.sanitize(postObj.content.substring(0, 100)) +
                        "..."
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="hidden lg:block overflow-hidden mt-2">
                    {parse(DOMpurify.sanitize(postObj.content))}
                  </div>
                  <div className="block lg:hidden overflow-hidden mt-2">
                    {parse(DOMpurify.sanitize(postObj.content))}
                  </div>
                </div>
              </>
            )} */}
            <div className="mt-4">{post.shortDescription}</div>
          </div>
        </Link>
      )}
    </>
  );
};
export default SearchCard;

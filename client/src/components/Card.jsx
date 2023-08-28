import { Link } from "react-router-dom";
import parse from "html-react-parser";
import DOMpurify from "dompurify";
import LazyLoad from "react-lazy-load";

const Card = ({ isLoading, error, cards }) => {
  return (
    <>
      {isLoading && <h4 className="text-center">Loading...</h4>}
      {error && <h4>{error.message || "Something went wrong."}</h4>}
      {!isLoading &&
        !error &&
        cards.length > 0 &&
        cards.map((card) => {
          if (card.content.includes("<a")) {
            card.content = card.content.replace(/<a/g, "<span");
          }
          if (card.image) {
            return (
              <Link
                to={`/post/${card._id}`}
                key={card._id}
                className={
                  "bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer shadow-md shadow-black/50"
                }
              >
                <LazyLoad
                  debounce={false}
                  threshold={0.8}
                  className="h-32 lg:h-48 w-full rounded-t-xl object-cover"
                >
                  <img
                    alt={card.title}
                    className="h-32 lg:h-48 w-full rounded-t-xl object-cover ring-1 ring-black/30"
                    src={card.image}
                    loading="lazy"
                  />
                </LazyLoad>
                <div className="p-4 overflow-hidden">
                  <h1 className="overflow-hidden text-xl flex flex-col mb-0">
                    <span className="font-bold xl:text-2xl capitalize overflow-hidden leading-tight">
                      {card.title}
                    </span>
                    {card.author && card.author.username && (
                      <span className="text-gray-500 overflow-hidden text-sm">
                        by {card.author.username}
                      </span>
                    )}
                  </h1>
                  <div className="sm:hidden">{card.shortDescription}</div>
                </div>
              </Link>
            );
          } else {
            return (
              <Link
                to={`/post/${card._id}`}
                key={card._id}
                className={
                  "bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden shadow-md shadow-black/50"
                }
              >
                <div className="p-4 h-full flex flex-col">
                  <div>
                    <h1 className="overflow-hidden mt-2 text-xl flex flex-col mb-0">
                      <span className="font-bold xl:text-2xl capitalize overflow-hidden leading-tight">
                        {card.title}
                      </span>
                      {card.author && card.author.username && (
                        <span className="text-gray-500 overflow-hidden text-sm">
                          by {card.author.username}
                        </span>
                      )}
                    </h1>
                  </div>
                  {card.content.length > 150 ? (
                    <>
                      <div className="block xs:hidden lg:block overflow-hidden mt-2 justify-self-end">
                        {parse(
                          DOMpurify.sanitize(card.content.substring(0, 150)) +
                            "..."
                        )}
                      </div>
                      <div className="hidden xs:block lg:hidden overflow-hidden mt-2 justify-self-end">
                        {parse(
                          DOMpurify.sanitize(card.content.substring(0, 100)) +
                            "..."
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden lg:block overflow-hidden mt-2">
                        {parse(DOMpurify.sanitize(card.content))}
                      </div>
                      <div className="lg:hidden overflow-hidden mt-2">
                        {parse(
                          DOMpurify.sanitize(card.content.substring(0, 45))
                        )}
                      </div>
                    </>
                  )}
                </div>
              </Link>
            );
          }
        })}
    </>
  );
};
export default Card;

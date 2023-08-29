import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col h-[300px] p-4">
      <div className="h-[200px]">
        <Skeleton height={200} />
      </div>
      <div className="p-4">
        <Skeleton count={3} />
      </div>
    </div>
  );
};
const Card = ({ isLoading, error, cards }) => {
  return (
    <>
      {isLoading && (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
      {error && <h4>{error.message || "Something went wrong."}</h4>}
      {!isLoading &&
        !error &&
        cards.length > 0 &&
        cards.map((card) => {
          if (card.image) {
            return (
              <Link
                to={`/post/${card._id}`}
                key={card._id}
                className={
                  "bg-gray-300 w-[90%] sm:w-auto max-w-[300px] rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer shadow-md shadow-black/50"
                }
              >
                <LazyLoad
                  debounce={false}
                  threshold={0.8}
                  className="h-36 w-full rounded-t-xl object-cover"
                >
                  <img
                    alt={card.title}
                    className="h-36 w-full rounded-t-xl object-cover ring-1 ring-black/30"
                    src={card.image}
                    loading="lazy"
                  />
                </LazyLoad>
                <div className="py-2 px-4 tracking-tighter">
                  <h3 className="flex flex-col mb-0">
                    <span className="font-bold text-base xl:text-lg xl:leading-5 capitalize">
                      {card.title}
                    </span>
                    {card.author && card.author.username && (
                      <span className="text-gray-500 text-sm">
                        by {card.author.username}
                      </span>
                    )}
                  </h3>
                  <div className="text-sm">{card.shortDescription}</div>
                </div>
              </Link>
            );
          } else {
            return (
              <Link
                to={`/post/${card._id}`}
                key={card._id}
                className={
                  "bg-gray-300 w-[90%] sm:w-auto max-w-[300px] rounded-xl mb-6 sm:mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer shadow-md shadow-black/50"
                }
              >
                <div className="px-4 py-2 h-full flex flex-col tracking-tighter">
                  <div>
                    <h3 className="mt-2 flex flex-col mb-0">
                      <span className="font-bold text-base xl:text-lg xl:leading-5 capitalize">
                        {card.title}
                      </span>
                      {card.author && card.author.username && (
                        <span className="text-gray-500 text-sm">
                          by {card.author.username}
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="mt-4 text-sm">{card.shortDescription}</div>
                </div>
              </Link>
            );
          }
        })}
    </>
  );
};
export default Card;

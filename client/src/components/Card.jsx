import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Card = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { response, isLoading, error } = useFetch(
    API_URL + `/posts?page=${page}`
  );
  useEffect(() => {
    if (response) {
      setCards(response.posts);
      setTotalPages(response.totalPages);
    }
  }, [response]);
  const navigate = useNavigate();
  const pages = [...Array(totalPages).keys()];
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  return (
    <>
      {isLoading && <h4 className="text-center">Loading...</h4>}
      {error && <h4>{error.message}</h4>}
      {!isLoading &&
        !error &&
        cards.length > 0 &&
        cards.map((card) => {
          if (card.image) {
            return (
              <div
                className="bg-gray-300 w-[90%] xs:w-auto max-w-[350px] rounded-xl mb-8 m-2 mx-auto xs:mx-2 hover:cursor-pointer overflow-hidden"
                key={card._id}
                onClick={() => navigate(`/post/${card._id}`)}
              >
                <img
                  className="h-48 w-full rounded-t-xl object-cover"
                  src={card.image}
                />
                <div className="p-4 overflow-hidden">
                  <h1 className="overflow-hidden">
                    <span className="font-bold text-xl xl:text-2xl capitalize overflow-hidden leading-6">
                      {card.title}
                    </span>
                    <br />
                    {card.author && card.author.username && (
                      <span className="text-gray-600 overflow-hidden">
                        by {card.author.username}
                      </span>
                    )}
                  </h1>
                  {/* <p className="font-medium overflow-hidden">
                    {card.shortDescription}
                  </p> */}
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="bg-gray-300 w-[90%] xs:w-auto max-w-[350px] rounded-xl mb-8 m-2 mx-auto xs:mx-2 hover:cursor-pointer"
                key={card._id}
                onClick={() => navigate(`/post/${card._id}`)}
              >
                <div className="p-4 h-full flex flex-col">
                  <div>
                    <h1 className="overflow-hidden mt-2">
                      <span className="font-bold text-xl xl:text-2xl capitalize overflow-hidden leading-6">
                        {card.title}
                      </span>
                      <br />
                      {card.author && card.author.username && (
                        <span className="text-gray-600 overflow-hidden">
                          by {card.author.username}
                        </span>
                      )}
                    </h1>
                  </div>
                  <p className="hidden xl:block mt-2 overflow-hidden max-h-[185px]">
                    {card.content.substring(0, 250)}...
                  </p>
                  <p className="block xl:hidden mt-2 overflow-hidden max-h-[175px]">
                    {card.content.substring(0, 155)}...
                  </p>
                </div>
              </div>
            );
          }
        })}
      <div className="absolute right-12 -bottom-6 flex items-center">
        <button onClick={previousPage}>
          <FaChevronLeft size={18} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p + 1)}
            className={
              "mx-1 px-2 py-1 rounded-full bg-blue-400 text-white hover:bg-blue-500 w-8" +
              (page === p + 1 ? " bg-blue-500" : "")
            }
          >
            {p + 1}
          </button>
        ))}
        <button>
          <FaChevronRight size={18} onClick={nextPage} />
        </button>
      </div>
    </>
  );
};
export default Card;

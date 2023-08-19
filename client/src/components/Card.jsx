import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import parse from "html-react-parser";
import DOMpurify from "dompurify";

const Card = ({ scrollToExplore }) => {
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
      scrollToExplore();
    }
  };
  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      scrollToExplore();
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
                className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden"
                key={card._id}
                onClick={() => navigate(`/post/${card._id}`)}
              >
                <img
                  className="h-32 lg:h-48 w-full rounded-t-xl object-cover"
                  src={card.image}
                />
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
              </div>
            );
          } else {
            return (
              <div
                className="bg-gray-300 w-[90%] sm:w-auto max-w-[350px] sm:max-h-[275px] lg:max-h-max rounded-xl mb-8 m-2 mx-auto sm:mx-2 hover:cursor-pointer overflow-hidden"
                key={card._id}
                onClick={() => navigate(`/post/${card._id}`)}
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
                  {card.content.length > 200 ? (
                    <>
                      <div className="block xs:hidden lg:block overflow-hidden mt-2 justify-self-end">
                        {parse(
                          DOMpurify.sanitize(card.content.substring(0, 200)) +
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
            onClick={(e) => {
              e.preventDefault();
              setPage(p + 1);
              scrollToExplore();
            }}
            className={
              "mx-1 p-1 bg-blue-400 text-white hover:bg-blue-500 w-6" +
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

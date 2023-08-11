import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";

const Card = () => {
  const [cards, setCards] = useState([]);
  const { response, isLoading, error } = useFetch(API_URL + "/posts");
  useEffect(() => {
    if (response) {
      setCards(response);
    }
  }, [response]);
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <h4 className="text-center">Loading...</h4>}
      {error && <h4>{error}</h4>}
      {!isLoading &&
        !error &&
        cards.map((card) => {
          if (card.image) {
            return (
              <div
                className="bg-gray-300 max-w-[350px] rounded-xl mb-8 m-2 mx-auto xs:mx-2 hover:cursor-pointer"
                key={card._id}
                onClick={() => navigate(`/post/${card._id}`)}
              >
                <img
                  className="h-48 w-full rounded-t-xl object-cover"
                  src={card.image}
                />
                <div className="p-4 overflow-hidden">
                  <h1 className="overflow-hidden">
                    <span className="font-bold text-2xl capitalize overflow-hidden">
                      {card.title}
                    </span>
                    <br />
                    {card.author && card.author.username && (
                      <span className="text-gray-600 overflow-hidden">
                        by {card.author.username}
                      </span>
                    )}
                  </h1>
                  <p className="text-lg font-medium overflow-hidden">
                    {card.shortDescription.substring(0, 30)}
                  </p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="bg-gray-300 max-w-[350px] rounded-xl mb-8 m-2 mx-auto xs:mx-2 hover:cursor-pointer"
                key={card._id}
                onClick={() => navigate(`/post/${card._id}`)}
              >
                <div className="p-4 h-full overflow-hidden">
                  <h1 className="overflow-hidden">
                    <span className="font-bold text-2xl capitalize overflow-hidden">
                      {card.title}
                    </span>
                    <br />
                    {card.author && card.author.username && (
                      <span className="text-gray-600 overflow-hidden">
                        by {card.author.username}
                      </span>
                    )}
                  </h1>
                  <p className="text-lg font-medium overflow-hidden">
                    {card.shortDescription.substring(0, 100)}
                  </p>
                  <p className="mt-4 overflow-hidden">
                    {card.content.substring(0, 290)}...
                  </p>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};
export default Card;

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
      {isLoading && <h4>Loading...</h4>}
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
                <img className="w-50 h-50 rounded-t-xl" src={card.image} />
                <div className="p-3">
                  <h1>
                    <span className="font-bold text-2xl">{card.title}</span>
                    <br />
                    {card.author && card.author.username && (
                      <span className="text-gray-600">
                        by {card.author.username}
                      </span>
                    )}
                  </h1>
                  <p className="text-lg">{card.shortDescription}</p>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};
export default Card;

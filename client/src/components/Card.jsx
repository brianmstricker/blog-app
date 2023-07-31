import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setCards(data);
    };
    fetchCards();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      {cards.map((card) => {
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
                  <span className="text-gray-600">
                    by {card.author.username}
                  </span>
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

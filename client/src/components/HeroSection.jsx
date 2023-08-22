import { useEffect, useState, useRef } from "react";
import heroimg from "../assets/images/heroimg.svg";
import Card from "./Card";
import Searchbar from "./Searchbar";
import SearchCard from "./SearchCard";
import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";

const HeroSection = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState("");
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const scrollRef = useRef(null);
  const { response, isLoading, error } = useFetch(
    API_URL + `/posts?page=${page}`
  );
  useEffect(() => {
    if (response) {
      setCards(response.posts);
      setTotalPages(response.totalPages);
    }
  }, [response]);
  useEffect(() => {
    if (searchResults.length !== 0 && input.length === 0) {
      setSearchResults([]);
    }
  }, [input.length, searchResults.length]);
  function scrollToExplore() {
    setTimeout(() => {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  }
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
      <section className="w-full pt-2 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-[60%] xs:w-[85%] md:h-full flex flex-col">
            <h1 className="sm:text-4xl xs:text-3xl text-2xl font-medium mt-4 mb-0">
              Check our collection of different tech related articles.
            </h1>
            <p className="mt-8 text-sm md:text-base max-w-[500px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              nesciunt dolores dolor asperiores sit expedita consectetur quos
              explicabo molestias perspiciatis laborum dignissimos, facere
              officia possimus!
            </p>
            <Searchbar
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              input={input}
              setInput={setInput}
            />
          </div>
          <div className="w-full h-full mt-4 md:mt-0">
            <img
              className="h-full w-full max-h-[400px] object-contain mt-32 xs:mt-20 sm:mt-4 md:mt-0"
              src={heroimg}
              alt="People with laptops"
            />
          </div>
        </div>
        <div className="mt-16 mb-4 flex items-center gap-4">
          <span ref={scrollRef} className="text-3xl">
            Explore
          </span>{" "}
          <div className="w-[91%] h-1 bg-gradient-to-r from-blue-400 to-slate-300" />
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 container mx-auto relative mb-12">
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <SearchCard
              key={post._id}
              post={post}
              scrollToExplore={scrollToExplore}
            />
          ))
        ) : (
          <Card
            scrollToExplore={scrollToExplore}
            cards={cards}
            isLoading={isLoading}
            error={error}
            pages={pages}
            previousPage={previousPage}
            nextPage={nextPage}
            setPage={setPage}
            page={page}
          />
        )}
      </section>
    </>
  );
};
export default HeroSection;

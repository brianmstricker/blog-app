import { useEffect, useState, useRef } from "react";
import heroimg from "../assets/images/heroimg.svg";
import Card from "./Card";
import Searchbar from "./Searchbar";
import SearchCard from "./SearchCard";

const HeroSection = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
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
  return (
    <>
      <section className="w-full pt-4 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="h-[60%] xs:w-[75%] md:h-full flex flex-col">
            <h1 className="sm:text-4xl xs:text-3xl text-2xl font-medium mt-6">
              Check our collection of different tech related articles.
            </h1>
            <p className="mt-8 max-w-[500px]">
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
              className="h-full w-full max-h-[400px] object-contain]"
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
      <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container mx-auto relative mb-12">
        {searchResults.length === 0 && (
          <Card scrollToExplore={scrollToExplore} />
        )}
        {searchResults.length > 0 &&
          searchResults.map((post) => (
            <SearchCard
              key={post._id}
              post={post}
              scrollToExplore={scrollToExplore}
            />
          ))}
      </section>
    </>
  );
};
export default HeroSection;

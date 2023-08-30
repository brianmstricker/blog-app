import axios from "axios";
import { toast } from "react-toastify";
import { MdClear } from "react-icons/md";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSearchResults, clearSearchResults } from "../state/searchSlice";

const Searchbar = ({
  input,
  setInput,
  setPrevInput,
  searchDisabled,
  scrollToExplore,
}) => {
  const [offset, setOffset] = useState(0);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [buttonTimeout, setButtonTimeout] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handleSearch = async (e, searchTerm) => {
    e.preventDefault();
    if (input.length === 0 && !searchTerm) {
      toast.error("Please enter a search query");
      return;
    }
    input = input.trim();
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/search?search=${
          input || searchTerm
        }`
      );
      if (res.data.length === 0) {
        toast.error("No results found");
        setPrevInput(input);
        return;
      }
      dispatch(setSearchResults(res.data));
      setPrevInput(input);
      scrollToExplore();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  useEffect(() => {
    if (buttonTimeout) {
      setTimeout(() => {
        setButtonTimeout(false);
      }, 5000);
    }
  }, [buttonTimeout]);
  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="lg:mt-14 mt-6 border-2 border-blue-400 w-full rounded-full shadow-xl shadow-black/20 flex relative"
      >
        {input.length >= 1 && (
          <div
            className="absolute top-1/2 translate-y-[-50%] ml-2"
            onClick={() => {
              setInput("");
              dispatch(clearSearchResults());
              setPrevInput("");
            }}
          >
            <MdClear className="fill-red-600" size={26} />
          </div>
        )}
        <input
          placeholder="Search articles (by title or tag)"
          className="rounded-full py-4 px-6 outline-none w-full ml-3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input.length > 0 && (
          <button
            type="submit"
            className={
              "px-4 py-2 text-blue-400 rounded-full hover:text-blue-600 relative focus:outline-none outline-none focus:text-blue-600 hover:underline focus:underline transition-all duration-300" +
              (searchDisabled
                ? " opacity-40 cursor-not-allowed hover:no-underline hover:text-blue-400"
                : "")
            }
            disabled={searchDisabled}
          >
            <div className="w-[2px] bg-blue-400 h-full absolute inset-0" />
            Search
          </button>
        )}
        <div className="ml-4 mt-6 my-8 absolute top-12 md:w-max">
          <div className="flex flex-row flex-wrap gap-2 mt-2 items-center">
            <span className="italic text-gray-400">Popular Searches</span>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setInput("javascript");
                handleSearch(e, "javascript");
                setButtonTimeout(true);
              }}
              disabled={buttonTimeout}
            >
              <div className="absolute inset-0" />
              Javascript
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setInput("react");
                handleSearch(e, "react");
                setButtonTimeout(true);
              }}
              disabled={buttonTimeout}
            >
              <div className="absolute inset-0" />
              React
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setInput("node");
                handleSearch(e, "node");
                setButtonTimeout(true);
              }}
              disabled={buttonTimeout}
            >
              <div className="absolute inset-0" />
              Nodejs
            </Button>
          </div>
        </div>
      </form>
      {offset > 525 && (
        <div className="fixed z-10 top-2 xl:top-4 right-12 xl:right-14 w-7 h-7 cursor-pointer">
          <BiSearch
            size={28}
            className="z-10 ring-2 ring-blue-400 rounded-full p-1 bg-white"
            onClick={() => setShowSearchbar(!showSearchbar)}
            title={!showSearchbar && "Click to search"}
          />
          {showSearchbar && (
            <form
              onSubmit={handleSearch}
              className="border-2 border-blue-400 w-fit rounded-full flex fixed top-[.4rem] xl:top-[.9rem] right-[5.5rem] xl:right-24 z-10 bg-white transition-all duration-300 overflow-hidden ml-1 xs:ml-0"
            >
              {input.length >= 1 && (
                <div
                  className="absolute top-1/2 translate-y-[-50%] ml-1"
                  onClick={() => {
                    setInput("");
                    dispatch(clearSearchResults());
                    setPrevInput("");
                  }}
                >
                  <MdClear className="fill-red-600" size={16} />
                </div>
              )}
              <input
                placeholder="Search"
                className="outline-none w-full ml-[1.3rem] py-[.15rem]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {input.length > 0 && (
                <button
                  type="submit"
                  className={
                    "text-blue-400 rounded-full hover:text-blue-600 relative focus:outline-none outline-none focus:text-blue-600 hover:underline focus:underline transition-all duration-300 px-1" +
                    (searchDisabled
                      ? " opacity-40 cursor-not-allowed hover:no-underline hover:text-blue-400"
                      : "")
                  }
                  disabled={searchDisabled}
                >
                  <div className="w-[1px] bg-blue-400 h-full absolute inset-0" />
                  Search
                </button>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
};

function Button({ onClick, children, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={
        "px-4 py-2 rounded-full relative focus:outline-none outline-none focus:text-blue-600 hover:underline focus:underline transition-all duration-300 bg-blue-400 text-white" +
        (disabled ? " opacity-40 cursor-not-allowed hover:no-underline" : "")
      }
    >
      {children}
    </button>
  );
}

export default Searchbar;

import { useEffect, useState } from "react";
import axios from "axios";

const Searchbar = ({ setSearchResults, searchResults, resetSearchResults }) => {
  const [input, setInput] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/search?search=${input}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchResults.length !== 0 && input.length === 0) {
      resetSearchResults();
    }
  }, [input.length, resetSearchResults, searchResults.length]);

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="lg:mt-14 mt-6 border-2 border-blue-400 w-full rounded-full shadow-xl shadow-black/20 flex"
      >
        <input
          placeholder="Search articles, tags or users..."
          className="rounded-full py-4 px-6 outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input.length > 0 && (
          <button
            type="submit"
            className="px-4 py-2 text-blue-400 rounded-full hover:text-blue-600 relative"
          >
            <div className="w-[2px] bg-blue-400 h-full absolute inset-0" />
            Search
          </button>
        )}
      </form>
      <div className="ml-5 mt-2">
        <span className="italic text-gray-400">Popular Searches</span>
      </div>
    </div>
  );
};
export default Searchbar;

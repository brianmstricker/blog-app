import { useState } from "react";

const Searchbar = () => {
  const [input, setInput] = useState("");
  return (
    <div>
      <div className="lg:mt-20 mt-8 border-2 border-blue-400 w-full rounded-full shadow-xl shadow-black/20 flex">
        <input
          placeholder="Search articles..."
          className="rounded-full p-3 px-6 outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input.length > 0 && (
          <button className="px-4 py-2 text-blue-400 rounded-full">
            Search
          </button>
        )}
      </div>
      <div className="ml-5 mt-2">
        <span className="italic text-gray-400">Popular Searches</span>
      </div>
    </div>
  );
};
export default Searchbar;

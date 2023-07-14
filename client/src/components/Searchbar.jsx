import { useState } from "react";

const Searchbar = () => {
  const [input, setInput] = useState("");
  return (
    <div className="mt-10 border-2 border-blue-400 w-full rounded-full shadow-xl shadow-black/20 flex">
      <input
        placeholder="Search"
        className="rounded-full p-3 px-6 outline-none w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {input.length > 0 && (
        <button className="px-4 py-2 text-blue-400 rounded-full">Search</button>
      )}
    </div>
  );
};
export default Searchbar;

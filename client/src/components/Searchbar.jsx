import axios from "axios";
import { toast } from "react-toastify";
import { MdClear } from "react-icons/md";

const Searchbar = ({ setSearchResults, input, setInput }) => {
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts/search?search=${input}`
      );
      setSearchResults(res.data);
      if (res.data.length === 0) {
        toast.error("No results found");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
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
              setSearchResults([]);
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
            className="px-4 py-2 text-blue-400 rounded-full hover:text-blue-600 relative focus:outline-none outline-none focus:text-blue-600 hover:underline focus:underline transition-all duration-300"
          >
            <div className="w-[2px] bg-blue-400 h-full absolute inset-0" />
            Search
          </button>
        )}
        <div className="ml-4 mt-6 my-8 absolute top-12 md:w-max">
          <div className="flex flex-row flex-wrap gap-2 mt-2 items-center">
            <span className="italic text-gray-400">Popular Searches</span>
            <Button
              onClick={() => {
                setInput("javascript");
              }}
            >
              <div className="absolute inset-0" />
              Javascript
            </Button>
            <Button
              onClick={() => {
                setInput("react");
              }}
            >
              <div className="absolute inset-0" />
              React
            </Button>
            <Button
              onClick={() => {
                setInput("nodejs");
              }}
            >
              <div className="absolute inset-0" />
              Nodejs
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="px-4 py-2 rounded-full relative focus:outline-none outline-none focus:text-blue-600 hover:underline focus:underline transition-all duration-300 bg-blue-400 text-white"
    >
      {children}
    </button>
  );
}

export default Searchbar;

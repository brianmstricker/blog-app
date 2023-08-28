import useFetch from "../hooks/useFetch";
import { API_URL } from "../utils/config";
import { PiUserCircleLight } from "react-icons/pi";

const Users = () => {
  const { response, error, isLoading } = useFetch(API_URL + "/users");
  return (
    <div className="container mx-auto">
      <h1 className="text-center mt-8 font-bold">List of Users</h1>
      {isLoading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center">Error: {error || "Something went wrong."}</p>
      )}
      {response && response.length > 0 && (
        <ul className="list-none max-w-xs xs:max-w-6xl grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 mx-auto p-4 gap-2 ml-0 xs:ml-10 md:ml-0">
          {response.map((user) => (
            <li
              key={user.username}
              className="flex items-center gap-[2px] md:gap-2"
            >
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.username + "'s profile picture"}
                  className="w-7 h-7 sm:w-9 sm:h-9 md:w-14 md:h-14 rounded-full object-cover mr-[2px] shrink-0"
                />
              ) : (
                <PiUserCircleLight className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full shrink-0" />
              )}
              <p
                key={user.username}
                className="text-sm xxs:text-base break-all"
              >
                {user.username}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Users;

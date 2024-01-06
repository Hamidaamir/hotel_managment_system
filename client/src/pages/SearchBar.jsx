import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Fetch places based on the search query
    axios.get(`/search-places?query=${searchQuery}`).then((response) => {
      setSearchResults(response.data);
    });
  };

  const handleKeyPress = (e) => {
    // Check if Enter key is pressed
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-2 mb-4 relative">
      <div className="flex justify-center items-center gap-2">
        <div>
          <input
            type="text"
            placeholder="Search by address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress} // Handle Enter key press
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div>
          <button
            onClick={handleSearch}
            className="bg-primary text-white p-2 rounded-full mt-2 self-end"
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-col-3 lg:grid-cols-4">
        {searchResults.length > 0 && (
          // w-72 top-full right-0 w-full bg-white p-4 shadow-md z-10
          <div className="">
            <ul>
              {searchResults.map((result) => (
                <li key={result._id}>
                  <Link
                    to={`/place/${result._id}`}
                    onClick={() => setSearchResults([])} // Clear results on link click
                  >
                    <div>
                      <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {result.photos?.[0] && (
                          <img
                            className="rounded-2xl object-cover aspect-square"
                            src={`http://localhost:4000/uploads/${result.photos?.[0]}`}
                            alt=""
                          />
                        )}
                      </div>
                      <h2 className="font-bold">{result.address}</h2>
                      <h3 className="text-sm truncate text-gray-500">
                        {result.title}
                      </h3>
                      <div className="mt-1">
                        <span className="font-bold">PKR:{result.price} </span>
                        per night
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

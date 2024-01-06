import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import SearchBar from "./SearchBar";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (results) => {
    setSearchResults(results);
    setShowSearchResults(results.length > 0);
  };

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div>
      <div className="grid relative">
        <div className="flex justify-center items-center relative">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />
          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="absolute top-14 right-0 bg-white p-4 shadow-md">
              <ul>
                {searchResults.map((result) => (
                  <li key={result._id}>
                    <Link to={`/place/${result._id}`}>{result.address}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Rest of the content */}
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-col-3 lg:grid-cols-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link key={place._id} to={`/place/${place._id}`}>
                <div key={place._id}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src={`http://localhost:4000/uploads/${place.photos?.[0]}`}
                        alt=""
                      />
                    )}
                  </div>

                  <h2 className="font-bold">{place.address}</h2>
                  <h3 className="text-sm truncate text-gray-500">
                    {place.title}
                  </h3>
                  <div className="mt-1">
                    <span className="font-bold">PKR:{place.price} </span>per
                    night
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

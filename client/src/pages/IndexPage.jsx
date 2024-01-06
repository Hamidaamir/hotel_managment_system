import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "../Accordion";

const accordionSections = [
  {
    title: "Refund Policy",
    content: "Payment will be refunded 50% in case of reservation cancelation",
  },
  {
    title: "Report bugs and error",
    content: "mail on dev@gmail.com",
  },
  {
    title: "100% refund policy",
    content:
      "100% will be refunded only if cancelation is done before a week or reserved date",
  },
];

export default function Indexpage() {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch places on initial load
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  const handleSearch = () => {
    // Fetch places based on the search query
    axios.get(`/search-places?query=${searchQuery}`).then((response) => {
      setPlaces(response.data);
    });
  };

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-col-3 lg:grid-cols-4">
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white p-2 rounded-full mt-2"
        >
          Search
        </button>
      </div>

      {places.length > 0 &&
        places.map((place) => (
          <Link key={place._id} to={"/place/" + place._id}>
            <div key={place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>

              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm truncate text-gray-500 ">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">PKR:{place.price} </span>per night
              </div>
            </div>
          </Link>
        ))}
      <div className=" mt-8 font-bold text-2xl">FAQs</div>
      {/* Accordion Section */}
      <Accordion sections={accordionSections} />
    </div>
  );
}

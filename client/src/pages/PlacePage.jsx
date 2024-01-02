import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../pages/BookingWidget.jsx";
import PlaceGallery from "./PlaceGallery.jsx";
import AddressLink from "./AddressLink.jsx";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return null; // Return null instead of an empty string

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <div className="flex items-center justify-center">
        <PlaceGallery place={place} />
      </div>
      <div className="flex gap-2 my-8">
        <div className="">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
          <div className="mt-3">
            <div>
              <h2 className="font-semibold text-2xl">Extra Info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {place.extraInfo}
            </div>
          </div>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      {/* <div className="bg-white -mx-8 px-8 py-8 border-t"></div> */}
    </div>
  );
}

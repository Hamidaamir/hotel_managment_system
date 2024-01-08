import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div className="my-4 p-6 -mx-8 px-8 pt-8 bg-gray-100 rounded-2xl grid">
      <h1 className="text-3xl mb-4">Your booking information:</h1>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl">{booking.place.title}</h2>
            <div className="ml-3">
              <AddressLink className="w-32 my-1 block">
                {booking.place.address}
              </AddressLink>
            </div>
            <div className="ml-3">
              <BookingDates booking={booking} />
            </div>
          </div>
          <div className="bg-primary p-6 text-white rounded-2xl">
            <div>Total Price</div>
            <div className="text-3xl">PKR {booking.price}</div>
          </div>
        </div>
        <div className="ml-3">
          <PlaceGallery place={booking.place} />
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import React from "react";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBooking] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBooking(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div>
<<<<<<< HEAD
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking.id}
              className="m-6 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                Idher hotel ki pinned picture honi chahiya thi lekin nae a rahi
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">
                  Idher Hotel ka naam hona chahiya tha lekin nae a rha ha, koi
                  issue ho rha ha{booking.place.title}
                </h2>
                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className=" mb-2 mt-4 text-gray-500"
                  />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-8 h-8"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total price: PKR {booking.price}
                    </span>
=======
        {bookings?.length > 0 && (
          <>
            {bookings.map((booking) => (
              <Link
                to={`/account/bookings/${booking._id}`}
                key={booking._id}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
              >
                <div className="w-48">
                  <PlaceImg place={booking.place} />
                </div>
                <div className="py-3 pr-3 grow">
                  <h2 className="text-xl">{booking.place.title}</h2>
                  <div className="text-xl">
                    <BookingDates
                      booking={booking}
                      className=" mb-2 mt-4  text-gray-500"
                    />
                    <div className="flex gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                      <span className="text-2xl">
                        {" "}
                        Total Price: PKR {booking.price}
                      </span>
                    </div>
>>>>>>> 6bbfc94a7ba794ec7c0cdf94c4c7ae54f3201d9d
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

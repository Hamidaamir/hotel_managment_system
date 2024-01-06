import { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useEffect } from "react";
import { useContext } from "react";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    try {
      const response = await axios.post("/bookings", {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
    } catch (error) {
      console.error("Error during booking:", error);
      // Handle error - you might want to show a user-friendly message
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (!place || typeof place !== "object" || !place.price) {
    // Add error handling or return a message if place or price is not available
    return <div>Error: Invalid place prop</div>;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: PKR {place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex flex-col">
          <div className="flex gap-2 py-3 px-4">
            <label>Check in:</label>
            <input
              className="border-2"
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="flex gap-2 py-3 px-4 border-t">
            <label>Check out:</label>
            <input
              className="border-2"
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2 py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            className="border-2"
            type="number"
            value={numberOfGuests}
            onChange={(ev) => {
              const enteredValue = parseInt(ev.target.value, 10);

              // Check if the entered value is non-negative before updating state
              if (!isNaN(enteredValue) && enteredValue >= 0) {
                setNumberOfGuests(enteredValue);
              }
            }}
          />
        </div>

        {numberOfNights > 0 && (
          <div className="p-0 m-0">
            <div className="py-3 px-4 border-t">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className="py-3 px-4 border-t">
              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> PKR {numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}

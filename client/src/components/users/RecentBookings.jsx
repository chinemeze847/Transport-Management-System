import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import Booking from "./Booking";

const RecentBookings = () => {
  const { user, passengerTrips, driverTrips, cardStats } = useAppContext();
  const [trip, setTrip] = useState();

  useEffect(() => {
    if (user.role === "passenger") {
      setTrip(passengerTrips);
    } else if (user.role === "driver") {
      setTrip(driverTrips);
    } else if (cardStats && user.role === "admin") {
      setTrip(cardStats[3].trips);
    }
  }, [passengerTrips, driverTrips, cardStats]);

  return (
    <div className="flex flex-col gap-3">
      {trip ? (
        trip.length > 0 ? (
          trip.map((trip) => <Booking key={trip._id} {...trip} />)
        ) : (
          <h3>No Recent Trip</h3>
        )
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default RecentBookings;

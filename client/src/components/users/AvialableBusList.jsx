import React from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import Booking from "./Booking";

const AvialableBusList = () => {
  const { currentTrips } = useAppContext();
  return (
    <div>
      <div className="flex flex-col gap-3">
        {currentTrips ? (
          currentTrips.length > 0 ? (
            currentTrips.map((trip) => (
              <Booking avialableBus key={trip._id} {...trip} />
            ))
          ) : (
            <h3>No Avialable Bus</h3>
          )
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
};

export default AvialableBusList;

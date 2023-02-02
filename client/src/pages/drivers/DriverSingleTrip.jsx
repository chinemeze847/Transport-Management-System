import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CustomHeader from "../../components/CustomHeader";
import ChangeTripStatus from "../../components/drivers/ChangeTripStatus";
import Passenger from "../../components/drivers/Passenger";
import TripInfo from "../../components/TripInfo";
import { useAppContext } from "../../context/AppContext";

const DriverSingleTrip = () => {
  const { getSingleTrip, singleTrip } = useAppContext();

  const { tripId } = useParams();

  useEffect(() => {
    const getData = async () => {
      await getSingleTrip(tripId);
    };

    getData();
  }, [tripId]);

  return (
    <div className="min-h-screen">
      <CustomHeader title="Single Trip" />

      {singleTrip ? (
        <div className="px-8 py-8">
          <TripInfo singleTrip={singleTrip} />

          <div className="flex flex-col gap-2 my-8">
            <h2 className="text-gray-400">All Passengers</h2>
            {singleTrip.passengers.length > 0 ? (
              singleTrip.passengers.map((passenger) => (
                <Passenger {...passenger} />
              ))
            ) : (
              <h3 className="text-center font-semibold text-lg">
                No Passenger Has Booked Yet
              </h3>
            )}
          </div>

          <ChangeTripStatus
            tripStatus={singleTrip.status}
            _id={singleTrip._id}
          />
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default DriverSingleTrip;

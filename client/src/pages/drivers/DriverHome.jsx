import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Booking from "../../components/users/Booking";
import Header from "../../components/users/Header";
import RecentBookings from "../../components/users/RecentBookings";
import { useAppContext } from "../../context/AppContext";

const DriverHome = () => {
  const { getDriverTrips, driverTrips, driverCurrentTrip } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getDriverTrips();
    };

    getData();
  }, []);

  return (
    <div className="py-8 px-8 min-h-screen">
      <Header />

      {driverTrips ? (
        <>
          <div className="my-8">
            <Card />
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-600">
              Active Trip
            </h2>

            {driverCurrentTrip ? <Booking
              driver
              departureTime={driverCurrentTrip.departureTime}
              ticketsInfo={driverCurrentTrip.ticketsInfo}
              status={driverCurrentTrip.status}
              carInfo={driverCurrentTrip.carInfo}
              _id={driverCurrentTrip._id}
            />: (
              <h3 className="font-semibold text-lg">No Current Active Trip</h3>
            )}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="mb-3 text-sm font-semibold text-gray-600">
                Recent Trips
              </h2>
              <Link
                className="text-sm font-light text-violet-500"
                to="/drivers/all-trips"
              >
                All Trips
              </Link>
            </div>
            <RecentBookings />
          </div>
        </>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default DriverHome;

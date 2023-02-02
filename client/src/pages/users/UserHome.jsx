import React, { useEffect } from "react";
import FindBuses from "../../components/users/FindBuses";
import Header from "../../components/users/Header";
import RecentBookings from "../../components/users/RecentBookings";
import { useAppContext } from "../../context/AppContext";

const UserHome = () => {
  const { getUserTrips } = useAppContext();
  useEffect(() => {
    const getData = async () => {
      await getUserTrips();
    };

    getData();
  }, []);

  return (
    <div className="py-8 px-8  min-h-screen bg-cover bg-no-repeat bg-center bg-fixed">
      <Header />

      <FindBuses />

      <div>
        <h2 className="mb-3 text-sm font-semibold text-gray-600">
          Recent Bookings
        </h2>
        <RecentBookings />
      </div>
    </div>
  );
};

export default UserHome;

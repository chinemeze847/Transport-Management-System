import React from "react";
import CustomHeader from "../../components/CustomHeader";
import RecentBookings from "../../components/users/RecentBookings";

const AllDriversTrip = () => {
  return (
    <div className="min-h-screen">
      <CustomHeader title="All Trips" />

      <div className=" px-8 py-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-600">
          All Trips
        </h2>
        <RecentBookings />
      </div>
    </div>
  );
};

export default AllDriversTrip;

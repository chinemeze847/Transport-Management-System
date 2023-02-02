
import RecentBookings from "../../components/users/RecentBookings";


const RecentTrips = () => {
  return (
    <div className=" px-8 py-8 bg-white shadow-md">
      <h2 className="mb-3 text-lg font-semibold text-gray-600">Recent Trips</h2>
      <RecentBookings />
    </div>
  );
};

export default RecentTrips;

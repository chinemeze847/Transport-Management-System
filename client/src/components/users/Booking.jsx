import { IoTime } from "react-icons/io5";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Booking = ({
  avialableBus,
  driver,
  departureTime,
  ticketsInfo,
  status,
  carInfo,
  _id,
}) => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  const handleSelect = () => {
    if (user.role === "driver") {
      navigate(`/drivers/${_id}`);
    } else if (user.role === "admin") {
      navigate(`/admin/trips/${_id}`);
    } else {
      navigate(`/users/${_id}`);
    }
  };

  return (
    <Link
      to={
        user?.role === "driver"
          ? `/drivers/${_id}`
          : user.role === "admin"
          ? `/admin/trips/${_id}`
          : `/users/${_id}`
      }
    >
      <div className="flex gap-4 justify-between items-center bg-white shadow p-2">
        <div className="flex gap-4 items-center justify-center">
          <img
            src={carInfo.carImage}
            className="h-20 w-28 rounded object-cover"
          />

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-violet-500">{driver.fullname}</h2>
            <span className="text-gray-500 text-sm">{ticketsInfo}</span>
            <span className="text-gray-500 text-sm font-medium flex gap-2">
              <IoTime size={22} className="text-violet-500" />
              {format(new Date(departureTime), "EEEE do HH:mm")}
            </span>
          </div>
        </div>

        {avialableBus ? (
          <div className="flex gap-1 items-center justify-center p-2 ">
            <span
              className="border rounded-md p-2 border-violet-500 cursor-pointer"
              onClick={handleSelect}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-violet-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>
            </span>
          </div>
        ) : (
          <div className="flex gap-1 items-center justify-center">
            <span
              className={`w-2 h-2 flex rounded-full ${
                status === "booking"
                  ? "bg-green-500"
                  : status === "transit"
                  ? "bg-yellow-500"
                  : "bg-rose-500"
              } `}
            ></span>
            <span
              className={`${
                status === "booking"
                  ? "text-green-500"
                  : status === "transit"
                  ? "text-yellow-500"
                  : "text-rose-500"
              } text-sm capitalize `}
            >
              {status}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Booking;

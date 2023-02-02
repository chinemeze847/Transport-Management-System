import { format } from "date-fns";

const TripInfo = ({ singleTrip }) => {
  return (
    <div className="bg-white rounded-md shadow p-4 flex flex-col gap-2">
      <h2 className="text-center text-lg  text-gray-400">Trip Info</h2>

      <div className="flex flex-col gap-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center justify-center gap-1 ">
            <span className="font-semibold text-base text-center">
              {singleTrip.driver.car.carModelName}
            </span>
            <span className="text-xs text-gray-400">Car Model</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 ">
            <span className="font-semibold text-base text-center">
              {singleTrip.passengers.length}
            </span>
            <span className="text-xs text-gray-400">Ticket Sold</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex gap-1 items-center justify-center ">
              <span
                className={`w-2 h-2 flex rounded-full ${
                  singleTrip.status === "booking"
                    ? "bg-green-500"
                    : singleTrip.status === "transit"
                    ? "bg-yellow-500"
                    : "bg-rose-500"
                } `}
              ></span>
              <span
                className={`${
                  singleTrip.status === "booking"
                    ? "text-green-500"
                    : singleTrip.status === "transit"
                    ? "text-yellow-500"
                    : "text-rose-500"
                } text-sm capitalize `}
              >
                {singleTrip.status}
              </span>
            </div>
            <span className="text-xs text-gray-400">Status</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <div className="flex gap-3 px-6 justify-center items-center font-semibold ">
            {singleTrip.direction}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-semibold">
            {format(new Date(singleTrip.departureTime), "EEEE do HH:mm")}
          </span>
          <span className="text-xs text-gray-400"> Departure Time</span>
        </div>
      </div>
    </div>
  );
};

export default TripInfo;

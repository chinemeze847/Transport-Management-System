import { format } from "date-fns";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import Passenger from "../../components/drivers/Passenger";
import TripInfo from "../../components/TripInfo";
import { useAppContext } from "../../context/AppContext";

const AdminSingleTrip = () => {
  const { singleTrip, getSingleTrip } = useAppContext();

  const { tripId } = useParams();
  useEffect(() => {
    const getData = async () => {
      await getSingleTrip(tripId);
    };

    getData();
  }, [tripId]);
  return (
    <>
      {singleTrip ? (
        <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
          <div className="w-full overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="flex items-center justify-between px-4 py-5 sm:px-6">
              <div className="">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Trip Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Trip ID: {singleTrip._id}
                </p>
              </div>
              <p className="text-blue-500 bg-white p-2 rounded border border-blue-500">
                {format(new Date(singleTrip.createdAt), "do MMM, yyy. k:m")}
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Car Image
                  </dt>
                  <dd className="mt-1 text-sm h-fit text-gray-900 sm:col-span-2 sm:mt-0">
                    <img
                     src={singleTrip.driver.car.carImage}
                      alt={singleTrip.driver.car.carModelName}
                    />
                  </dd>
                </div>

                <TripInfo singleTrip={singleTrip} />
              </dl>
            </div>
          </div>
          <div className=" w-full overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Passengers List
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                All Passengers Booked
              </p>
            </div>
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
        </div>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <TailSpin />
        </div>
      )}
    </>
  );
};

export default AdminSingleTrip;
